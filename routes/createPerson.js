let express = require("express");
let router = express.Router();
let bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: false }));
let Person = require("../models/person");

//To create and save new person
router.post("/:person", (req, res) => {
  let person = new Person({
    name: req.params.person,
    age: req.body.age,
    favouriteFoods: req.body.favouriteFoods,
  });
  console.log(person);
  person.save((err, data) => {
    if (err) {
      res.send("<h1>This name has already been used</h1>");
    } else res.send(data);
  });
});
module.exports = router;
