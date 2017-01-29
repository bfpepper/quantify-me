var $         = require('jquery');
var thing     = require('./stylesheets/main.css');
var breakfast = require('./breakfast')
var lunch     = require('./lunch')
var dinner    = require('./dinner')
var snacks    = require('./snacks')
var diaryExercises = require('./exercises-diary')
var foods     = require('./foods')

function Diary() {
  this.breakfast = new breakfast;
  this.lunch     = new lunch;
  this.dinner    = new dinner;
  this.snacks    = new snacks;
  this.exercises = new diaryExercises;
}

Diary.prototype.setBreakfastTable = function () {
  var that = this
  var diary = new Diary
  var thing = $('input[type=checkbox]:checked').parent().each(function(index, that) {
    var name
    var calories
    $(this).siblings().each(function(index, that) {
      if(index == 0) {
        name = $(this).text();
      }
      if(index == 1) {
        calories = $(this).text();
      }
    });
    diary.breakfast.foods.push(new foods(name, calories))
    return diary
  });
  var diaryJSON = localStorage.getItem('diary');
  if (diaryJSON === null) {
    diaryJSON = '{}';
  }
  var currentDiaries = JSON.parse(diaryJSON);
  currentDiaries.breakfast = diary.breakfast.foods
  diaryJSON = JSON.stringify(currentDiaries)
  localStorage.setItem('diary', diaryJSON)
};

// Exercise.prototype.replaceToLocalStorage = function (currentExercises) {
//   exercisesJSON = JSON.stringify(currentExercises);
//   localStorage.setItem('exercises', exercisesJSON);
// };


module.exports = Diary;
