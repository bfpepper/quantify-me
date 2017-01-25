var $ = require('jquery')

function Food(name, calories) {
    this.name = name;
    this.calories = calories;
}

Food.prototype.createFood = function () {
  this.name = $('input.create-food-name').val();
  this.calories = $('input.create-food-calorie-count').val();
  this.addFood();
};

Food.prototype.addFood = function () {
  $('.food-table').append(`<tr>
    <td class='food-name'>${this.name}</td>
    <td class='food-calories'>${this.calories}</td>
    <td><button class='delete-food-button' type='button'>-</button></td>
    </tr>`)
  this.createDeleteListener();
  this.createUpdateListener();
};

Food.prototype.updateFood = function () {
  $('.food-name, .food-calories').off('click')
  var $foodRow = $(this).parent();
  var $name = $foodRow.children('.food-name')
  $name.html(`<input class='create-food-name' type='text' name='name' value=${$name.text()}><br>`)
  var $calories = $foodRow.children('.food-calories')
  $calories.html(`<input class='create-food-calorie-count' type="text" name="calories" value=${$calories.text()}></br>`)
};

Food.prototype.createUpdateListener = function () {
  $('.food-name, .food-calories').on('click', this.updateFood)
};

Food.prototype.createDeleteListener = function () {
  $('.delete-food-button').on('click', function() {
    $(this).parent().parent().remove()
  });
};

$(document).ready(function () {
  $('.create-food-button').on('click', function() {
      var newFood = new Food();
      newFood.createFood();
    }
  );
});

module.exports = Food;
