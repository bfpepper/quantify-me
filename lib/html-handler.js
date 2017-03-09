const helpers = {
  addExerciseHTML: function(name, calories) {
    return `<tr>
      <td class='exercise-name'>${name}</td>
      <td class='exercise-calories'>${calories}</td>
      <td><button id='delete-exercise-button'
          class='delete-exercise-button badge' type='button'>-
      </button></td>
      </tr>`;
  },

  addExerciseNameInputHTML: function(name) {
    return `<input class='update-exercise-name'
            type="text" name='name' value=${name}></br>`
  },

  addExerciseCaloriesInputHTML: function(calories) {
    return `<input class='update-exercise-calorie-count'
             type="text" name='calories' value=${calories}></br>`
  },

  clearExerciseTableHTML: function() {
    return `<tr>
            <th>Name</th>
            <th>Calories</th>
            <th>Delete</th>
            </tr>`
  },

  addFoodHTML: function(name, calories) {
    return `<tr>
            <td class='food-name'>${name}</td>
            <td class='food-calories'>${calories}</td>
            <td>
                <button id='delete-food-button'
                class='delete-food-button badge'
                type='button'>-</button>
            </td>
            </tr>`
  },

  addFoodNameInputHTML: function(name) {
    return `<input class='update-food-name'
             type='text' name='name' value=${name}><br>`
  },

  addFoodCaloriesInputHTML: function(calories) {
    return `<input class='update-food-calorie-count'
            type="text" name="calories" value=${calories}></br>`
  },

  clearFoodTableHTML: function() {
    return  `<tr>
            <th>Name</th>
            <th>Calories</th>
            <th>Delete</th>
            </tr>`
  },
  printDiaryBreakfastFood: function(name, calories, index) {
    return `<tr class='breakfast-row' data-row-index='${index}'>
      <td class='breakfast-food-name'>${name}</td>
      <td class='breakfast-food-calories'>${calories}</td>
      <td><button class='delete-food-meal-button badge' type='button'>-</button></td>
      </tr>`
  }
};

module.exports = helpers;
