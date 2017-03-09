


const helpers = {
  addExerciseHTML: function(name, calories) {
    return `<tr>
      <td class='exercise-name'>${name}</td>
      <td class='exercise-calories'>${calories}</td>
      <td><button id='delete-exercise-button' class='delete-exercise-button badge' type='button'>-</button></td>
      </tr>`;
  },

  addExerciseNameInputHTML: function(name) {
    return `<input class='update-exercise-name' type="text" name='name' value=${name}></br>`
  },

  addExerciseCaloriesInputHTML: function(calories){
    `<input class='update-exercise-calorie-count' type="text" name='calories' value=${calories}></br>`
  }
};

module.exports = helpers;
