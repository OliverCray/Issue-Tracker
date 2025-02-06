import mongoose from 'mongoose'

const issueSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    status: {
      type: String,
      enum: ['To Do', 'In Progress', 'Resolved'],
      default: 'To Do',
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    open: { type: Boolean, default: true },
  },
  { timestamps: true }
)

issueSchema.pre('save', function (next) {
  if (this.status === 'Resolved') {
    this.open = false
  } else {
    this.open = true
  }
  next()
})

const Issue = mongoose.model('Issue', issueSchema)

export default Issue
