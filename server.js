//dependencies
const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

const db = require('./models');

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", 
{ 
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

//HTML routes - Get requests
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get("/stats", (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'stats.html'));
});

app.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'exercise.html'));
});

//API Routes
//API Get requests
app.get("/api/workouts", (req, res) => {
  db.Workout.find({})
    .then(dbWorkout => {
      res.json(dbWorkout)
    })
    .catch(err => {
      res.json(err)
    })
})

//Post requests
app.post("/api/workouts", (req, res) => {
  console.log(req.body);
  db.Workout.create({})
    .then(dbUpdate => {
      res.json(dbUpdate)
    })
  .catch(err => {
      res.json(err)
    });
});

//to work with stats file
app.get("/api/workouts/range", (req, res) => {
  db.Workout.find({})
    .then(dbWorkout => {
      res.json(dbWorkout)
    })
    .catch(err => {
      res.json(err)
    })
})

//Put requests
app.put("/api/workouts/:id", (req,res) => {

    db.Workout.updateOne( {_id: req.params.id }, {$push: {exercises:  [
      {
      "type" : req.body.type,
      "name" : req.body.name,
      "duration" : req.body.duration,
      "distance" : req.body.distance,
      "weight" : req.body.weight,
      "reps" : req.body.reps,
      "sets" : req.body.sets
      }
    ] 
  }}).then(dbUpdate => {
    res.json(dbUpdate);
  })
  .catch(err => {
    res.json(err);
  });
});

app.listen(PORT, () => {
  console.log("App running on port 3000!");
});
