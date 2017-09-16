import path from 'path'
import Koa from 'koa'
import Router from 'koa-router'
import render from 'koa-swig'
import koaStatic from 'koa-static'
import bodyParser from 'koa-body-parser'
import override from 'koa-override'

import db from './models'
import Person from './models/person'

const koa = new Koa()
const router = new Router({
  prefix: '/user'
})

koa.use(bodyParser())
koa.use(override())

/* html render engine(Swig) */
koa.context.render = render({
  root: path.join(__dirname, 'views'),
  autoscape: true,
  cache: 'memory',
  ext: 'html'
})

/* request logger middleware */
koa.use(function *(next) {
  yield next
  console.log(`${this.request.method} ${this.request.url} - ${this.response.status}`)
})

/* simple router */
router
  .get('/', function *() {
    let results = yield Person.find({})
    yield this.render('index', {
      peoples: results
    })
  })
  .get('/new', function *() {
    yield this.render('form')
  })
  .post('/', function *() {
    let person = new Person(this.request.body)
    yield person.save()
    this.redirect('/user/')
  })
  .del('/:id', function *() {
    yield Person.remove({
      _id: this.params.id
    })
    this.redirect('/user/')
  })

koa.use(koaStatic(path.join(__dirname, 'public')))
koa.use(router.routes())
koa.use(router.allowedMethods())

koa.listen(3000, () => {
  console.log('server connected')
})
