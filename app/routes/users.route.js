module.exports = (app) => {
  const users = require("../controllers/users.controller.js");

  var router = require("express").Router();

  // Create a new store
  router.post("/create_user", users.createuser);

  // Retrieve all stores
  router.get("/get_users_all", users.findAllUsers);

  // Update a store with id
  router.put("/update_user_by_id/:id", users.updateUserById);

  // Delete a store with id
  router.delete("/delete_user_by_id/:id", users.deleteUserById);

  // export router to app
  app.use("/api/users", router);
};
