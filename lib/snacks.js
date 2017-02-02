function Snacks(data) {
  this.foods = data.foods || [];
  this.totalCalories = this.calculateTotalCalories();
  this.remainingCalories = this.calculateRemainingCalories();
}

Snacks.prototype.calculateTotalCalories = function () {
  var newCalorieCount = 0;
  this.foods.forEach(function(food){
    newCalorieCount += parseInt(food.calories, 10);
  })
  this.totalCalories = newCalorieCount;
  return newCalorieCount;
};

Snacks.prototype.calculateRemainingCalories = function () {
  this.remainingCalories = 200 - this.totalCalories;
  return this.remainingCalories;
};


module.exports = Snacks;
