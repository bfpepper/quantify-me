function Lunch(data) {
  this.foods = data.foods || [];
  this.totalCalories = this.calculateTotalCalories();
  this.remainingCalories = this.calculateRemainingCalories();
}

Lunch.prototype.calculateTotalCalories = function () {
  var newCalorieCount = 0;
  this.foods.forEach(function(food){
    newCalorieCount += parseInt(food.calories, 10);
  })
  this.totalCalories = newCalorieCount;
  return newCalorieCount;
};

Lunch.prototype.calculateRemainingCalories = function () {
  this.remainingCalories = 600 - this.totalCalories;
  return this.remainingCalories;
};



module.exports = Lunch;
