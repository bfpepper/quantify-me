var $ = require('jquery')

function Exercise(name, calories) {
  this.name = name
  this.calories = calories
}

Exercise.prototype.createExercise = function () {
  this.name = $('input.create-exercise-name').val();
  this.calories = $('input.create-exercise-calorie-count').val();
  this.clearForm();
  this.saveExercise(this.name, this.calories);
};

Exercise.prototype.saveExercise = function (name, calories) {
  var exercisesJSON = localStorage.getItem('exercises');
  if (exercisesJSON === null) {
    exercisesJSON = '[]';
  }
  var currentExercises = JSON.parse(exercisesJSON);
  currentExercises.push({name: name, calories: calories})
  exercisesJSON = JSON.stringify(currentExercises);
  localStorage.setItem('exercises', exercisesJSON);
  this.addExercises();
};

Exercise.prototype.addExercises = function () {
  this.clearTable();
  var exercisesJSON = localStorage.getItem('exercises');
  if (exercisesJSON === null) {
    exercisesJSON = '[]';
  }
  var currentExercises = JSON.parse(exercisesJSON);
  currentExercises.forEach(function(exercise){
    $('.exercise-table').append(`<tr>
      <td class='exercise-name'>${exercise.name}</td>
      <td class='exercise-calories'>${exercise.calories}</td>
      <td><button class='delete-exercise-button' type='button'>-</button></td>
      </tr>`);
  })
  this.createDeleteListener();
  this.createUpdateListener();
};

Exercise.prototype.updateExercise = function () {
  var that = this;
  $('.exercise-name, .exercise-calories').off('click');
  var $exerciseRow = $(this).parent();
  var $name = $exerciseRow.children('.exercise-name');
  var oldName = $name.text();
  $name.html(`<input class='update-exercise-name' type="text" name='name' value=${$name.text()}></br>`)
  var $calories = $exerciseRow.children('.exercise-calories');
  $calories.html(`<input class='update-exercise-calorie-count' type="text" name='calories' value=${$calories.text()}></br>`)
  $('.update-exercise-name, .update-exercise-calorie-count').on('blur', function () {
    var name = $('input.update-exercise-name').val();
    var calories = $('input.update-exercise-calorie-count').val();
    var newExercise = new Exercise;
    newExercise.updateLocal(oldName, name, calories);
  });
};

Exercise.prototype.updateLocal = function (oldName, name, calories) {
  var exercisesJSON = localStorage.getItem('exercises');
  if (exercisesJSON === null) {
    exercisesJSON = '[]';
  }
  var currentExercises = JSON.parse(exercisesJSON);
  currentExercises.filter(function(exercise, index){
    if (exercise.name === oldName) {
      currentExercises.splice(index, 1);
      currentExercises.push({name: name, calories: calories});
    }
  });
  exercisesJSON = JSON.stringify(currentExercises)
  localStorage.setItem('exercises', exercisesJSON);
  this.addExercises();
};

Exercise.prototype.deleteExercise = function (name, calories) {
  var exercise = {name: this.name, calories: this.calories};
  var exercisesJSON = localStorage.getItem('exercises');
  if (exercisesJSON === null) {
    exercisesJSON = '[]';
  }
  var currentExercises = JSON.parse(exercisesJSON);
  currentExercises.filter(function(exercise, index){
    if (exercise.name === name) {
      currentExercises.splice(index, 1)
    }
  });
  exercisesJSON = JSON.stringify(currentExercises)
  localStorage.setItem('exercises', exercisesJSON);
  this.addExercises();
};

Exercise.prototype.clearTable = function () {
  $('.exercise-table').html('');
};

Exercise.prototype.clearForm = function () {
  $('.create-exercise-form').children('input').val('');
};

Exercise.prototype.createUpdateListener = function () {
  $('.exercise-name, .exercise-calories').on('click', this.updateExercise)
};

Exercise.prototype.createDeleteListener = function () {
  var that = this;
  $('.delete-exercise-button').on('click', function () {
    var $name = $(this).parent().siblings()[0].innerHTML;
    var $calories = $(this).parent().siblings()[1].innerHTML;
    that.deleteExercise($name, $calories);
  });
};

$(document).ready(function () {
  var newExercise = new Exercise();
  $('.create-exercise-button').on('click', function () {
    newExercise.createExercise();
  });
  newExercise.addExercises();
});

module.exports = Exercise;
