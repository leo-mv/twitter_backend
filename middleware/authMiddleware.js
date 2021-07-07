const jwt = require('jsonwebtoken')
const {secret} = require('../config/config')
const { ErrorHandler } = require('../helpers/error')

module.exports = function (req, res, next) {
  if (req.method === "OPTIONS") {
    next()
  }

  try {
    // Получаем токен
    const token = req.headers.authorization.split(' ')[1]
    // Если токена нет, выбрасываем ошибку
    if(!token) throw new ErrorHandler(403, 'Пользователь не авторизован')

    // Декодируем токен
    const decodedData = jwt.verify(token, secret)
    // Если токен не верный, выбрасываем ошибку
    if(!decodedData) throw new ErrorHandler(403, 'Пользователь не авторизован')

    next()

  } catch (e) {
    throw new ErrorHandler(403, 'Пользователь не авторизован')
  }

}