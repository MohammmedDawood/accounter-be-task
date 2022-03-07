exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.userSearch = (req, res) => {
  console.log(req.query.keyword);
  res.status(200).send("User Searching for : " + req.query.keyword);
};
