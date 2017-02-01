function Dinner(data) {
  this.foods = data.foods || []
  this.totalCalories = this.calculateTotalCalories();
  this.remainingCalories = this.calculateRemainingCalories();
}

Dinner.prototype.calculateTotalCalories = function () {
  var newCalorieCount = 0
  this.foods.forEach(function(food){
    newCalorieCount += parseInt(food.calories, 10);
  })
  this.totalCalories = newCalorieCount
  return newCalorieCount;
};

Dinner.prototype.calculateRemainingCalories = function () {
  this.remainingCalories = 800 - this.totalCalories
};


module.exports = Dinner;
