const express= require('express')
const cors = require('cors')
const { connect } = require('mongoose')
require('dotenv').config()
const upload = require('express-fileupload')
const cloudinary=require('./utils/cloudinary')

const userRoutes = require('./routes/userRoutes')
const postRoutes = require('./routes/postRoutes')
const { notFound, errorHandler } = require('./middleware/errorMiddleware')


const app = express()
app.use(express.json({ extended: true }))
app.use(express.urlencoded({ extended: true }))
app.use(cors({ credentials: true, origin: "https://blog-app-liard-zeta.vercel.app/" }))
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "https://blog-app-liard-zeta.vercel.app/");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });

app.use(upload({
    useTempFiles: true,
    tempFileDir:'/tmp/'
}))

cloudinary.cloudinaryConnect()

app.use('/api/users', userRoutes)
app.use('/api/posts', postRoutes)

app.use(notFound)
app.use(errorHandler)

connect(process.env.MONGO_URL).then(app.listen(5000, () => console.log('Server running on port 5000'))).catch(error => console.log(error))

