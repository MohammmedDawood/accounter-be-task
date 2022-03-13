const mongoose = require("mongoose");

const SearchResult = mongoose.model(
  "SearchResult",
  new mongoose.Schema({
    title: String,
    description: String,
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  })
);

module.exports = SearchResult;
