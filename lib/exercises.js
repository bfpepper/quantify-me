var $ = require('jquery')

function Exercise(name, calories) {
  this.name = name
  this.calories = calories
}

Exercise.prototype.createExercise = function () {
  this.name = $('input.create-exercise-name').val();
  this.calories = $('input.create-calorie-count').val();
  this.addExercise();
};

Exercise.prototype.addExercise = function () {
  $('.exercise-table').append(`<tr>
    <td class='exercise-name'>${this.name}</td>
    <td class='exercise-calories'>${this.calories}</td>
    <td><button class='delete-exercise-button' type='button'>-</button></td>
    </tr>`)
    this.createDeleteListener();
    this.createUpdateListener();
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
