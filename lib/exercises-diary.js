function ExercisesDiary() {
  this.exercises = [];
  this.totalCalories = this.calculateTotalCalories();
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
  currentDiaries.exercises.forEach(function(exercise){
    totalCalories += parseInt(exercise.calories, 10);
  })
  this.totalCalories = totalCalories;
  return totalCalories;
};


module.exports = ExercisesDiary;
