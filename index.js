const express = require('express')
const mongoose = require('mongoose')
const { handleError, ErrorHandler } = require('./helpers/error')

// Routes
const homeRoutes = require('./routes/home')
const userPageRoutes = require('./routes/user_page')
const loginRoutes = require('./routes/login')
const registrationRoutes = require('./routes/registration')

const app = express()

// Add headers
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  next();
});

app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use('/api/', homeRoutes)
app.use('/api/login', loginRoutes)
app.use('/api/registration', registrationRoutes)
app.use('/api/', userPageRoutes)

app.use((err, req, res, next) => {

  handleError(err, res)
  
})

const PORT = process.env.PORT || 3000

async function start() {
  try {
    const url = 'mongodb+srv://layan:Htmlheadhtmlhead123@cluster0.7w106.mongodb.net/twitter'
    await mongoose.connect(url, {
      useNewUrlParser: true, 
      useUnifiedTopology: true,
      useFindAndModify: false
    })
    
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`)
    })
  } catch (e) {
    console.log(e)
  }
}

start()
