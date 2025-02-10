import express from 'express'

import authRoutes from './authRoutes.js'
import issueRoutes from './issueRoutes.js'

const router = express.Router()

router.use('/auth', authRoutes)
router.use('/issues', issueRoutes)

export default router
