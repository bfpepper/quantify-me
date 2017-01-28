var $     = require('jquery');
var thing = require('./stylesheets/main.css');
var error = require('../lib/errors-handler');

function Exercise(name, calories) {
  this.name = name;
  this.calories = calories;
};

Exercise.prototype.createExercise = function () {
  this.name     = $('input.create-exercise-name').val();
  this.calories = $('input.create-exercise-calorie-count').val();
  this.errorCheck().bind(this);
};

Exercise.prototype.errorCheck = function () {
  if (this.name === '' || this.calories === '') {
    var newError = new error;
    newError.validations(this);
  } else {
    this.clearForm();
    this.saveExercise(this.name, this.calories);
  }
};

Exercise.prototype.saveExercise = function (name, calories) {
  var currentExercises = this.retrieveFromLocalStorage('exercises')
  currentExercises.unshift({name: name, calories: calories});
  this.replaceToLocalStorage(currentExercises)
  this.addExercisesToPage();
};

Exercise.prototype.addExercisesToPage = function () {
  this.clearTable();
  var currentExercises = this.retrieveFromLocalStorage('exercises')
  this.printExercises(currentExercises);
  this.createDeleteListener();
  this.createUpdateListener();
};

Exercise.prototype.printExercises = function (currentExercises) {
  currentExercises.forEach(function(exercise){
    $('.exercise-table').append(
      `<tr>
      <td class='exercise-name'>${exercise.name}</td>
      <td class='exercise-calories'>${exercise.calories}</td>
      <td><button id='delete-exercise-button' class='delete-exercise-button badge' type='button'>-</button></td>
      </tr>`);
    });
};

Exercise.prototype.updateExercise = function () {
  var that = this;
  $('.exercise-name, .exercise-calories').off('click');
  var $exerciseRow = $(this).parent();
  var $name        = $exerciseRow.children('.exercise-name');
  var oldName      = $name.text();
  var $calories    = $exerciseRow.children('.exercise-calories');
  $name.html(`<input class='update-exercise-name' type="text" name='name' value=${$name.text()}></br>`);
  $calories.html(`<input class='update-exercise-calorie-count' type="text" name='calories' value=${$calories.text()}></br>`);
  $('.update-exercise-name, .update-exercise-calorie-count').on('blur keypress', function (keypress) {
    var newExercise = new Exercise;
    newExercise.triggerUpdate(keypress, oldName);
  });
};

Exercise.prototype.triggerUpdate = function (keypress, oldName) {
  if(keypress.keyCode == 13 || keypress.keyCode == null) {
    var name        = $('input.update-exercise-name').val();
    var calories    = $('input.update-exercise-calorie-count').val();
    this.updateLocalStorage(oldName, name, calories);
  }
};

Exercise.prototype.deleteExercise = function (name, calories) {
  var currentExercises = this.retrieveFromLocalStorage('exercises')
  var updatedExercises = this.deleteFromCurrentExercises(currentExercises, name);
  this.replaceToLocalStorage(updatedExercises)
  this.addExercisesToPage();
};

Exercise.prototype.deleteFromCurrentExercises = function (currentExercises, name) {
  currentExercises.filter(function(exercise, index){
      if (exercise.name === name) {
        currentExercises.splice(index, 1);
      }
    });
  return currentExercises;
};

Exercise.prototype.updateLocalStorage = function (oldName, name, calories) {
  var currentExercises = this.retrieveFromLocalStorage('exercises')
  var update = {oldName: oldName, name: name, calories: calories};
  var updatedExercises = this.updateCurrentExercises(currentExercises, update)
  this.replaceToLocalStorage(updatedExercises);
  this.addExercisesToPage();
};

Exercise.prototype.updateCurrentExercises = function (currentExercises, update) {
  currentExercises.filter(function(exercise, index){
    if (exercise.name === update.oldName) {
      currentExercises.splice(index, 1);
      currentExercises.unshift({name: update.name, calories: update.calories});
    }
  });
  return currentExercises;
};

Exercise.prototype.retrieveFromLocalStorage = function () {
  var exercisesJSON = localStorage.getItem('exercises');
  if (exercisesJSON === null) {
    exercisesJSON = '[]';
  }
  return JSON.parse(exercisesJSON);
};

Exercise.prototype.replaceToLocalStorage = function (currentExercises) {
  exercisesJSON = JSON.stringify(currentExercises);
  localStorage.setItem('exercises', exercisesJSON);
};

Exercise.prototype.clearTable = function () {
  $('.exercise-table').html('' +
  '<tr>' +
  '<th>Name</th>' +
  '<th>Calories</th>' +
  '<th>Delete</th>' +
  '</tr>');
};

Exercise.prototype.clearForm = function () {
  $('.create-exercise-form').children('input').val(' ');
};

Exercise.prototype.createUpdateListener = function () {
  $('.exercise-name, .exercise-calories').on('click', this.updateExercise)
};

Exercise.prototype.createDeleteListener = function () {
  var that = this;
  $('.delete-exercise-button').on('click', function () {
    var $name     = $(this).parent().siblings()[0].innerHTML;
    var $calories = $(this).parent().siblings()[1].innerHTML;
    that.deleteExercise($name, $calories);
  });
};

$(document).ready(function () {
  var newExercise = new Exercise();
  newExercise.addExercisesToPage();
  $('.create-exercise-button').on('click', function () {
    newExercise.createExercise();
  });
  $('.go-to-foods').on('click', function() {
    window.location.replace('/foods.html');
  });
});

module.exports = Exercise;
