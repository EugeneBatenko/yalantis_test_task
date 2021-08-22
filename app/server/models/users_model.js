import mongoose from "mongoose"
import validator from 'validator'

let user_schema = new mongoose.Schema({
  first_name: {
    type: String,
    required: [true, 'Please enter name']
  },
  last_name: {
    type: String,
    required: [true, 'Please enter name']
  },
  email: {
    type: String,
    required: [true, 'Please enter an email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please enter a valid email']
  },
  image: {
    type: String
  }
})

const User = mongoose.model('users', user_schema)

export default User