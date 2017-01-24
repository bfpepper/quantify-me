var $ = require('jquery')

function Exercise(name, calories) {
  this.name = name
  this.calories = calories
}

Exercise.prototype.createExercise = function () {
  this.name = $('input.create-exercise-name').val();
  this.calories = $('input.create-exercise-calorie-count').val();
  this.saveExercise(this.name, this.calories);
  this.addExercise();
};

Exercise.prototype.saveExercise = function (name, calories) {
  var exerciseJSON = localStorage.getItem('exercises');
  if (exerciseJSON === null) {
    exerciseJSON = '[]';
  }
  var currentExercises = JSON.parse(exerciseJSON);
  currentExercises.push({name: name, calories: calories})
  exerciseJSON = JSON.stringify(currentExercises);
  localStorage.setItem('exercises', exerciseJSON);
  this.addExercise();
};

Exercise.prototype.addExercise = function () {
  $('.exercise-table').append(`<tr>
    <td class='exercise-name'>${this.name}</td>
    <td class='exercise-calories'>${this.calories}</td>
    <td><button class='delete-exercise-button' type='button'>-</button></td>
    </tr>`);
    this.createDeleteListener();
    this.createUpdateListener();
};

Exercise.prototype.updateExercise = function () {
  $('.exercise-name, .exercise-calories').off('click');
  var $exerciseRow = $(this).parent();
  var $name = $exerciseRow.children('.exercise-name');
  $name.html(`<input class='create-exercise-name' type="text" name='name' value=${$name.text()}></br>`)
  var $calories = $exerciseRow.children('.exercise-calories');
  $calories.html(`<input class='create-exercise-calorie-count' type="text" name='calories' value=${$calories.text()}></br>`)
  // $('.exercise-name, .exercise-calories').on('unclick');
};

Exercise.prototype.createUpdateListener = function () {
  $('.exercise-name, .exercise-calories').on('click', this.updateExercise)
};

Exercise.prototype.createDeleteListener = function () {
  $('.delete-exercise-button').on('click', function () {
    $(this).parent().parent().remove()
  });
};

$(document).ready(function () {
  $('.create-exercise-button').on('click', function () {
    var newExercise = new Exercise();
    newExercise.createExercise();
  });
});

module.exports = Exercise;
