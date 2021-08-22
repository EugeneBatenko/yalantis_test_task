import axios from 'axios';

export const home = (req, res) => {
  axios.get('http://localhost:3000/api/users/')
    .then(data => {
      res.render('index', {users: data.data})
    })
    .catch(err => {
      res.send(err)
    })
}

export const user = (req, res) => {
  const id = req.params.id
  axios.get(`http://localhost:3000/api/user/${id}`)
    .then(data => {
      res.render('user', {user: data.data})
    })
    .catch(err => {
      res.send(err)
    })
}