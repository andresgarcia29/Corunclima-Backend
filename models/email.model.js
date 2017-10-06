const mongoose = require('mongoose'),
Schema = mongoose.Schema;

const EmailSchema = new Schema({
name: { type: String },
city: { type: String },
company: { type: String },
date: { type: Date },
email: { type: String },
phone: { type: String },
message: { type: String },
})

EmailSchema.pre('save', function(next){
this.date = new Date();
this.date = Date.now();
next()
})

module.exports = mongoose.model('Email', EmailSchema)