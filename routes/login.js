const {Router} = require('express')
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {secret} = require('../config/config')
const { ErrorHandler } = require('../helpers/error')

const router = Router()

router.post('/', async (req, res, next) => {
  
  try {
    
    // Проверяем существует ли пользователь
    const user = await User.findOne({ login: req.body.login })
    // Если пользователя не существует, выбрасываем ошибку
    if(!user) throw new ErrorHandler(404, 'Wrong login or password')

    // Проверяем пароль
    const validatePassword = bcrypt.compareSync(req.body.password, user.password)
    // Если пароль не верный, выбрасываем ошибку
    if(!validatePassword) throw new ErrorHandler(404, 'Wrong login or password')
    
    // Генерируем токен
    const token = jwt.sign({id: user._id}, secret, {expiresIn: '24h'})

    res.send({token})

  } catch(e) {
    next(e)
  }

})

router.get('/verify', async(req, res, next) => {
  try {
    
    // Получаем токен
    const token = req.headers.authorization.split(' ')[1]
    // Если токена нет, выбрасываем ошибку
    if(!token) throw new ErrorHandler(403, 'Пользователь не авторизован')

    // Декодируем токен
    const {id} = jwt.verify(token, secret, function(err, decoded) {
      if(err) throw new ErrorHandler(403, 'Пользователь не авторизован')
      return decoded
    })

    const user = await User.findById(id).select('login name')

    res.send(user)

  } catch(e) {
    next(e)
  }
})

module.exports = router