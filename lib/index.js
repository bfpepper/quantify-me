var $ = require('jquery')
var Food = require('./foods');
var Exercise = require('./exercises');

var someFood = new Food();
var someExercise = new Exercise();

setDiaryExercisesTable = function () {
  var exercisesJSON = localStorage.getItem('exercises');
  if (exercisesJSON === null) {
    exercisesJSON = '[]';
  }
  var currentExercises = JSON.parse(exercisesJSON);
  currentExercises.forEach(function(exercise){
    $('#exercises-diary-table').append(`<tr>
      <td id='exercise-diary-name'>${exercise.name}</td>
      <td id='exercise-diary-calories'>${exercise.calories}</td>
      </tr>`);
  })
};

setDiaryFoodsTable = function () {
  var foodsJSON = localStorage.getItem('foods');
  if (foodsJSON === null) {
    foodsJSON = '[]';
  }
  var currentExercises = JSON.parse(foodsJSON);
  currentExercises.forEach(function(food){
    $('#foods-diary-table').append(`<tr>
      <td id='food-diary-name'>${food.name}</td>
      <td id='food-diary-calories'>${food.calories}</td>
      </tr>`);
  })
};

$(document).ready(function () {
  $('.go-to-exercises').on('click', function() {
    window.location.replace('/exercises.html')
  });
  $('.go-to-foods').on('click', function() {
    window.location.replace('/foods.html')
  });
  setDiaryExercisesTable();
  setDiaryFoodsTable();
});
