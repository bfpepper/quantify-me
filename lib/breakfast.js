function Breakfast(data) {
  this.foods = data.foods || []
  this.totalCalories = this.calculateTotalCalories();
  this.remainingCalories = this.calculateRemainingCalories();
}

Breakfast.prototype.calculateTotalCalories = function () {
  var newCalorieCount = 0;
  this.foods.forEach(function(food){
    newCalorieCount += parseInt(food.calories, 10);
  })
  this.totalCalories = newCalorieCount
  return newCalorieCount;
};

Breakfast.prototype.calculateRemainingCalories = function () {
  return 400 - this.totalCalories
};

module.exports = Breakfast;
