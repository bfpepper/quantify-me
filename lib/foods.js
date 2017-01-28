var $ = require('jquery')
var thing = require('./stylesheets/main.css')
var error = require('../lib/errors-handler')

function Food(name, calories) {
  this.name = name;
  this.calories = calories;
};

Food.prototype.createFood = function () {
  this.name = $('input#create-food-name').val();
  this.calories = $('input#create-food-calorie-count').val();
  if (this.name === '' || this.calories === '') {
    var newError = new error
    var thing = newError.validations(this);
  } else {
    this.clearForm();
    this.saveFood(this.name, this.calories);
  }
};

Food.prototype.saveFood = function (name, calories) {
  var foodsJSON = localStorage.getItem('foods');
  if (foodsJSON === null) {
    foodsJSON = '[]';
  }
  var currentFoods = JSON.parse(foodsJSON);
  currentFoods.unshift({name: name, calories: calories})
  foodsJSON = JSON.stringify(currentFoods);
  localStorage.setItem('foods', foodsJSON);
  this.addFoods();
};

Food.prototype.addFoods = function () {
  this.clearTable();
  var foodsJSON = localStorage.getItem('foods');
  if (foodsJSON === null) {
    foodsJSON = '[]';
  };
  var currentFoods = JSON.parse(foodsJSON);
  currentFoods.forEach(function(food) {
    $('.food-table').append(`<tr>
      <td class='food-name'>${food.name}</td>
      <td class='food-calories'>${food.calories}</td>
      <td><button id='delete-food-button' class='badge' type='button'>-</button></td>
      </tr>`)
    })
    this.createDeleteListener();
    this.createUpdateListener();
  };


  Food.prototype.updateFood = function () {
    var that = this;
    $('.food-name, .food-calories').off('click');
    var $foodRow = $(this).parent();
    var $name = $foodRow.children('.food-name')
    var oldName = $name.text();
    $name.html(`<input class='update-food-name' type='text' name='name' value=${$name.text()}><br>`)
    var $calories = $foodRow.children('.food-calories')
    $calories.html(`<input class='update-food-calorie-count' type="text" name="calories" value=${$calories.text()}></br>`)
    $('.update-food-name, .update-food-calorie-count').on('blur keypress', function (keypress) {
      if(keypress.keyCode == 13 || keypress.keyCode == null) {
        var name = $('input.update-food-name').val();
        var calories = $('input.update-food-calorie-count').val();
        var newFood = new Food;
        newFood.updateLocal(oldName, name, calories)
      }
    });
  };

  Food.prototype.updateLocal = function (oldName, name, calories) {
    var foodsJSON = localStorage.getItem('foods');
    if (foodsJSON === null) {
      foodsJSON = '[]'
    }
    var currentFoods = JSON.parse(foodsJSON);
    currentFoods.filter(function (food, index) {
      if (food.name === oldName) {
        currentFoods.splice(index, 1);
        currentFoods.unshift({name: name, calories: calories});
      }
    });
    foodsJSON = JSON.stringify(currentFoods)
    localStorage.setItem('foods', foodsJSON);
    this.addFoods();
  };

  Food.prototype.deleteFood = function (name, calories) {
    var food = {name: this.name, calories: this.calories};
    var foodsJSON = localStorage.getItem('foods');
    if (foodsJSON === null) {
      foodsJSON = '[]';
    }
    var currentFood = JSON.parse(foodsJSON);
    currentFood.filter(function(food, index){
      if (food.name === name) {
        currentFood.splice(index, 1)
      }
    });
    foodsJSON = JSON.stringify(currentFood)
    localStorage.setItem('foods', foodsJSON);
    this.addFoods();
  };

  Food.prototype.createUpdateListener = function () {
    $('.food-name, .food-calories').on('click', this.updateFood)
  };

  Food.prototype.createDeleteListener = function () {
    var that = this;
    $('#delete-food-button').on('click', function() {
      var $name = $(this).parent().siblings()[0].innerHTML;
      var $calories = $(this).parent().siblings()[1].innerHTML;
      that.deleteFood($name, $calories);
    });
  };

  Food.prototype.clearTable = function () {
    $('.food-table').html('' +
    '<tr>' +
    '<th>Name</th>' +
    '<th>Calories</th>' +
    '<th>Delete</th>' +
    '</tr>');
  };

  Food.prototype.clearForm = function () {
    $('.create-food-form').children('input').val(' ');
  };

  $(document).ready(function () {
    var newFood = new Food();
    $('#create-food-button').on('click', function() {
      newFood.createFood();
    });
    newFood.addFoods();
    $('.go-to-exercises').on('click', function() {
      window.location.replace('/exercises.html')
    });
  });

  module.exports = Food;
