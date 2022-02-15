require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const router = require('./router/router')
const multer = require("multer");
const path = require("path");
const upload = require('express-fileupload')
const bodyParser = require('body-parser')

const app = express()

// app.use('/images', express.static(path.join(__dirname, 'public/uploads')))

app.use(bodyParser())
app.use(cors())
app.use(cookieParser())
app.use(upload())

app.use('/api', router)

const serve = () => {
    mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
        err => {
            if (err) throw err
            console.log('Connected to MongoDB')

            app.listen(process.env.PORT, () => {
                console.log(`Server has started on port ${process.env.PORT}`)
            })
        }
    )
}

serve()