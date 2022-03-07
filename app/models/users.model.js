const mongoose = require("mongoose");

const usersModel = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Username Not Found"],
    },
    email: {
      type: String,
      required: [true, "Email Not Found"],
    },
    phone: {
      type: String,
      required: [true, "Phone number Not Found"],
    },
    password: {
      type: String,
      required: [true, "Password Not Found"],
    },
    address: {
      type: String,
    },
    role: {
      type: String,
      enum: ["doctor", "patient", "admin"],
      default: "patient",
      required: [true, "User type Not Found"],
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// storesModel.path("clients").validate(function (value) {
//   // When running in `validate()` or `validateSync()`, the
//   // validator can access the document using `this`.
//   // Does **not** work with update validators.

//   // console.log(value);
//   // console.log(this.clients);
//   // console.log(this.maxclients);

//   if (this.maxclients > value) {
//     this.allowedtoenter = this.maxclients > value;
//     return true;
//   } else if (this.maxclients == value) {
//     this.allowedtoenter = false;
//     return true;
//   } else {
//     this.allowedtoenter = false;
//     return false;
//   }
// });

// module.exports = mongoose.model('Stores', storesModel);

module.exports = (mongoose) => {
  const Users = mongoose.model("Users", usersModel);
  return Users;
};
