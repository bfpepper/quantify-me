var $         = require('jquery');
var thing     = require('./stylesheets/main.css');
var breakfast = require('./breakfast')
var lunch     = require('./lunch')
var dinner    = require('./dinner')
var snacks    = require('./snacks')
var diaryExercises = require('./exercises-diary')
var foods     = require('./foods')
var exercise  = require('./exercises')

function Diary(date) {
  this.loadDiary(date)
}

Diary.prototype.setBreakfastTable = function () {
  var diary = this
  $('#foods-diary-table input[type=checkbox]:checked').parent().each(function(index) {
    var name
    var calories
    $(this).siblings().each(function(index) {
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
  if(typeof(currentDiaries[diary.date]) === 'undefined'){
    currentDiaries[diary.date] = {};
  }
  currentDiaries[diary.date].breakfast = diary.breakfast.foods
  this.replaceToLocalStorage(currentDiaries);
  this.breakfastTable();
};

Diary.prototype.breakfastTable = function () {
  this.clearBreakfastTable();
  var diary = this
  var currentDiaries = this.fetchDiaries();
  if(currentDiaries[diary.date].breakfast) {
    currentDiaries[diary.date].breakfast.forEach(function(food) {
      $('#diary-breakfast-table').append(`<tr>
        <td class='breakfast-food-name'>${food.name}</td>
        <td class='breakfast-food-calories'>${food.calories}</td>
        </tr>`);
    });
  };
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
  var diary = this
  $('#foods-diary-table input[type=checkbox]:checked').parent().each(function(index) {
    var name
    var calories
    $(this).siblings().each(function(index) {
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
  if(typeof(currentDiaries[diary.date]) === 'undefined'){
    currentDiaries[diary.date] = {};
  }
  currentDiaries[diary.date].lunch = diary.lunch.foods
  this.replaceToLocalStorage(currentDiaries);
  this.lunchTable();
};

Diary.prototype.lunchTable = function () {
  var diary = this
  this.clearLunchTable();
  var currentDiaries = this.fetchDiaries();
  if(currentDiaries[diary.date].lunch) {
    currentDiaries[diary.date].lunch.forEach(function(food) {
      $('#diary-lunch-table').append(`<tr>
        <td class='lunch-food-name'>${food.name}</td>
        <td class='lunch-food-calories'>${food.calories}</td>
        </tr>`);
    });
  };
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
  var diary = this
  $('#foods-diary-table input[type=checkbox]:checked').parent().each(function(index) {
    var name, calories;
    $(this).siblings().each(function(index) {
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
  if(typeof(currentDiaries[diary.date]) === 'undefined'){
    currentDiaries[diary.date] = {};
  }
  currentDiaries[diary.date].dinner = diary.dinner.foods
  this.replaceToLocalStorage(currentDiaries);
  this.dinnerTable();
};

Diary.prototype.dinnerTable = function () {
  var diary = this
  this.clearDinnerTable();
  var currentDiaries = this.fetchDiaries();
  if(currentDiaries[diary.date].dinner) {
    currentDiaries[diary.date].dinner.forEach(function(food){
      $('.dinner-table').append(`<tr>
        <td class='dinner-food-name'>${food.name}</td>
        <td class='dinner-food-calories'>${food.calories}</td>
        </tr>`);
    });
  };
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
  var diary = this
  $('#foods-diary-table input[type=checkbox]:checked').parent().each(function(index) {
    var name, calories;
    $(this).siblings().each(function(index) {
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
  if(typeof(currentDiaries[diary.date].snacks) === 'undefined'){
    currentDiaries[diary.date].snacks = [];
  }
  currentDiaries[diary.date].snacks = diary.snacks.foods
  this.replaceToLocalStorage(currentDiaries);
  this.snacksTable();
};

Diary.prototype.snacksTable = function () {
  var diary = this
  this.clearSnacksTable();
  var currentDiaries = this.fetchDiaries();
  if(currentDiaries[diary.date].snacks) {
    currentDiaries[diary.date].snacks.forEach(function(food){
      $('#diary-snacks-table').append(`<tr>
        <td class='snack-food-name'>${food.name}</td>
        <td class='snack-food-calories'>${food.calories}</td>
        </tr>`);
    });
  };
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
  var diary = this
  $('#exercises-diary-table input[type=checkbox]:checked').parent().each(function(index) {
    var name, calories;
    $(this).siblings().each(function(index) {
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
  if(typeof(currentDiaries[diary.date].exercises) === 'undefined'){
    currentDiaries[diary.date].exercises = [];
  }
  currentDiaries[diary.date].exercises = diary.exercises.exercises
  this.replaceToLocalStorage(currentDiaries);
  this.exerciseTable();
};

Diary.prototype.exerciseTable = function () {
  this.clearExerciseTable();
  var diary = this
  var currentDiaries = this.fetchDiaries();
  if(currentDiaries[diary.date].exercises) {
    currentDiaries[diary.date].exercises.forEach(function(exercise){
      $('#diary-exercise-table').append(`<tr>
        <td class='diary-exercise-name'>${exercise.name}</td>
        <td class='diary-exercise-calories'>${exercise.calories}</td>
        </tr>`);
    });
  };
  diary.exercises.calculateTotalCalories();
  var allCalories = diary.exercises.totalCalories;
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

Diary.prototype.fetchDiaries = function () {
  var diaryJSON = localStorage.getItem('diary');
  if (diaryJSON === null) {
    diaryJSON = '{}';
  }
  currentDiaries = JSON.parse(diaryJSON);
  if(typeof(currentDiaries[this.date]) === 'undefined'){
    currentDiaries[this.date] ={};
  }
  return currentDiaries;
};

Diary.prototype.replaceToLocalStorage = function (currentDiaries) {
  diaryJSON = JSON.stringify(currentDiaries);
  localStorage.setItem('diary', diaryJSON);
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

Diary.prototype.loadDiary = function (date) {
  var diaryJSON = localStorage.getItem('diary');
  if (diaryJSON === null) {
    diaryJSON = '{}';
  }
  currentDiaries = JSON.parse(diaryJSON);
  var currentDiary = currentDiaries[date] || {}
  this.breakfast = new breakfast({foods: currentDiary.breakfast});
  this.lunch     = new lunch({foods: currentDiary.lunch});
  this.dinner    = new dinner({foods: currentDiary.dinner});
  this.snacks    = new snacks({foods: currentDiary.snacks});
  this.exercises = new diaryExercises({foods: currentDiary.exercises});
  this.date      = date;
}

module.exports = Diary;
