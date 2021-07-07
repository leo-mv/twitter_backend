const {Router} = require('express')
const User = require('../models/user')
const Tweet = require('../models/tweet')
const { ErrorHandler } = require('../helpers/error')
const authMiddleware = require('../middleware/authMiddleware')

const router = Router()

// Вывод информации о пользователе и его твитты
router.get('/:slug', async (req, res, next) => {
  try {
    // Ищем юзера
    const user = await User.findOne({ login: req.params.slug }).select('login name createdAt')
    // Если юзера нет - выбрасываем ошибку
    if (!user) throw new ErrorHandler(404, 'Пользователь не найден')
    // Ищем все твиты привязанные к данному юзеру
    const tweets = await Tweet.find({ user : user._id }).sort([['createdAt', -1]])

    // Готовим данные
    const data = {
      user,
      tweets
    }

    // отдаем JSON
    res.send(data)

  } catch(e) {
    next(e)
  }
})



// Публикация твитта
router.post('/:slug', authMiddleware, async (req, res, next) => {
  try {
    // Получаем юзера чтобы забрать его id
    const user = await User.findOne({ login: req.params.slug })
    // Если юзера нет - выбрасываем ошибку
    if (!user) throw new ErrorHandler(404, 'Пользователь не найден')

    const tweet = new Tweet({
      title: req.body.title,
      user: user._id,
      createdAt: Date.now()
    })

    await tweet.save()
    res.sendStatus(200)

  } catch (e) {
    next(e)
  }
})

module.exports = router