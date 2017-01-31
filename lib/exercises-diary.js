function ExercisesDiary(data) {
  this.exercises = data.exercises || []
  this.totalCalories = this.calculateTotalCalories();
}

ExercisesDiary.prototype.calculateTotalCalories = function () {
  var newCalorieCount = 0
  this.exercises.forEach(function(food){
    newCalorieCount += parseInt(food.calories, 10);
  })
  this.totalCalories = newCalorieCount;
  return newCalorieCount;
};


module.exports = ExercisesDiary;
