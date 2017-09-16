import Mongoose from 'mongoose'

Mongoose.Promise = global.Promise

const db = Mongoose.connect('mongodb://admin:admin@ds133964.mlab.com:33964/lucasfontesgaspareto', {
  useMongoClient: true
})

export default db
