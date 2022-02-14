require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const router = require('./router/router')
const multer = require("multer");
const path = require("path");

const app = express()

app.use(express.json())
app.use(cors())
app.use(cookieParser())

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, req.body.name)
//     }
// })
//
// const upload = multer({storage: storage})
//
// app.post('/upload', upload.single('file'), (req, res) => {
//     try {
//         return res.status(200).json("File uploaded successfully");
//     } catch (err) {
//         res.status(500).json({msg: err})
//     }
// })

app.use('/', router)

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