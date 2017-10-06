const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

const ProductSchema = new Schema({
  title: { type: String },
  subject: { type: String },
  dateStart: { type: Date, default: Date.now() },
  category: { type: String,  enum: ['electric', 'refrigeration', 'conditioner'] },
  subCategory: { type: String, enum: ['cabs','buses','rv','dc','minivan','midvan','bigvan','pickup','truck12','truc24','diesel','truck','minibus','midbus','bigbus'] },
  princialImage: { type: String },
  images: [ { type: String } ],
  carecteristicas: { type: String, required: true},

  modelo: { type: String, default: ''},
  enfriamento: { type: String, default: ''},
  voltaje: { type: String, default: ''},
  corriente: { type: String, default: ''},
  compresor: { type: String, default: ''},
  control: { type: String, default: ''},
  refrigerante: { type: String, default: ''},
  instalacion: { type: String, default: ''},
  aplicacion: { type: String, default: ''},

  flujodeaire: { type: Number },
  dimension: { type: String },
  gas: { type: String },

  drive: { type: String },
  temperatura: { type: String },
  conDimension: { type: String },
  conPeso: { type: String },
  conVentilador: { type: String },
  evapDimension: { type: String },
  evapPeso: { type: String },
  evapVentilador: { type: String },
  desarche: { type: String },
  opcional: { type: String },
});

module.exports = mongoose.model('Product', ProductSchema);