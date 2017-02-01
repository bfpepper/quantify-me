var $        = require('jquery');
var Food     = require('./foods');
var Exercise = require('./exercises');
var Diary    = require('./diary')

var someFood     = new Food();
var someExercise = new Exercise();

clearDiaryExerciseTable = function() {
  $('#exercises-diary-table tr').slice(1).html('');
}

setDiaryExercisesTable = function () {
  clearDiaryExerciseTable();
  var exercisesJSON = localStorage.getItem('exercises');
  if (exercisesJSON === null) {
    exercisesJSON = '[]';
  }
  var currentExercises = JSON.parse(exercisesJSON);
  currentExercises.forEach(function(exercise){
    $('#exercises-diary-table').append(`<tr>
      <td class='selected-exercises'><input id=${exercise.name} type='checkbox'></td>
      <td id='exercise-diary-name'>${exercise.name}</td>
      <td id='exercise-diary-calories'>${exercise.calories}</td>
      </tr>`);
  });
};

clearDiaryFoodTable = function () {
  $('#foods-diary-table tr').slice(1).html('');
}

setDiaryFoodsTable = function () {
  clearDiaryFoodTable();
  var foodsJSON = localStorage.getItem('foods');
  if (foodsJSON === null) {
    foodsJSON = '[]';
  }
  var currentExercises = JSON.parse(foodsJSON);
  currentExercises.forEach(function(food){
    $('#foods-diary-table').append(`<tr>
      <td class='selected-foods'><input id=${food.name} type='checkbox'></td>
      <td id='food-diary-name'>${food.name}</td>
      <td id='food-diary-calories'>${food.calories}</td>
      </tr>`);
  });
};

filterFoodTable = function () {
  var input, filter, table, tr, td, i;
  input = document.getElementById("filter-foods-table");
  filter = input.value.toUpperCase();
  table = document.getElementById("foods-diary-table");
  tr = table.getElementsByTagName("tr");

  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[1];
    if (td) {
      if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  };
};

filterExerciseTable = function () {
  var input, filter, table, tr, td, i;
  input = document.getElementById("filter-exercises-table");
  filter = input.value.toUpperCase();
  table = document.getElementById("exercises-diary-table");
  tr = table.getElementsByTagName("tr");

  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[1];
    if (td) {
      if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  };
};

var formatDate = function(date) {
  var today = date;
  var dd = today.getDate();
  var mm = today.getMonth()+1; //January is 0!
  var yyyy = today.getFullYear();
  if(dd<10) {
      dd='0'+dd
  }
  if(mm<10) {
      mm='0'+mm
  }
  today = mm+'/'+dd+'/'+yyyy;
  $('#date').text(`${today}`)
  return today
}

var reloadPage = function(date) {
  var currentDate = formatDate(date);
  var diary = new Diary(currentDate);
  setDiaryExercisesTable();
  setDiaryFoodsTable();
  diary.breakfastTable();
  diary.lunchTable();
  diary.dinnerTable();
  diary.snacksTable();
  diary.exerciseTable();
  diary.printConsumedCalories();
  diary.printCaloriesBurned();
  diary.printTotalRemaingingCalories();
}

var setDate = function () {
  var today = new Date();
  formatDate(today);
}

var increaseDate = function (){
  var prevDay = $('#date').text()
  var prevDate = new Date(prevDay);
  prevDate.setDate(prevDate.getDate() + 1);
  reloadPage(prevDate);
}

var decreaseDate = function (){
  var prevDay = $('#date').text()
  var prevDate = new Date(prevDay);
  prevDate.setDate(prevDate.getDate() - 1);
  reloadPage(prevDate);
}


$(document).ready(function () {
  setDate()
  var date = $('#date').text();
  var diary = new Diary(date);
  $('#increase-date').on('click', increaseDate );
  $('#decrease-date').on('click', decreaseDate );

  $('#breakfast-button').on('click', function() {
    diary.setBreakfastTable();
  });
  $('#lunch-button').on('click', function() {
    diary.setLunchTable();
  });
  $('#dinner-button').on('click', function() {
    diary.setDinnerTable();
  })
  $('#snacks-button').on('click', function() {
    diary.setSnacksTable();
  })
  $('#exercises-button').on('click', function() {
    diary.setExerciseTable();
  })
  $('#filter-foods-table').keyup(function() {
    filterFoodTable();
  });
  $('#filter-exercises-table').keyup(function() {
    filterExerciseTable();
  });
  $('#diary-breakfast-table').on('click', '.delete-food-meal-button',function() {
    var deleteIndex = $(this).parents('tr').data('row-index');
    diary.deleteBreakfastFood({index: deleteIndex})
  });
  $('#diary-lunch-table').on('click', '.delete-food-meal-button',function() {
    var deleteIndex = $(this).parents('tr').data('row-index');
    diary.deleteLunchFood({index: deleteIndex});
  });
  $('#diary-dinner-table').on('click', '.delete-food-meal-button',function() {
    var deleteIndex = $(this).parents('tr').data('row-index');
    diary.deleteDinnerFood({index: deleteIndex});
  });
  $('#diary-snacks-table').on('click', '.delete-food-meal-button',function() {
    var deleteIndex = $(this).parents('tr').data('row-index');
    diary.deleteSnackFood({index: deleteIndex});
  });
  $('#diary-exercise-table').on('click', '.delete-exercise-diary-button',function() {
    var deleteIndex = $(this).parents('tr').data('row-index');
    diary.deleteExercise({index: deleteIndex})
  });
  $('#exercises-diary-table').on('click', '#exercise-calorie', function(){
    diary.sortExerciseCalorieList();
  })
  $('#foods-diary-table').on('click', '#food-calorie', function(){
    diary.sortFoodCalorieList();
  })
  $('.go-to-exercises').on('click', function() {
    window.location.replace('./exercises.html');
  });
  $('.go-to-foods').on('click', function() {
    window.location.replace('./foods.html');
  });
  setDiaryExercisesTable();
  setDiaryFoodsTable();
  diary.breakfastTable();
  diary.lunchTable();
  diary.dinnerTable();
  diary.snacksTable();
  diary.exerciseTable();
  diary.printConsumedCalories();
  diary.printCaloriesBurned();
  diary.printTotalRemaingingCalories();
});
