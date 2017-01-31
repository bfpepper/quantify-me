var $        = require('jquery');
var Food     = require('./foods');
var Exercise = require('./exercises');
var Diary    = require('./diary')

var someFood     = new Food();
var someExercise = new Exercise();

setDiaryExercisesTable = function () {
  var exercisesJSON = localStorage.getItem('exercises');
  if (exercisesJSON === null) {
    exercisesJSON = '[]';
  }
  var currentExercises = JSON.parse(exercisesJSON);
  currentExercises.forEach(function(exercise){
    $('#exercises-diary-table').append(`<tr>
      <td class='selected-exercises'><input type='checkbox'></td>
      <td id='exercise-diary-name'>${exercise.name}</td>
      <td id='exercise-diary-calories'>${exercise.calories}</td>
      </tr>`);
  });
};

setDiaryFoodsTable = function () {
  var foodsJSON = localStorage.getItem('foods');
  if (foodsJSON === null) {
    foodsJSON = '[]';
  }
  var currentExercises = JSON.parse(foodsJSON);
  currentExercises.forEach(function(food){
    $('#foods-diary-table').append(`<tr>
      <td class='selected-foods'><input type='checkbox'></td>
      <td id='food-diary-name'>${food.name}</td>
      <td id='food-diary-calories'>${food.calories}</td>
      </tr>`);
  });
};

setDiaryBreakfastTable = function(){
  var diaryJSON = localStorage.getItem('diary')
  if(diaryJSON === null ) {
    diaryJSON = '{}';
  }
  var currentBreakfast = JSON.parse(diaryJSON).breakfast
  currentBreakfast.forEach(function(){
      $('.')
  })
}

setDiaryDinnerTable = function() {
  var diaryJSON = localStorage.getItem('diary');
  if(diaryJSON === null) {
    diaryJSON = '{}'
  }
  var currentDinner = JSON.parse(diaryJSON).dinner
  currentDinner.forEach(function(food){
    $('.diary-dinner-table').append(`<tr>
      <td class='dinner-food-name'>${food.name}</td>
      <td class='dinner-food-calories'>${food.calories}</td>
      </tr>`);
  })
}

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

setDate = function () {
  var today = new Date();
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
}

$(document).ready(function () {
  var diary = new Diary();
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
  $('.go-to-exercises').on('click', function() {
    window.location.replace('./exercises.html');
  });
  $('.go-to-foods').on('click', function() {
    window.location.replace('./foods.html');
  });
  setDiaryExercisesTable();
  setDiaryFoodsTable();
  setDate()
  diary.breakfastTable();
  diary.lunchTable();
  diary.dinnerTable();
  diary.snacksTable();
  diary.exerciseTable();
  diary.printConsumedCalories();
});
