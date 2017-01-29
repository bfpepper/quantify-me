var $     = require('jquery');
var thing = require('./stylesheets/main.css');
var error = require('../lib/errors-handler');

function Food(name, calories) {
  this.name     = name;
  this.calories = calories;
};

Food.prototype.createFood = function () {
  this.name     = $('input#create-food-name').val();
  this.calories = $('input#create-food-calorie-count').val();
  this.errorCheck();
};

Food.prototype.errorCheck = function () {
  if (this.name === '' || this.calories === '') {
    var newError = new error;
    var thing = newError.validations(this);
  } else {
    this.clearForm();
    this.saveFood(this.name, this.calories);
  }
};

Food.prototype.saveFood = function (name, calories) {
  var currentFoods = this.retrieveFromLocalStorage();
  currentFoods.unshift({name: name, calories: calories});
  this.replaceToLocalStorage(currentFoods);
  this.addFoodsToPage();
};

Food.prototype.addFoodsToPage = function () {
  this.clearTable();
  var currentFoods = this.retrieveFromLocalStorage();
  this.printFoods(currentFoods);
  this.createDeleteListener();
  this.createUpdateListener();
  };

  Food.prototype.printFoods = function (currentFoods) {
    currentFoods.forEach(function(food) {
      $('.food-table').append(`<tr>
        <td class='food-name'>${food.name}</td>
        <td class='food-calories'>${food.calories}</td>
        <td><button id='delete-food-button' class='delete-food-button badge' type='button'>-</button></td>
        </tr>`);
      });
  };


  Food.prototype.updateFood = function () {
    var that      = this;
    $('.food-name, .food-calories').off('click');
    var $foodRow  = $(this).parent();
    var $name     = $foodRow.children('.food-name');
    var oldName   = $name.text();
    $name.html(`<input class='update-food-name' type='text' name='name' value=${$name.text()}><br>`);
    var $calories = $foodRow.children('.food-calories');
    $calories.html(`<input class='update-food-calorie-count' type="text" name="calories" value=${$calories.text()}></br>`);
    $('.update-food-name, .update-food-calorie-count').on('blur keypress', function (keypress) {
      var newFood  = new Food;
      newFood.triggerFoodUpdate(keypress, oldName);
    });
  };

  Food.prototype.triggerFoodUpdate = function (keypress, oldName) {
    if(keypress.keyCode == 13 || keypress.keyCode == null) {
      var name     = $('input.update-food-name').val();
      var calories = $('input.update-food-calorie-count').val();
      this.updateLocalStorage(oldName, name, calories);
    }
  };

  Food.prototype.updateLocalStorage = function (oldName, name, calories) {
    var currentFoods = this.retrieveFromLocalStorage();
    var update = {oldName: oldName, name: name, calories: calories};
    var updatedFoods = this.updateCurrentFoods(currentFoods, update);
    this.replaceToLocalStorage(currentFoods);
    this.addFoodsToPage();
  };

  Food.prototype.updateCurrentFoods = function (currentFoods, update) {
    currentFoods.filter(function (food, index) {
      if (food.name === update.oldName) {
        currentFoods.splice(index, 1);
        currentFoods.unshift({name: update.name, calories: update.calories});
      }
    });
  };

  Food.prototype.deleteFood = function (name, calories) {
    var currentFoods = this.retrieveFromLocalStorage();
    var updatedFoods = this.deleteFromCurrentFoods(currentFoods, name);
    this.replaceToLocalStorage(currentFoods);
    this.addFoodsToPage();
  };

  Food.prototype.deleteFromCurrentFoods = function (currentFoods, name) {
    currentFoods.filter(function(food, index){
      if (food.name === name) {
        currentFoods.splice(index, 1);
      }
    });
  };

  Food.prototype.retrieveFromLocalStorage = function () {
    var foodsJSON = localStorage.getItem('foods');
    if (foodsJSON === null) {
      foodsJSON   = '[]';
    }
    return JSON.parse(foodsJSON);
  };

  Food.prototype.replaceToLocalStorage = function (currentFoods) {
    foodsJSON = JSON.stringify(currentFoods);
    localStorage.setItem('foods', foodsJSON);
  };

  Food.prototype.createUpdateListener = function () {
    $('.food-name, .food-calories').on('click', this.updateFood);
  };

  Food.prototype.createDeleteListener = function () {
    var that = this;
    $('.delete-food-button').on('click', function() {
      var $name     = $(this).parent().siblings()[0].innerHTML;
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
    newFood.addFoodsToPage();
    $('#create-food-button').on('click', function() {
      newFood.createFood();
    });
    $('.go-to-exercises').on('click', function() {
      window.location.replace('/exercises.html');
    });
  });

  module.exports = Food;
