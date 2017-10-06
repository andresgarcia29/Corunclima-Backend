'use strict';

const mongoose = require('mongoose'),
  Product = require('../models/products.model');

class ProductController{
  get(req, res){
    Product.find({})
    .sort({'dateStart': -1})
    .exec((err, news) => {
      if (err) return res.status(500).send({status: 1, message: 'Error en el servidor'})
      if (!news) return res.status(404).send({status: 1, message: 'No se ha encontrado ningun producto'})
      res.status(200).send({
        status: 0,
        data: news
      })
    })
  }
  getId(req, res){
    if (!req.params._id) res.status(500).send({status: 1, message: 'No se envio algún ID'})
    Product.findById(req.params._id, (err, newOne) => {
      if (err) return res.status(500).send({status: 1, message: 'Error en el servidor'})
      if (!newOne) return res.status(404).send({status: 1, message: 'No se ha encontrado ninguna noticia'})
      res.status(200).send({
        status: 0,
        data: newOne
      })
    })
  }
  getByCategory(req, res){
    if (!req.params._category) res.status(500).send({status: 1, message: 'No se envio algún ID'})
    Product.find({_category: req.params._category}, (err, newOne) => {
      if (err) return res.status(500).send({status: 1, message: 'Error en el servidor'})
      if (!newOne) return res.status(404).send({status: 1, message: 'No se ha encontrado ninguna noticia'})
      res.status(200).send({
        status: 0,
        data: newOne
      })
    })
  }
  create(req, res){
    if (!req.body) return res.status(500).send({status: 1, message: 'No se enviaron datos'})
    Product.create(req.body, (err, newOne) => {
      if (err) return res.status(500).send({status: 1, message: 'Error en el servidor'})
      res.status(200).send({
        status: 0,
        data: newOne
      })
    })
  }
  update(req, res){
    if (!req.params._id) res.status(500).send({status: 1, message: 'No se envio algún ID'})
    Product.findById(req.params._id, (err, prod) => {
      if (err) return res.status(500).send({status: 1, message: 'Error en el servidor'})
      prod.images = req.body.images
      prod.save((err) => {
        if (err) throw err
        res.status(200).send({
          status: 0,
          message: 'Producto actualizado correctamente'
        })
      })
    })
  }
  updateNormal(req, res){
    if (!req.params._id) res.status(500).send({status: 1, message: 'No se envio algún ID'})
    Product.findById(req.params._id, (err, prod) => {
      if (err) return res.status(500).send({status: 1, message: 'Error en el servidor'})
      prod = Object.assign(prod, req.body);
      prod.save((err) => {
        if (err) throw err
        res.status(200).send({
          status: 0,
          message: 'Producto actualizado correctamente'
        })
      })
    })
  }
  delete(req, res){
    if (!req.params._id) res.status(500).send({status: 1, message: 'No se envio algún ID'})
    Product.findByIdAndRemove(req.params._id, (err, newOne) => {
      if (err) return res.status(500).send({status: 1, message: 'Error en el servidor'})
      res.status(200).send({
        status: 0,
        message: 'Producto eliminado correctamente'
      })
    })
  }
}

let pc = new ProductController();

module.exports = pc;