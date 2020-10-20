let express = require("express");
let app = express();
let port = 4000;
let createPerson = require("./routes/createPerson");
let findPerson = require("./routes/findPerson");
let Person = require("./models/person");
const connectDB = require("./helper/connectDB");

app.listen(port, function () {
  console.log(
    "The server is running, " +
      " please, open your browser on http://localhost:%s",
    port
  );
});
connectDB();
//Create a record and save it
app.use("/person", createPerson);
//Find a record
app.use("/findPerson", findPerson);

//Perform Classic Updates by Running Find, Edit, then Save
function addHamb(food) {
  let test = false;
  food.map((el) => {
    if (el.toLowerCase() === "hamburger") {
      test = true;
      return food;
    }
  });
  if (!test) food.push("Hamburger");
  return food;
}
app.put("/updateFood/:id", (req, res) => {
  Person.findById({ _id: req.params.id }, (err, result) => {
    if (err) res.send("Error");
    else {
      addHamb(result.favouriteFoods);
      result.save(function (err) {
        if (err) console.error("ERROR!");
      });
      res.send(result);
    }
  });
});

//Perform New Updates on a Document Using model.findOneAndUpdate()
app.put("/updateAge/:name", (req, res) => {
  Person.findOneAndUpdate({ name: req.params.name }, { age: 20 }, { new: true })
    .then((docs) => res.send(docs))
    .catch((err) => res.send(err));
});
//find all persons
app.get("/", (req, res) => {
  console.log(req.params);
  Person.find()
    .exec()
    .then((doc) => {
      res.status(200).send(doc);
    })
    .catch((err) => res.send(err));
});

// Delete One Document Using model.findByIdAndRemove
app.delete("/delete/:id", (req, res) => {
  Person.findByIdAndRemove({ _id: req.params.id }, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(`<h1>Removed user: </h1>${result}`);
    }
  });
});

// MongoDB and Mongoose - Delete Many Documents with model.remove()
app.delete("/deleteMary", (req, res) => {
  Person.remove({ name: "Mary" }, (err, result) => {
    if (err) {
      res.send(err);
    } else res.send(result);
  });
});

// Chain Search Query Helpers to Narrow Search Results
app.get("/burrito", (req, res) => {
  Person.find({ favouriteFoods: "burrito" })
    .sort({ name: 1 })
    .limit(2)
    .select({ age: false })
    .exec((err, data) => {
      if (err) {
        res.send(err);
      } else {
        if (!data[0]) {
          res.send("<h1>No person lik Burrito</h1>");
        } else res.send(data);
      }
    });
});
