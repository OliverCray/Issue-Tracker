import router from './routes/index.js'

import authRoutes from './routes/authRoutes.js'
import issueRoutes from './routes/issueRoutes.js'

router.use('/auth', authRoutes)
router.use('/issues', issueRoutes)

export default router
