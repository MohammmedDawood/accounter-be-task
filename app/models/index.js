const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.url = dbConfig.url;

db.user = require("./user.model");
db.role = require("./role.model");
db.searchResults = require("./searchResult.model");

db.ROLES = ["user"];

module.exports = db;
