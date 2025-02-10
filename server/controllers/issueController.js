import { Issue } from '../models'
import { io } from '../server' // Import websocket instance

// Create issue
export const createIssue = async (req, res) => {
  const { title, description, assignedTo } = req.body
  const createdBy = req.user.userId // Get user ID from token

  try {
    const newIssue = new Issue({ title, description, assignedTo, createdBy })
    await newIssue.save()

    io.emit('newIssue', newIssue) // Emit new issue to all clients
    res.status(201).json({ message: 'Issue created', issue: newIssue })
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err })
  }
}

// Get all issues
export const getIssues = async (req, res) => {
  try {
    const issues = await Issue.find().populate(
      'createdBy assignedTo',
      'username, email'
    )
    res.json(issues)
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err })
  }
}

// Update issue
export const updateIssue = async (req, res) => {
  const { id } = req.params
  const { status, assignedTo } = req.body

  try {
    const updatedIssue = await Issue.findByIdAndUpdate(
      id,
      { status, assignedTo },
      { new: true }
    )

    io.emit('updateIssue', updatedIssue) // Emit updated issue to all clients
    res.json({ message: 'Issue updated', issue: updatedIssue })
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err })
  }
}

// Delete issue
export const deleteIssue = async (req, res) => {
  const { id } = req.params

  try {
    await Issue.findByIdAndDelete(id)
    io.emit('deleteIssue', id) // Emit deleted issue ID to all clients
    res.json({ message: 'Issue deleted' })
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err })
  }
}
