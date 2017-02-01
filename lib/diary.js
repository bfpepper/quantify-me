var $         = require('jquery');
var thing     = require('./stylesheets/main.css');
var breakfast = require('./breakfast')
var lunch     = require('./lunch')
var dinner    = require('./dinner')
var snacks    = require('./snacks')
var diaryExercises = require('./exercises-diary')
var foods     = require('./foods')
var exercise  = require('./exercises')
var _         = require('lodash')

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
  diary.printTotalRemaingingCalories();
  diary.clearCheckboxes();
};

Diary.prototype.printBreakfast = function (currentDiaries) {
  var diary = this;
  if(currentDiaries[this.date].breakfast) {
    currentDiaries[this.date].breakfast.forEach(function(food, index) {
      $('#diary-breakfast-table').append(`<tr class='breakfast-row' data-row-index='${index}'>
        <td class='breakfast-food-name'>${food.name}</td>
        <td class='breakfast-food-calories'>${food.calories}</td>
        <td><button class='delete-food-meal-button badge' type='button'>-</button></td>
        </tr>`);
    });
  };
  diary.printBreakfastTableTotals();
};

Diary.prototype.printBreakfastTableTotals = function () {
  var diary = this;
  var allCalories = diary.breakfast.calculateTotalCalories();
  var remainingCalories = diary.breakfast.calculateRemainingCalories();
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
    '<th></th>' +
    '</tr>'
  );
};

Diary.prototype.deleteBreakfastFood = function (data) {
  var date = $('#date').text();
  var diary = this
  var currentDiaries = this.fetchDiaries();
  var breakfastFoods = currentDiaries[date]['breakfast']
  breakfastFoods.splice(data.index, 1)
  this.clearBreakfastTable();
  diary.breakfast.foods = breakfastFoods
  currentDiaries[date]['breakfast'] = breakfastFoods;
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
  diary.printTotalRemaingingCalories();
  diary.clearCheckboxes();
};

Diary.prototype.printLunch = function (currentDiaries) {
  var diary = this;
  if(currentDiaries[diary.date].lunch) {
    currentDiaries[diary.date].lunch.forEach(function(food, index) {
      $('#diary-lunch-table').append(`<tr class='lunch-row' data-row-index='${index}'>
        <td class='lunch-food-name'>${food.name}</td>
        <td class='lunch-food-calories'>${food.calories}</td>
        <td><button class='delete-food-meal-button badge' type='button'>-</button></td>
        </tr>`);
    });
  };
  diary.printLunchTableTotals();
};

Diary.prototype.printLunchTableTotals = function () {
  var diary = this;
  var allCalories = diary.lunch.calculateTotalCalories();
  var remainingCalories = diary.lunch.calculateRemainingCalories();
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
  '<th></th>' +
  '</tr>');
};

Diary.prototype.deleteLunchFood = function (data) {
  var date = $('#date').text();
  var diary = this
  var currentDiaries = this.fetchDiaries();
  var lunchFoods = currentDiaries[date]['lunch']
  lunchFoods.splice(data.index, 1)
  this.clearLunchTable();
  diary.lunch.foods = lunchFoods
  currentDiaries[date]['lunch'] = lunchFoods;
  this.replaceToLocalStorage(currentDiaries)
  this.printLunch(currentDiaries);
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
  diary.printTotalRemaingingCalories();
  diary.clearCheckboxes();
};

Diary.prototype.printDinner = function () {
  var diary = this;
  if(currentDiaries[diary.date].dinner) {
    currentDiaries[diary.date].dinner.forEach(function(food, index){
      $('.dinner-table').append(`<tr class='dinner-row' data-row-index='${index}'>
        <td class='dinner-food-name'>${food.name}</td>
        <td class='dinner-food-calories'>${food.calories}</td>
        <td><button class='delete-food-meal-button badge' type='button'>-</button></td>
        </tr>`);
    });
  };
  diary.printDinnerTableTotals();
};

Diary.prototype.printDinnerTableTotals = function () {
  var diary = this;
  var allCalories = diary.dinner.calculateTotalCalories();
  var remainingCalories = diary.dinner.calculateRemainingCalories();
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
    '<th></th>' +
    '</tr>'
  );
};

Diary.prototype.deleteDinnerFood = function (data) {
  var date = $('#date').text();
  var diary = this
  var currentDiaries = this.fetchDiaries();
  var dinnerFoods = currentDiaries[date]['dinner']
  dinnerFoods.splice(data.index, 1)
  this.clearDinnerTable();
  diary.dinner.foods = dinnerFoods
  currentDiaries[date]['dinner'] = dinnerFoods;
  this.replaceToLocalStorage(currentDiaries)
  this.printDinner(currentDiaries);
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
  diary.printTotalRemaingingCalories();
  diary.clearCheckboxes();
};

Diary.prototype.printSnacks = function (currentDiaries) {
  var diary = this;
  if(currentDiaries[diary.date].snacks) {
    currentDiaries[diary.date].snacks.forEach(function(food, index){
      $('#diary-snacks-table').append(`<tr class='snack-row' data-row-index='${index}'>
        <td class='snack-food-name'>${food.name}</td>
        <td class='snack-food-calories'>${food.calories}</td>
        <td><button class='delete-food-meal-button badge' type='button'>-</button></td>
        </tr>`);
    });
  };
  diary.printSnacksTableTotals();
};

Diary.prototype.printSnacksTableTotals = function () {
  var diary = this;
  var allCalories = diary.snacks.calculateTotalCalories();
  var remainingCalories = diary.snacks.calculateRemainingCalories();
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
    '<th></th>' +
    '</tr>');
};

Diary.prototype.deleteSnackFood = function (data) {
  var date = $('#date').text();
  var diary = this
  var currentDiaries = this.fetchDiaries();
  var snackFoods = currentDiaries[date]['snacks']
  snackFoods.splice(data.index, 1)
  this.clearSnacksTable();
  diary.snacks.foods = snackFoods
  currentDiaries[date]['snacks'] = snackFoods;
  this.replaceToLocalStorage(currentDiaries)
  this.printSnacks(currentDiaries);
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
    currentDiaries[diary.date].exercises.forEach(function(exercise, index){
      $('#diary-exercise-table').append(`<tr class='exercise-row' data-row-index='${index}'>
        <td class='diary-exercise-name'>${exercise.name}</td>
        <td class='diary-exercise-calories'>${exercise.calories}</td>
        <td><button class='delete-exercise-diary-button badge' type='button'>-</button></td>
        </tr>`);
    });
  };
  diary.printExercisesTotals();
};

Diary.prototype.printExercisesTotals = function () {
  var diary = this;
  var allCalories = diary.exercises.calculateTotalCalories();
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
    '<th></th>' +
    '</tr>');
};

Diary.prototype.deleteExercise = function (data) {
  var date = $('#date').text();
  var diary = this
  var currentDiaries = this.fetchDiaries();
  var exercises = currentDiaries[date]['exercises']
  exercises.splice(data.index, 1)
  this.clearExerciseTable();
  diary.exercises.exercises = exercises
  currentDiaries[date]['exercises'] = exercises;
  this.replaceToLocalStorage(currentDiaries)
  this.printExercises(currentDiaries);
};

Diary.prototype.fetchDiaries = function () {
  var diaryJSON = localStorage.getItem('diary');
  if (diaryJSON === null) {
    diaryJSON = '{}';
  }
  currentDiaries = JSON.parse(diaryJSON);
  if(typeof(currentDiaries[this.date]) === 'undefined'){
    currentDiaries[this.date] = {};
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
  var burnedCalories = diary.exercises.calculateTotalCalories();
  $('#calories-burned').text(`${burnedCalories}`)
  $('#calories-burned').removeClass("black green").addClass(`${diary.selectColorCaloriesBurned(burnedCalories)}`)
};

Diary.prototype.printTotalRemaingingCalories = function () {
  var diary = this;
  var consumedCalories = diary.calculateConsumedCalories();
  var burnedCalories = diary.exercises.calculateTotalCalories();
  var remainingCalories = 2000 - consumedCalories + burnedCalories;
  $('#remaining-calories').text(`${remainingCalories}`)
  $('#remaining-calories').removeClass("red green").addClass(`${diary.selectColorCalorieCount(remainingCalories)}`)
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

Diary.prototype.sortExerciseCalorieList = function () {
  var diary = this;
  var currentClass = $('#exercise-calorie').attr('class')  ;
  if (currentClass === "original-cal") {
    diary.printExercisesByIncreasing();
  } else if (currentClass === "increasing-cal") {
    diary.printExercisesByDecreasing();
  } else {
    diary.printExercisesByInput();
  }
};

Diary.prototype.printExercisesByIncreasing = function () {
  var diary = this;
  var currentExercises = diary.findExercises();
  var exercisesByIncreasingCal = _.orderBy(currentExercises, function(i) { return parseInt(i.calories); }, ['asc'])
  diary.clearExerciseOptionsTable();
  diary.printExerciseOptionsTable(exercisesByIncreasingCal);
  $('#exercise-calorie').removeClass('original-cal').addClass('increasing-cal')
};

Diary.prototype.printExercisesByDecreasing = function () {
  var diary = this;
  var currentExercises = diary.findExercises();
  var exercisesByDecreasingCal = _.orderBy(currentExercises, function(i) { return parseInt(i.calories); }, ['desc'])
  diary.clearExerciseOptionsTable();
  diary.printExerciseOptionsTable(exercisesByDecreasingCal)
  $('#exercise-calorie').removeClass('increasing-cal').addClass('decreasing-cal')
};

Diary.prototype.printExercisesByInput = function () {
  var diary = this;
  var currentExercises = diary.findExercises();
  diary.clearExerciseOptionsTable();
  diary.printExerciseOptionsTable(currentExercises);
  $('#exercise-calorie').removeClass('decreasing-cal').addClass('original-cal')
};

Diary.prototype.clearExerciseOptionsTable = function () {
  $('#exercises-diary-table tr').slice(1).html('')
};

Diary.prototype.findExercises = function () {
  var exercisesJSON = localStorage.getItem('exercises');
  if (exercisesJSON === null) {
    exercisesJSON = '[]';
  }
  return JSON.parse(exercisesJSON);
};

Diary.prototype.printExerciseOptionsTable = function (currentExercises) {
  currentExercises.forEach(function(exercise){
    $('#exercises-diary-table').append(`<tr>
      <td class='selected-exercises'><input id=${exercise.name} type='checkbox'></td>
      <td id='exercise-diary-name'>${exercise.name}</td>
      <td id='exercise-diary-calories'>${exercise.calories}</td>
      </tr>`);
  });
};

Diary.prototype.sortFoodCalorieList = function () {
  var diary = this;
  var currentClass = $('#food-calorie').attr('class')  ;
  if (currentClass === "original-cal") {
    diary.printFoodsByIncreasing();
  } else if (currentClass === "increasing-cal") {
    diary.printFoodsByDecreasing();
  } else {
    diary.printFoodsByInput();
  }
};

Diary.prototype.printFoodsByIncreasing = function () {
  var diary = this;
  var currentFoods = diary.findFoods();
  var foodsByIncreasingCal = _.orderBy(currentFoods, function(i) { return parseInt(i.calories); }, ['asc'])
  diary.clearFoodOptionsTable();
  diary.printFoodOptionsTable(foodsByIncreasingCal);
  $('#food-calorie').removeClass('original-cal').addClass('increasing-cal')
};

Diary.prototype.printFoodsByDecreasing = function () {
  var diary = this;
  var currentFoods = diary.findFoods();
  var foodsByDecreasingCal = _.orderBy(currentFoods, function(i) { return parseInt(i.calories); }, ['desc'])
  diary.clearFoodOptionsTable();
  diary.printFoodOptionsTable(foodsByDecreasingCal)
  $('#food-calorie').removeClass('increasing-cal').addClass('decreasing-cal')
};

Diary.prototype.printFoodsByInput = function () {
  var diary = this;
  var currentFoods = diary.findFoods();
  diary.clearFoodOptionsTable();
  diary.printFoodOptionsTable(currentFoods);
  $('#food-calorie').removeClass('decreasing-cal').addClass('original-cal')
};

Diary.prototype.clearFoodOptionsTable = function () {
  $('#foods-diary-table tr').slice(1).html('')
};

Diary.prototype.findFoods = function () {
  var foodsJSON = localStorage.getItem('foods');
  if (foodsJSON === null) {
    foodsJSON = '[]';
  }
  return JSON.parse(foodsJSON);
};

Diary.prototype.printFoodOptionsTable = function (currentFoods) {
  currentFoods.forEach(function(food){
    $('#foods-diary-table').append(`<tr>
      <td class='selected-foods'><input id=${food.name} type='checkbox'></td>
      <td id='foods-diary-name'>${food.name}</td>
      <td id='foods-diary-calories'>${food.calories}</td>
      </tr>`);
  });
};

Diary.prototype.loadDiary = function (date) {
  var currentDiaries = this.fetchDiaries();
  var currentDiary = currentDiaries[date] || {}
  this.breakfast = new breakfast({foods: currentDiary.breakfast});
  this.lunch     = new lunch({foods: currentDiary.lunch});
  this.dinner    = new dinner({foods: currentDiary.dinner});
  this.snacks    = new snacks({foods: currentDiary.snacks});
  this.exercises = new diaryExercises({exercises: currentDiary.exercises});
  this.date      = date;
}

module.exports = Diary;
