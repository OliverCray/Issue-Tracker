import router from './routes/index.js'

import authRoutes from './routes/authRoutes.js'
import issueRoutes from './routes/issueRoutes.js'

router.use('/api/auth', authRoutes)
router.use('/api/issues', issueRoutes)

export default router
