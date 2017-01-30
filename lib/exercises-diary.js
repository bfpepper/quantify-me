function ExercisesDiary() {
  this.exercises = [];
  this.calculateTotalCalories = this.calculateTotalCalories();
}

ExercisesDiary.prototype.calculateTotalCalories = function () {
  var diaryJSON = localStorage.getItem('diary');
  if (diaryJSON === null) {
    diaryJSON = '{}'
  }
  var currentDiaries = JSON.parse(diaryJSON);
  var totalCalories = 0;
  if(typeof(currentDiaries.exercises) === 'undefined'){
    currentDiaries.exercises = [];
  }
  currentDiaries.exercises.forEach(function(food){
    totalCalories += parseInt(food.calories, 10);
  })
  return totalCalories;
};


module.exports = ExercisesDiary;
