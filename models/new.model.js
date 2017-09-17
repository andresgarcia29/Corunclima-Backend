const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

const NewSchema = new Schema({
  title: { type: String, required: true },
  subject: { type: String, required: true },
  content: { type: String, required: true },
  date: { type: Date },
  image: { type: String },
  category: { type: String, enum: ['globals', 'events', 'cases'] }
})

NewSchema.pre('save', function(next){
  this.date = new Date();
  this.date = Date.now();
  next()
})

module.exports = mongoose.model('New', NewSchema)