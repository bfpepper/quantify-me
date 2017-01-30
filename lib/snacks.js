function Snacks() {
  this.foods = [];
  this.totalCalories = this.calculateTotalCalories();
  this.remainingCalories = this.calculateRemainingCalories();
}

Snacks.prototype.calculateTotalCalories = function () {
  var diaryJSON = localStorage.getItem('diary');
  if (diaryJSON === null) {
    diaryJSON = '{}'
  }
  var currentDiaries = JSON.parse(diaryJSON);
  var totalCalories = 0;
  if(typeof(currentDiaries.snacks) === 'undefined'){
    currentDiaries.snacks = [];
  }
  currentDiaries.snacks.forEach(function(food){
    totalCalories += parseInt(food.calories, 10);
  })
  return totalCalories;
};

Snacks.prototype.calculateRemainingCalories = function () {
  return 200 - this.totalCalories
};


module.exports = Snacks;
