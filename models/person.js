import Mongoose from 'mongoose'

Mongoose.Promise = global.Promise

const Person =  new Mongoose.Schema({
  name: String,
  age: Number
})

export default Mongoose.model('Person', Person)
