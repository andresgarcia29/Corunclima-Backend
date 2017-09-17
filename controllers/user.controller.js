'use strict';

const mongoose = require('mongoose'),
  User = require('../models/user.model'),
  passport = require('passport'),
  jwt = require('jsonwebtoken'),
  jwtOptions = require('../config/jwtOptions'),
  bcrypt = require('bcryptjs');

class UserController{

  signup(req, res){
    if (!req.body) return res.status(500).send({status: 1, message: 'No se enviaron los datos'})
    User.create(req.body, (err, data) => {
      if (err) return res.status(500).send({status: 1, message: 'Error en el servidor'})
      res.status(200).send({
        status: 0,
        message: 'Usuario creado correctamente'
      })
    })
  }

  get(req, res){
    User.find({}).exec((err, users) => {
      if (err) res.status(500).send({status: 1, message: 'Error en el servidor'})
      res.status(200).send({
        status: 0,
        data: users
      })
    })
  }

  getId(req, res){
    if (!req.params._id) res.status(404).send({status: 1, message: 'No se envio el id'})
    User.findById(req.params._id, (err, user) => {
      if (err) res.status(500).send({status: 1, message: 'Error en el servidor'})
      res.status(200).send({
        status: 0,
        data: user
      })
    })
  }

  update(req, res){
    console.log(req.params._id)
    if (!req.params._id) res.status(404).send({status: 1, message: 'No se envio el id'})
    if (!req.body) res.status(500).send({status: 1, message: 'No se envio los datos'})
    User.findById(req.params._id, (err, user) => {
      if (err) res.status(500).send({status: 1, message: 'Error en el servidor'})
      user.username = req.body.username;
      user.extraInfo.name = req.body.extraInfo.name;
      user.extraInfo.email = req.body.extraInfo.email;
      if (req.body.image) {
        user.image = req.body.image
      }
      user.save((err) => {
        if (err) res.status(500).send({status: 1, message: 'Error en el servidor'})
        res.status(200).send({
          status: 0,
          message: 'Usuario actualizado correctamente'
        })
      })
    })
  }

  delete(req, res){
    if (!req.params._id) res.status(404).send({status: 1, message: 'No se envio el id'})
    User.findByIdAndRemove(req.params._id, (err, data) => {
      if (err) res.status(500).send({status: 0, message: 'Error al eliminar'});
      res.status(200).send({
        status: 0,
        message: 'Usuario borrado correctamente'
      })
    })
  }

  signin(req, res){
    if (!req.body) return res.status(500).send({status: 1, message: 'No se han enviado datos'})
    User.findOne({username: req.body.username}, (err, user) => {
      if (err) return res.status(500).send({status: 1, message: 'Error al buscar usuario'})
      if (!user) return res.status(404).send({status: 1, message: 'El usuario no existe'})
      if (bcrypt.compareSync(req.body.password, user.password)) {
        let payload = {user: user._id}
        let token = jwt.sign(payload, jwtOptions.secretOrKey)
        req.user = user
        res.status(200).send({status: 0, token: token})
      } else {
        res.status(200).send({status: 1, message: 'La contraseña no coincide'})
      }
    })
  }

  //Nueva 

}

let uc = new UserController();

module.exports = uc;