'use strict';

const mongoose = require('mongoose'),
  Email = require('../models/email.model');

class EmailController{
  get(req, res){
    Email.find({})
    .sort({'date': -1})
    .exec((err, news) => {
      if (err) return res.status(500).send({status: 1, message: 'Error en el servidor'})
      if (!news) return res.status(404).send({status: 1, message: 'No se ha encontrado ningun correo'})
      res.status(200).send({
        status: 0,
        data: news
      })
    })
  }
  create(req, res){
    console.log(req.body)
    if (!req.body) return res.status(500).send({status: 1, message: 'No se enviaron datos'})
    Email.create(req.body, (err, newOne) => {
      if (err) return res.status(500).send({status: 1, message: 'Error al guardar en la base de datos'})
      res.status(200).send({
        status: 0,
        data: newOne
      })
    })
  }
  delete(req, res){
    if (!req.params._id) res.status(500).send({status: 1, message: 'No se envio algún ID'})
    Email.findByIdAndRemove(req.params._id, (err, newOne) => {
      if (err) return res.status(500).send({status: 1, message: 'Error en el servidor'})
      res.status(200).send({
        status: 0,
        message: 'Noticia borrada correctamente'
      })
    })
  }
}

let nc = new EmailController();

module.exports = nc;