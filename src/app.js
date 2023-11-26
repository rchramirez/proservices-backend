require('dotenv').config()
const express = require('express')
const app = express()
const sequelize = require('./config/db')
const User = require('./models/user')

// Setting
const PORT = process.env.PORT || 3000

// Rutas
app.get('/', (req, res) => {
  User.create({
    name: "Anton",
    birthday: new Date(1991, 10, 26)
  }).then(user => {
    res.json(user)
  })
})

// Arrancamos el servidor
app.listen(PORT, () => {
  console.log(`La app ha arrancado en http://localhost:${PORT}`)

  // Conectarse a la base de datos
  sequelize.authenticate().then(() => {
    console.log("Nos hemos conectado a la base de datos")
  }).catch(error => {
    console.log('Se ha producido un error', error)
  })
})