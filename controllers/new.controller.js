'use strict';

const mongoose = require('mongoose'),
  New = require('../models/new.model');

class NewController{
  get(req, res){
    New.find({})
    .sort({'date': -1})
    .exec((err, news) => {
      if (err) return res.status(500).send({status: 1, message: 'Error en el servidor'})
      if (!news) return res.status(404).send({status: 1, message: 'No se ha encontrado ninguna noticia'})
      res.status(200).send({
        status: 0,
        data: news
      })
    })
  }
  getId(req, res){
    if (!req.params._id) res.status(500).send({status: 1, message: 'No se envio algún ID'})
    New.findById(req.params._id, (err, newOne) => {
      if (err) return res.status(500).send({status: 1, message: 'Error en el servidor'})
      if (!newOne) return res.status(404).send({status: 1, message: 'No se ha encontrado ninguna noticia'})
      res.status(200).send({
        status: 0,
        data: newOne
      })
    })
  }
  create(req, res){
    console.log(req.body)
    if (!req.body) return res.status(500).send({status: 1, message: 'No se enviaron datos'})
    New.create(req.body, (err, newOne) => {
      if (err) return res.status(500).send({status: 1, message: 'Error al guardar en la base de datos'})
      res.status(200).send({
        status: 0,
        data: newOne
      })
    })
  }
  update(req, res){
    if (!req.params._id) res.status(500).send({status: 1, message: 'No se envio algún ID'})
    New.findById(req.params._id, (err, newnotice) => {
      if (err) return res.status(500).send({status: 1, message: 'Error en el servidor'})
      newnotice.title = req.body.title
      newnotice.content = req.body.content
      newnotice.subject = req.body.subject
      newnotice.category = req.body.category
      if (req.body.image != "" && req.body.image != null) {
        newnotice.image = req.body.image
      }
      newnotice.save((err) => {
        if (err) throw err
        res.status(200).send({
          status: 0,
          message: 'Noticia actualizada correctamente'
        })
      })
    })
  }
  delete(req, res){
    if (!req.params._id) res.status(500).send({status: 1, message: 'No se envio algún ID'})
    New.findByIdAndRemove(req.params._id, (err, newOne) => {
      if (err) return res.status(500).send({status: 1, message: 'Error en el servidor'})
      res.status(200).send({
        status: 0,
        message: 'Noticia borrada correctamente'
      })
    })
  }
}

let nc = new NewController();

module.exports = nc;