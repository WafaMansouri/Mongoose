let express = require("express");
let router = express.Router();
let Person = require("../models/person");

// find people having the same name
router.get("/:person", (req, res) => {
  Person.find({ name: req.params.person })
    .exec()
    .then((docs) => {
      console.log(docs);
      if (docs[0]) {
        res.send(docs);
      } else res.send("<h1>Person not found!</h1>");
    });
});

//find one person bye favourite food
router.get("/food/:food", (req, res) => {
  Person.findOne({ favouriteFoods: req.params.food }, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      if (result) {
        res.send(result);
      } else res.send(`<h1>No person like ${req.params.food}</h1>`);
    }
  });
});

//find person by ID
router.get("/id/:id", (req, res) => {
  Person.findById({ _id: req.params.id }, (err, result) => {
    console.log(result);
    if (err) {
      res.send("<h1>Person not found!</h1>");
    } else {
      res.send(result);
    }
  });
});
module.exports = router;
