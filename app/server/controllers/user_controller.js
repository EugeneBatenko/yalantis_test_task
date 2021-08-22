import fs from 'fs'
import User from '../models/users_model.js'
import sharp from 'sharp'

export const create = async (req, res) => {
  const {first_name, last_name, email} = req.body
  const date = new Date()
  const image_path = `${date.getUTCFullYear()}-${date.getUTCMonth()+1}-${date.getUTCDate()}-${req.file.originalname}`
  const image = '/upload/' + image_path

  try {
    fs.access('public/upload', err => {
      if (err) fs.mkdirSync('public/upload/')
    })

    await sharp(req.file.buffer)
      .resize({
        width: 200,
        height: 200,
        fit: sharp.fit.cover,
        position: sharp.strategy.entropy,
      })
      .toFile('public/upload/' + image_path)

    await sharp().on('info', info => {
      console.log(info)
    })

    const user = await User.create({first_name, last_name, email, image})
    // res.status(201).json({user: user._id})
    res.redirect(`/user/${user._id}`)
  } catch (err) {
    res.status(500).send({message: err.message || "Some error occurred while creation a create operation"})
  }
}

export const findOne = (req, res) => {
  const id = req.params.id
  User.findById(id).then(data => {
    if(!data) {
      res.status(404).send({message: `Not found user by id ${id}`})
    } else {
      res.send(data)
    }
  }).catch(err => {
    res.status(500).send({message: err.message || 'Cannot find client'})
  })
}

export const findAll = (req, res) => {
  User.find().then(user => {
    res.send(user)
  }).catch(err => {
    res.status(500).send({message: err.message || 'Error cannot be find user'})
  })
}
