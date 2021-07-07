const {Router} = require('express')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const { ErrorHandler } = require('../helpers/error')

const router = Router()

router.get('/', async (req, res) => {

  try {
    // Ищем все твиты
    const users = await User.find()
    // Если есть, отдаем JSON
    res.send(users)
    res.sendStatus(200)

  } catch(e) {
    next(e)
  }
})

router.post('/', async (req, res, next) => {
  try {
    // Проверяем существует ли пользователь
    const user = await User.findOne({ login: req.body.login })
    // Если пользователь уже существует - выбрасываем ошибку
    if (user) throw new ErrorHandler(403, 'User already exists')

    // Шифруем пароль
    const hashPassword = bcrypt.hashSync(req.body.password, 8)

    const newUser = new User({
      login: req.body.login,
      password: hashPassword,
      name: req.body.name,
      createdAt: Date.now()
    })
  
    await newUser.save()
    res.sendStatus(200)

  } catch (e) {
    next(e)
  }
})

router.post('/requared_login', async (req, res, next) => {
  try {
    const user = await User.findOne({ login: req.body.login })
    // Если пользователь уже существует - выбрасываем ошибку
    if (user) throw new ErrorHandler(403, 'User already exists')

    res.sendStatus(200)
  } catch (e) {
    next(e)
  }
})

module.exports = router