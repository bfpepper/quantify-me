function Dinner() {
  this.foods = [];
  this.totalCalories = this.calculateTotalCalories();
}

Dinner.prototype.calculateTotalCalories = function () {
  var diaryJSON = localStorage.getItem('diary');
  if (diaryJSON === null) {
    diaryJSON = '{}'
  }
  var currentDiaries = JSON.parse(diaryJSON);
  var totalCalories = 0;
  currentDiaries.dinner.forEach(function(food){
    totalCalories += parseInt(food.calories, 10);
  })
  return totalCalories;
};

module.exports = Dinner;
