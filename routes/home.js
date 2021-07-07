const {Router} = require('express')
const Tweet = require('../models/tweet')

const router = Router()

router.get('/', async (req, res) => {
  const twittes = await Tweet.find().populate({path: 'user', select: 'login name'}).sort([['createdAt', -1]])
  res.send(twittes)
})

module.exports = router