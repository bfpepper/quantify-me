function Lunch() {
  this.foods = []
  this.totalCalories = this.calculateTotalCalories();
  this.remainingCalories = this.calculateRemainingCalories();
}

Lunch.prototype.calculateTotalCalories = function () {
  var diaryJSON = localStorage.getItem('diary');
  if (diaryJSON === null) {
    diaryJSON = '[]'
  }
  var currentDiaries = JSON.parse(diaryJSON);
  var totalCalories = 0;
  if(typeof(currentDiaries[0].lunch) === 'undefined'){
    currentDiaries[0].lunch = [];
  }
  currentDiaries[0].lunch.forEach(function(food){
    totalCalories += parseInt(food.calories, 10);
  })
  return totalCalories;
};

Lunch.prototype.calculateRemainingCalories = function () {
  return 600 - this.totalCalories
};



module.exports = Lunch;
