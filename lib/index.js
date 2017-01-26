var Food = require('./foods');
var Exercise = require('./exercises');

var someFood = new Food();
var someExercise = new Exercise();


$(document).ready(function () {
  $('.go-to-exercises').on('click', function() {
    window.location.replace('/exercises.html')
  });
  $('.go-to-foods').on('click', function() {
    window.location.replace('/foods.html')
  });
});
