import express from 'express'
import {
  createIssue,
  getIssues,
  updateIssue,
  deleteIssue,
} from '../controllers/issueController.js'
import { authMiddleware } from '../utils/authMiddleware.js'

const router = express.Router()

router.post('/', authMiddleware, createIssue)
router.get('/', authMiddleware, getIssues)
router.put('/:id', authMiddleware, updateIssue)
router.delete('/:id', authMiddleware, deleteIssue)

export default router
