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
  diary.findNewBreakfastItems();
  var currentDiaries = diary.fetchDiaries();
  currentDiaries[diary.date].breakfast = diary.breakfast.foods
  this.replaceToLocalStorage(currentDiaries);
  this.breakfastTable();
};

Diary.prototype.findNewBreakfastItems = function () {
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
    diary.breakfast.foods.push(new foods(name, calories));
  });
};

Diary.prototype.breakfastTable = function () {
  var diary = this
  diary.clearBreakfastTable();
  var currentDiaries = diary.fetchDiaries();
  diary.printBreakfast(currentDiaries);
  diary.printConsumedCalories();
  diary.clearCheckboxes();
};

Diary.prototype.printBreakfast = function (currentDiaries) {
  var diary = this;
  if(currentDiaries[this.date].breakfast) {
    currentDiaries[this.date].breakfast.forEach(function(food) {
      $('#diary-breakfast-table').append(`<tr>
        <td class='breakfast-food-name'>${food.name}</td>
        <td class='breakfast-food-calories'>${food.calories}</td>
        <td><button class='delete-food-meal-button badge' type='button'>-</button></td>
        </tr>`);
    });
  };
  diary.breakfast.calculateTotalCalories();
  var allCalories = diary.breakfast.totalCalories;
  diary.breakfast.calculateRemainingCalories();
  var remainingCalories = diary.breakfast.remainingCalories;
  $('#diary-breakfast-table').append(`<tr class="cal-totals-row">
    <td>Total Calories</td>
    <td class='calorie-total'>${allCalories}</td>
    <td></td>
    </tr>
    <tr class="cal-totals-row">
    <td>Remaining Calories</td>
    <td class='calorie-total
    ${this.selectColorCalorieCount(remainingCalories)}
    '>${remainingCalories}</td>
    <td></td>
    </tr>`
  );
};

Diary.prototype.clearBreakfastTable = function () {
  $('.breakfast-table').html('' +
    '<tr>' +
    '<th>Name</th>' +
    '<th>Calories</th>' +
    '</tr>'
  );
};

Diary.prototype.deleteBreakfastFood = function (data) {
  var name = data.name
  var currentDiaries = this.fetchDiaries();
  var breakfastFoods = currentDiaries[this.date][data.meal]
  var thing = breakfastFoods.filter(function(food, index){
    if (food.name === name) {
      breakfastFoods.splice(index, 1);
    }
  });
  this.clearBreakfastTable();
  currentDiaries[this.date]['breakfast'] = breakfastFoods;
  this.replaceToLocalStorage(currentDiaries)
  this.printBreakfast(currentDiaries);
};

Diary.prototype.setLunchTable = function () {
  var diary = this
  diary.findNewLunchItems();
  var currentDiaries = diary.fetchDiaries();
  currentDiaries[diary.date].lunch = diary.lunch.foods
  this.replaceToLocalStorage(currentDiaries);
  this.lunchTable();
};

Diary.prototype.findNewLunchItems = function () {
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
    diary.lunch.foods.push(new foods(name, calories));
  });
};

Diary.prototype.lunchTable = function () {
  var diary = this
  this.clearLunchTable();
  var currentDiaries = this.fetchDiaries();
  diary.printLunch(currentDiaries);
  diary.printConsumedCalories();
  diary.clearCheckboxes();
};

Diary.prototype.printLunch = function (currentDiaries) {
  var diary = this;
  if(currentDiaries[diary.date].lunch) {
    currentDiaries[diary.date].lunch.forEach(function(food) {
      $('#diary-lunch-table').append(`<tr>
        <td class='lunch-food-name'>${food.name}</td>
        <td class='lunch-food-calories'>${food.calories}</td>
        <td><button class='delete-food-meal-button badge' type='button'>-</button></td>
        </tr>`);
    });
  };
  diary.lunch.calculateTotalCalories();
  var allCalories = diary.lunch.totalCalories;
  diary.lunch.calculateRemainingCalories();
  var remainingCalories = diary.lunch.remainingCalories;
  $('#diary-lunch-table').append(`<tr class="cal-totals-row">
    <td>Total Calories</td>
    <td class='calorie-total'>${allCalories}</td>
    <td></td>
    </tr>
    <tr class="cal-totals-row">
    <td>Remaining Calories</td>
    <td class='calorie-total
    ${diary.selectColorCalorieCount(remainingCalories)}
    '>${remainingCalories}</td>
    <td></td>
    </tr>`
  );
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
  diary.findNewDinnerItems();
  var currentDiaries = diary.fetchDiaries();
  currentDiaries[diary.date].dinner = diary.dinner.foods
  this.replaceToLocalStorage(currentDiaries);
  this.dinnerTable();
};

Diary.prototype.findNewDinnerItems = function () {
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
    diary.dinner.foods.push(new foods(name, calories));
  });
};

Diary.prototype.dinnerTable = function () {
  var diary = this
  this.clearDinnerTable();
  var currentDiaries = this.fetchDiaries();
  diary.printDinner(currentDiaries);
  diary.printConsumedCalories();
  diary.clearCheckboxes();
};

Diary.prototype.printDinner = function () {
  var diary = this;
  if(currentDiaries[diary.date].dinner) {
    currentDiaries[diary.date].dinner.forEach(function(food){
      $('.dinner-table').append(`<tr>
        <td class='dinner-food-name'>${food.name}</td>
        <td class='dinner-food-calories'>${food.calories}</td>
        <td><button class='delete-food-meal-button badge' type='button'>-</button></td>
        </tr>`);
    });
  };
  diary.dinner.calculateTotalCalories();
  var allCalories = diary.dinner.totalCalories;
  diary.dinner.calculateRemainingCalories();
  var remainingCalories = diary.dinner.remainingCalories;
  $('.dinner-table').append(`<tr class="cal-totals-row">
    <td>Total Calories</td>
    <td class='calorie-total'>${allCalories}</td>
    <td></td>
    </tr>
    <tr class="cal-totals-row">
    <td>Remaining Calories</td>
    <td class='calorie-total
    ${diary.selectColorCalorieCount(remainingCalories)}'>
    ${remainingCalories}</td>
    <td></td>
    </tr>`
  );
};

Diary.prototype.clearDinnerTable = function () {
  $('.dinner-table').html('' +
    '<tr>' +
    '<th>Name</th>' +
    '<th>Calories</th>' +
    '</tr>'
  );
};

Diary.prototype.setSnacksTable = function () {
  var diary = this;
  diary.findNewSnacks();
  var currentDiaries = diary.fetchDiaries();
  currentDiaries[diary.date].snacks = diary.snacks.foods
  diary.replaceToLocalStorage(currentDiaries);
  diary.snacksTable();
};

Diary.prototype.findNewSnacks = function () {
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
  });
};

Diary.prototype.snacksTable = function () {
  var diary = this
  diary.clearSnacksTable();
  var currentDiaries = diary.fetchDiaries();
  diary.printSnacks(currentDiaries);
  diary.printConsumedCalories();
  diary.clearCheckboxes();
};

Diary.prototype.printSnacks = function (currentDiaries) {
  var diary = this;
  if(currentDiaries[diary.date].snacks) {
    currentDiaries[diary.date].snacks.forEach(function(food){
      $('#diary-snacks-table').append(`<tr>
        <td class='snack-food-name'>${food.name}</td>
        <td class='snack-food-calories'>${food.calories}</td>
        <td><button class='delete-food-meal-button badge' type='button'>-</button></td>
        </tr>`);
    });
  };
  diary.snacks.calculateTotalCalories();
  var allCalories = diary.snacks.totalCalories;
  diary.snacks.calculateRemainingCalories();
  var remainingCalories = diary.snacks.remainingCalories;
  $('#diary-snacks-table').append(`<tr class="cal-totals-row">
    <td>Total Calories</td>
    <td class='calorie-total'>${allCalories}</td>
    <td></td>
    </tr>
    <tr class="cal-totals-row">
    <td>Remaining Calories</td>
    <td class='calorie-total
    ${diary.selectColorCalorieCount(remainingCalories)}'>
    ${remainingCalories}</td>
    <td></td>
    </tr>`
  );
};

Diary.prototype.clearSnacksTable = function () {
  $('#diary-snacks-table').html('' +
    '<tr>' +
    '<th>Name</th>' +
    '<th>Calories</th>' +
    '</tr>');
};

Diary.prototype.setExerciseTable = function () {
  var diary = this;
  diary.findNewExercises();
  var currentDiaries = diary.fetchDiaries();
  currentDiaries[diary.date].exercises = diary.exercises.exercises
  diary.replaceToLocalStorage(currentDiaries);
  diary.exerciseTable();
};

Diary.prototype.findNewExercises = function () {
  var diary = this;
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
  });
};

Diary.prototype.exerciseTable = function () {
  var diary = this
  diary.clearExerciseTable();
  var currentDiaries = diary.fetchDiaries();
  diary.printExercises(currentDiaries);
  diary.printCaloriesBurned();
  diary.clearCheckboxes();
};

Diary.prototype.printExercises = function (currentDiaries) {
  var diary = this;
  if(currentDiaries[diary.date].exercises) {
    currentDiaries[diary.date].exercises.forEach(function(exercise){
      $('#diary-exercise-table').append(`<tr>
        <td class='diary-exercise-name'>${exercise.name}</td>
        <td class='diary-exercise-calories'>${exercise.calories}</td>
        <td><button class='delete-exercise-diary-button badge' type='button'>-</button></td>
        </tr>`);
    });
  };
  diary.exercises.calculateTotalCalories();
  var allCalories = diary.exercises.totalCalories;
  $('#diary-exercise-table').append(`<tr class="cal-totals-row">
    <td>Total Calories</td>
    <td class='calorie-total ${diary.selectColorCaloriesBurned(allCalories)}'>${allCalories}</td>
    <td></td>
    </tr>`
  );
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

Diary.prototype.printCaloriesBurned = function () {
  var diary = this;
  var burnedCalories = this.exercises.calculateTotalCalories();
  $('#calories-burned').text(`${burnedCalories}`)
  $('#calories-burned').removeClass("black green").addClass(`${diary.selectColorCaloriesBurned(burnedCalories)}`)
};

Diary.prototype.selectColorCalorieCount = function (count) {
  if(count < 0) {
    return "red"
  } else {
    return "green"
  }
};

Diary.prototype.selectColorCaloriesBurned = function (calories) {
  if(calories < 1) {
    return "black"
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
  this.exercises = new diaryExercises({exercises: currentDiary.exercises});
  this.date      = date;
}

module.exports = Diary;
