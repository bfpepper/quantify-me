var $         = require('jquery');
var thing     = require('./stylesheets/main.css');
var breakfast = require('./breakfast')
var lunch     = require('./lunch')
var dinner    = require('./dinner')
var snacks    = require('./snacks')
var diaryExercises = require('./exercises-diary')
var foods     = require('./foods')
var exercise     = require('./exercises')

function Diary() {
  this.breakfast = new breakfast;
  this.lunch     = new lunch;
  this.dinner    = new dinner;
  this.snacks    = new snacks;
  this.exercises = new diaryExercises;
}

Diary.prototype.setBreakfastTable = function () {
  var that = this
  $('#foods-diary-table input[type=checkbox]:checked').parent().each(function(index, that) {
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
  if(typeof(currentDiaries.breakfast) === 'undefined'){
    currentDiaries.breakfast = [];
  }
  diary.breakfast.foods.forEach(function(food) {
    currentDiaries.breakfast.push(food)
  })
  diaryJSON = JSON.stringify(currentDiaries)
  localStorage.setItem('diary', diaryJSON)
  this.breakfastTable();
};

Diary.prototype.breakfastTable = function () {
  this.clearBreakfastTable();
  var diaryJSON = localStorage.getItem('diary')
  if (diaryJSON === null) {
    diaryJSON = '{}'
  }
  currentDiaries = JSON.parse(diaryJSON);
  if(typeof(currentDiaries.breakfast) === 'undefined'){
    currentDiaries.breakfast = [];
  }
  currentDiaries.breakfast.forEach(function(food) {
    $('#diary-breakfast-table').append(`<tr>
      <td class='breakfast-food-name'>${food.name}</td>
      <td class='breakfast-food-calories'>${food.calories}</td>
      </tr>`);
  });
  $('#diary-breakfast-table').append(`<tr class="cal-totals-row">
    <td>Total Calories</td>
    <td class='calorie-total'>${diary.breakfast.totalCalories}</td>
    </tr>
    <tr class="cal-totals-row">
    <td>Remaining Calories</td>
    <td class='calorie-total
    ${diary.selectColorCalorieCount(diary.breakfast.remainingCalories)}
    '>${diary.breakfast.remainingCalories}</td>
    </tr>`);
  diary.clearCheckboxes();
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
  $('#foods-diary-table input[type=checkbox]:checked').parent().each(function(index, that) {
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
  if(typeof(currentDiaries.lunch) === 'undefined'){
    currentDiaries.lunch = [];
  }
  diary.lunch.foods.forEach(function(food) {
    currentDiaries.lunch.push(food)
  })
  diaryJSON = JSON.stringify(currentDiaries)
  localStorage.setItem('diary', diaryJSON)
  this.lunchTable();
};

Diary.prototype.lunchTable = function () {
  this.clearLunchTable();
  var diaryJSON = localStorage.getItem('diary')
  if (diaryJSON === null) {
    diaryJSON = '{}'
  }
  currentDiaries = JSON.parse(diaryJSON);
  if(typeof(currentDiaries.lunch) === 'undefined'){
    currentDiaries.lunch = [];
  }
  currentDiaries.lunch.forEach(function(food) {
    $('#diary-lunch-table').append(`<tr>
      <td class='lunch-food-name'>${food.name}</td>
      <td class='lunch-food-calories'>${food.calories}</td>
      </tr>`);
  });
  $('#diary-lunch-table').append(`<tr class="cal-totals-row">
    <td>Total Calories</td>
    <td class='calorie-total'>${diary.lunch.totalCalories}</td>
    </tr>
    <tr class="cal-totals-row">
    <td>Remaining Calories</td>
    <td class='calorie-total
    ${diary.selectColorCalorieCount(diary.lunch.remainingCalories)}
    '>${diary.lunch.remainingCalories}</td>
    </tr>`);
  diary.clearCheckboxes();
};

Diary.prototype.clearLunchTable = function () {
  $('.lunch-table').html('' +
  '<tr>' +
  '<th>Name</th>' +
  '<th>Calories</th>' +
  '</tr>');
};

Diary.prototype.setDinnerTable = function () {
  var that  = this;
  $('#foods-diary-table input[type=checkbox]:checked').parent().each(function(index, that) {
    var name, calories;
    $(this).siblings().each(function(index, that) {
      if(index == 0) {
        name = $(this).text();
      }
      if(index == 1) {
        calories = $(this).text();
      }
    });
    diary.dinner.foods.push(new foods(name, calories))
    return diary
  });
  var diaryJSON = localStorage.getItem('diary');
  if (diaryJSON === null) {
    diaryJSON = '{}'
  }
  var currentDiaries = JSON.parse(diaryJSON);
  if(typeof(currentDiaries.dinner) === 'undefined'){
    currentDiaries.dinner = [];
  }
  diary.dinner.foods.forEach(function(food) {
    currentDiaries.dinner.push(food)
  })
  diaryJSON = JSON.stringify(currentDiaries)
  localStorage.setItem('diary', diaryJSON)
  this.dinnerTable();
};

Diary.prototype.dinnerTable = function () {
  this.clearDinnerTable();
  var diaryJSON = localStorage.getItem('diary');
  if (diaryJSON === null) {
    diaryJSON = '{}';
  }
  currentDiaries = JSON.parse(diaryJSON);
  if(typeof(currentDiaries.dinner) === 'undefined'){
    currentDiaries.dinner = [];
  }
  currentDiaries.dinner.forEach(function(food){
    $('.dinner-table').append(`<tr>
      <td class='dinner-food-name'>${food.name}</td>
      <td class='dinner-food-calories'>${food.calories}</td>
      </tr>`);
  })
  $('.dinner-table').append(`<tr class="cal-totals-row">
    <td>Total Calories</td>
    <td class='calorie-total'>${diary.dinner.totalCalories}</td>
    </tr>
    <tr class="cal-totals-row">
    <td>Remaining Calories</td>
    <td class='calorie-total
    ${diary.selectColorCalorieCount(diary.dinner.remainingCalories)}'>
    ${diary.dinner.remainingCalories}</td>
    </tr>`);
  diary.clearCheckboxes();
};

Diary.prototype.clearDinnerTable = function () {
  $('.dinner-table').html('' +
    '<tr>' +
    '<th>Name</th>' +
    '<th>Calories</th>' +
    '</tr>');
};

Diary.prototype.setSnacksTable = function () {
  var that  = this;
  $('#foods-diary-table input[type=checkbox]:checked').parent().each(function(index, that) {
    var name, calories;
    $(this).siblings().each(function(index, that) {
      if(index == 0) {
        name = $(this).text();
      }
      if(index == 1) {
        calories = $(this).text();
      }
    });
    diary.snacks.foods.push(new foods(name, calories));
    return diary;
  });
  var diaryJSON = localStorage.getItem('diary');
  if (diaryJSON === null) {
    diaryJSON = '{}';
  }
  var currentDiaries = JSON.parse(diaryJSON);
  if(typeof(currentDiaries.snacks) === 'undefined'){
    currentDiaries.snacks = [];
  }
  diary.snacks.foods.forEach(function(food) {
    currentDiaries.snacks.push(food);
  })
  diaryJSON = JSON.stringify(currentDiaries);
  localStorage.setItem('diary', diaryJSON);
  this.snacksTable();
};

Diary.prototype.snacksTable = function () {
  this.clearSnacksTable();
  var diaryJSON = localStorage.getItem('diary');
  if (diaryJSON === null) {
    diaryJSON = '{}';
  }
  currentDiaries = JSON.parse(diaryJSON);
  if(typeof(currentDiaries.snacks) === 'undefined'){
    currentDiaries.snacks = [];
  }
  currentDiaries.snacks.forEach(function(food){
    $('#diary-snacks-table').append(`<tr>
      <td class='snack-food-name'>${food.name}</td>
      <td class='snack-food-calories'>${food.calories}</td>
      </tr>`);
  })
  $('#diary-snacks-table').append(`<tr class="cal-totals-row">
    <td>Total Calories</td>
    <td class='calorie-total'>${diary.snacks.totalCalories}</td>
    </tr>
    <tr class="cal-totals-row">
    <td>Remaining Calories</td>
    <td class='calorie-total
    ${diary.selectColorCalorieCount(diary.snacks.remainingCalories)}'>
    ${diary.snacks.remainingCalories}</td>
    </tr>`);
  diary.clearCheckboxes();
};

Diary.prototype.clearSnacksTable = function () {
  $('#diary-snacks-table').html('' +
    '<tr>' +
    '<th>Name</th>' +
    '<th>Calories</th>' +
    '</tr>');
};

Diary.prototype.setExerciseTable = function () {
  var that  = this;
  $('#exercises-diary-table input[type=checkbox]:checked').parent().each(function(index, that) {
    var name, calories;
    $(this).siblings().each(function(index, that) {
      if(index == 0) {
        name = $(this).text();
      }
      if(index == 1) {
        calories = $(this).text();
      }
    });
    diary.exercises.exercises.push(new exercise(name, calories));
    return diary;
  });
  var diaryJSON = localStorage.getItem('diary');
  if (diaryJSON === null) {
    diaryJSON = '{}';
  }
  var currentDiaries = JSON.parse(diaryJSON);
  if(typeof(currentDiaries.exercises) === 'undefined'){
    currentDiaries.exercises = [];
  }
  diary.exercises.exercises.forEach(function(exercise) {
    currentDiaries.exercises.push(exercise);
  })
  diaryJSON = JSON.stringify(currentDiaries);
  localStorage.setItem('diary', diaryJSON);
  this.exerciseTable();
};

Diary.prototype.exerciseTable = function () {
  this.clearExerciseTable();
  var diaryJSON = localStorage.getItem('diary');
  diary.exercises.calculateTotalCalories();
  var allCalories = diary.exercises.totalCalories;
  if (diaryJSON === null) {
    diaryJSON = '{}';
  }
  currentDiaries = JSON.parse(diaryJSON);
  if(typeof(currentDiaries.exercises) === 'undefined'){
    currentDiaries.exercises = [];
  }
  currentDiaries.exercises.forEach(function(exercise){
    $('#diary-exercise-table').append(`<tr>
      <td class='diary-exercise-name'>${exercise.name}</td>
      <td class='diary-exercise-calories'>${exercise.calories}</td>
      </tr>`);
  })
  $('#diary-exercise-table').append(`<tr class="cal-totals-row">
    <td>Total Calories</td>
    <td class='calorie-total'>${allCalories}</td>
    </tr>`);
  diary.clearCheckboxes();
};

Diary.prototype.clearExerciseTable = function () {
  $('#diary-exercise-table').html('' +
    '<tr>' +
    '<th>Name</th>' +
    '<th>Calories</th>' +
    '</tr>');
};

Diary.prototype.clearCheckboxes = function () {
  $('input[type=checkbox]:checked').prop('checked', false);
};

Diary.prototype.printConsumedCalories = function () {
  var consumedCalories = this.calculateConsumedCalories();
  $('#calories-consumed').text(`${consumedCalories}`)
};

Diary.prototype.calculateConsumedCalories = function () {
  return this.snacks.totalCalories + this.dinner.totalCalories +
  this.breakfast.totalCalories + this.lunch.totalCalories
};

Diary.prototype.selectColorCalorieCount = function (count) {
  if(count < 0) {
    return "red"
  } else {
    return "green"
  }
};

var diary = new Diary();

module.exports = Diary;
