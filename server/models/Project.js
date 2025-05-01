import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, {
  timestamps: true,
});

// Limit users to 4 projects
projectSchema.statics.countUserProjects = async function(userId) {
  return this.countDocuments({ userId });
};

const Project = mongoose.model('Project', projectSchema);

export default Project;