const SerpApi = require("google-search-results-nodejs");
const search = new SerpApi.GoogleSearch(
  "5bb10e623fb8f4766433608e14cdb75e9d33066c69d11becb56b7c54d68a6688"
);

exports.userBoard = (req, res) => {
  console.log("User Board");
  res.status(200).send("User Authrized.");
};

//if using google search
exports.userSearch = (req, res) => {
  // console.log(req.query.keyword);
  search.json(
    {
      q: req.query.keyword,
      location: "Austin, TX",
    },
    (result) => {
      console.log(result.knowledge_graph["title"]);
      console.log(result.knowledge_graph["description"]);
      if (result) {
        res.status(200).send({
          keyword: req.query.keyword,
          title: result.knowledge_graph["title"],
          description: result.knowledge_graph["description"],
        });
      }
      // res.status(200).send("User Searching for : " + req.query.keyword);
    }
  );
};
