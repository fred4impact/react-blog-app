const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true }, // Markdown content
  imageUrl: { type: String }, // Path to uploaded image
  creator: { type: String, required: true }, // Username of the blog author
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Blog', blogSchema);