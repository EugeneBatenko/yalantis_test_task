import express from 'express'
import path from 'path'
import dotenv from 'dotenv'
import morgan from 'morgan'
import bodyParser from 'body-parser'

import connectDB from './app/server/database/connection.js'
import routes from "./app/server/routes/routes.js";

const app = express()
const __dirname = path.resolve();
dotenv.config({path: 'config.env'})
const PORT = process.env.PORT || 8080

// Log request
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))

//Database connection
connectDB()

// Parse request to body-parser
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

// Set view engine
app.set('view engine', 'pug')
app.set('views', path.resolve(__dirname, 'app/views'))

// Load assets
app.use(express.static(path.join(__dirname, 'app/assets')))
app.use(express.static(path.join(__dirname,'public')))

// Load routers
app.use('/', routes)

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`)
})
