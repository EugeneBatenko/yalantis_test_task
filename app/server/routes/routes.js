import express from 'express'
const route = express.Router()

import {home, user} from '../services/render.js'
import {create, findAll, findOne} from '../controllers/user_controller.js'
import upload from "../middleware/upload_image.js";

route.get('/', home)
route.get('/user/:id', user)

route.post('/api/user', upload.single('image'), create)
route.get('/api/user/:id', findOne)
route.get('/api/users', findAll)

export default route