function Dinner() {
  this.foods = [];
  this.totalCalories = this.calculateTotalCalories();
  this.remainingCalories = this.calculateRemainingCalories();
}

Dinner.prototype.calculateTotalCalories = function () {
  var diaryJSON = localStorage.getItem('diary');
  if (diaryJSON === null) {
    diaryJSON = '[]'
  }
  var currentDiaries = JSON.parse(diaryJSON);
  var totalCalories = 0;
  if(typeof(currentDiaries[0].dinner) === 'undefined'){
    currentDiaries[0].dinner = [];
  }
  currentDiaries[0].dinner.forEach(function(food){
    totalCalories += parseInt(food.calories, 10);
  })
  return totalCalories;
};

Dinner.prototype.calculateRemainingCalories = function () {
  return 800 - this.totalCalories
};


module.exports = Dinner;
