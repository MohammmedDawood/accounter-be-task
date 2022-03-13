const { authJwt } = require("../middlewares");
const controller = require("../controllers/searchResult.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  app.get(
    "/api/test/user/allSearchResult",
    [authJwt.verifyToken],
    controller.userSearchResult
  );
  app.post(
    "/api/test/user/addSearchResult",
    [authJwt.verifyToken],
    controller.addSearchResult
  );
};
