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
  this.breakfastTable();
};

Diary.prototype.breakfastTable = function () {
  this.clearBreakfastTable();
  var breakfastJSON = localStorage.getItem('diary')
  if (breakfastJSON === null) {
    breakfastJSON = '[]'
  }
  currentBreakfastFoods = JSON.parse(breakfastJSON);
  currentBreakfastFoods.breakfast.forEach(function(food) {
    $('.breakfast-table').append(`<tr>
      <td class='breakfast-food-name'>${food.name}</td>
      <td class='breakfast-food-calories'>${food.calories}</td>
      </tr>`);
  });
};

Diary.prototype.clearBreakfastTable = function () {
  $('.breakfast-table').html('' +
  '<tr>' +
  '<th>Name</th>' +
  '<th>Calories</th>' +
  '</tr>');
};

Diary.prototype.setLunchTable = function () {
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
    diary.lunch.foods.push(new foods(name, calories))
    return diary
  });
  var diaryJSON = localStorage.getItem('diary');
  if (diaryJSON === null) {
    diaryJSON = '{}';
  }
  var currentDiaries = JSON.parse(diaryJSON);
  currentDiaries.lunch = diary.lunch.foods
  diaryJSON = JSON.stringify(currentDiaries)
  localStorage.setItem('diary', diaryJSON)
  this.lunchTable();
};

Diary.prototype.lunchTable = function () {
  this.clearLunchTable();
  var lunchJSON = localStorage.getItem('diary')
  if (lunchJSON === null) {
    lunchJSON = '[]'
  }
  currentBreakfastFoods = JSON.parse(lunchJSON);
  currentBreakfastFoods.lunch.forEach(function(food) {
    $('.lunch-table').append(`<tr>
      <td class='lunch-food-name'>${food.name}</td>
      <td class='lunch-food-calories'>${food.calories}</td>
      </tr>`);
  });
};

Diary.prototype.clearLunchTable = function () {
  $('.lunch-table').html('' +
  '<tr>' +
  '<th>Name</th>' +
  '<th>Calories</th>' +
  '</tr>');
};



var diary = new Diary
diary.setBreakfastTable();

module.exports = Diary;
