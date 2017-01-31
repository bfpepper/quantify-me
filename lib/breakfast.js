function Breakfast() {
  this.foods = []
  this.totalCalories = this.calculateTotalCalories();
  this.remainingCalories = this.calculateRemainingCalories();
}

Breakfast.prototype.calculateTotalCalories = function () {
  var diaryJSON = localStorage.getItem('diary');
  if (diaryJSON === null) {
    diaryJSON = '{}'
  }
  var currentDiaries = JSON.parse(diaryJSON);
  var totalCalories = 0;
  if(typeof(currentDiaries.breakfast) === 'undefined'){
    currentDiaries.breakfast = [];
  }
  currentDiaries[0].breakfast.forEach(function(food){
    totalCalories += parseInt(food.calories, 10);
  })
  return totalCalories;
};

Breakfast.prototype.calculateRemainingCalories = function () {
  return 400 - this.totalCalories
};

module.exports = Breakfast;
