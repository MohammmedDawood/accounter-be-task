const db = require("../models");
const Users = db.users;

// Create and Save a new User

exports.createuser = (req, res) => {
  // Validate request
  if (
    !req.body.name ||
    !req.body.email ||
    !req.body.password ||
    !req.body.phone
  ) {
    res.status(400).send({
      message: "Somthing is missing!",
    });

    return;
  }

  // Create a new user
  var user = new Users({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    password: req.body.password,
    address: req.body.address,
    role: req.body.role,
  });

  // Save Users in the database
  user
    .save(user)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the User.",
      });
    });
};

// Retrieve all Users from the database.
exports.findAllUsers = (req, res) => {
  var condition = {};

  Users.find(condition)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving stores.",
      });
    });
};

// Update a user by the id in the request
exports.updateUserById = (req, res) => {
  let id = req.query.id;
  Users.findByIdAndUpdate(id, req.body, {
    useFindAndModify: false,
  })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update User with id=${id}. Maybe User was not found!`,
        });
      } else
        res.status(200).send({
          message: "Users was updated successfully.",
        });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Users with id",
      });
    });
};

// Delete a user with the specified id in the request
exports.deleteUserById = (req, res) => {
  const id = req.query.id;

  Users.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`,
        });
      } else {
        res.status(200).send({
          message: "User was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete User with id",
      });
    });
};
