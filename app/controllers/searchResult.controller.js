const db = require("../models");
const SearchResult = db.searchResults;

exports.addSearchResult = (req, res) => {
  var searchResult = new SearchResult({
    userId: req.userId,
    title: req.body.title,
    description: req.body.description,
  });

  searchResult.save((err, searchResult) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    res.status(200).send({ message: "Search Result was added successfully!" });
  });
};

exports.userSearchResult = (req, res) => {
  let userId = req.userId;
  // console.log(userId);
  SearchResult.find({
    userId,
  }).exec((err, SearchResult) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (!SearchResult) {
      return res.status(404).send({ message: "Search Results Not found." });
    }

    res.status(200).send({
      SearchResult,
      userId,
    });
  });
};
