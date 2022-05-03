//const express = require('express')
const express = require('express')

const cors = require('cors')
const mongoose = require('mongoose')
//const jwt = require("jsonwebtoken")
require("dotenv").config()


//const User = require("./models/User")

//const nodemon = require('nodemon')

const app = express()

app.use(express.json())

//app.use(nodemon())

/*const { uuid } = require('uuidv4')
const { response } = require('express')
const bcrypt = require("bcrypt")*/

app.use(cors())

//const users = []


/*app.get("/users", (req, res) => {
    return res.json(users)
})*/


//rota de cadastro

const usersRoutes = require("./routes/usersRoutes")
const filterRoutes = require("./routes/filterRoutes")

app.use("/users", usersRoutes)
app.use("/users", filterRoutes)



/*const dbURI = 'mongodb+srv://r_danielrs:password4889684@cluster0.r7klk.mongodb.net/colorbank'
mongoose.connect(dbURI).then((result) => app.listen(3333))*/

const dbUser = process.env.DB_USER 
const dbPassword = process.env.DB_PASS

mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.r7klk.mongodb.net/colorbank?retryWrites=true&w=majority`).then(() => {
    app.listen(3333)
    console.log("backend funcionando")
}).catch((err) => {
    console.log("Erro de conexão")
})

/*app.listen(3333, () => {
    console.log("backend funcionando")
})*/



