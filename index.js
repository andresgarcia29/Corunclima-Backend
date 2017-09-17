const mongoose = require('mongoose'),
  app = require('./app'),
  config = require('./config/db');

mongoose.Promise = global.Promise;
let uri = `mongodb://joker29:Kalipter29@ds139761.mlab.com:39761/corunclima`;

mongoose.connect(uri).then(() => {
  console.log('Your connection with mongodb is ready')
  app.listen(app.get('port'), () => {
    console.log(`App running in the port ${app.get('port')}`)
  })
})