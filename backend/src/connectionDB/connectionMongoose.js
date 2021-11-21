const mongoose = require('mongoose');

async function connect() {
  await mongoose.connect(process.env.DB_CONNECT);
}

module.exports = connect