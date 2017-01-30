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
};

Diary.prototype.clearSnacksTable = function () {
  $('#diary-snacks-table').html('' +
    '<tr>' +
    '<th>Name</th>' +
    '<th>Calories</th>' +
    '</tr>');
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
diary.setBreakfastTable();

module.exports = Diary;
