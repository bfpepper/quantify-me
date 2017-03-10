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
  diaryBreakfastFoodHTML: function(name, calories, index) {
    return `<tr class='breakfast-row' data-row-index='${index}'>
      <td class='breakfast-food-name'>${name}</td>
      <td class='breakfast-food-calories'>${calories}</td>
      <td><button class='delete-food-meal-button badge' type='button'>-</button></td>
      </tr>`
  },
  diaryBreakfastTotalsHTML: function(allCalories, colorCalorieCount, remainingCalories) {
    return `<tr class="cal-totals-row">
            <td>Total Calories</td>
            <td class='calorie-total'>${allCalories}</td>
            <td></td>
            </tr>
            <tr class="cal-totals-row">
            <td>Remaining Calories</td>
            <td class='calorie-total
            ${colorCalorieCount}
            '>${remainingCalories}</td>
            <td></td>
            </tr>`
  },
  clearBreakfastTableHTML: function() {
    return `<tr>
           <th>Name</th>
           <th>Calories</th>
           <th></th>
           </tr>`
  },
  diaryLunchFoodHTML: function(name, calories, index) {
    return `<tr class='lunch-row' data-row-index='${index}'>
            <td class='lunch-food-name'>${name}</td>
            <td class='lunch-food-calories'>${calories}</td>
            <td><button class='delete-food-meal-button badge' type='button'>-</button></td>
            </tr>`
  },
  diaryLunchTotalsHTML: function(allCalories, colorCalorieCount, remainingCalories) {
    return `<tr class="cal-totals-row">
            <td>Total Calories</td>
            <td class='calorie-total'>${allCalories}</td>
            <td></td>
            </tr>
            <tr class="cal-totals-row">
            <td>Remaining Calories</td>
            <td class='calorie-total
            ${colorCalorieCount}
            '>${remainingCalories}</td>
            <td></td>
            </tr>`
  },
  clearLunchTableHTML: function() {
    return  `<tr>
            <th>Name</th>
            <th>Calories</th>
            <th></th>
            </tr>`

  },
  diaryDinnerTableHTML: function(name, calories, index) {
    return `<tr class='dinner-row' data-row-index='${index}'>
            <td class='dinner-food-name'>${name}</td>
            <td class='dinner-food-calories'>${calories}</td>
            <td><button class='delete-food-meal-button badge' type='button'>-</button></td>
            </tr>`
  },
  diaryDinnerTotalsHTML: function(allCalories, colorCalorieCount, remainingCalories) {
    return `<tr class="cal-totals-row">
            <td>Total Calories</td>
            <td class='calorie-total'>${allCalories}</td>
            <td></td>
            </tr>
            <tr class="cal-totals-row">
            <td>Remaining Calories</td>
            <td class='calorie-total
            ${colorCalorieCount}'>
            ${remainingCalories}</td>
            <td></td>
            </tr>`
  },
  clearDinnerTableHTML: function() {
    return `<tr>
            <th>Name</th>
            <th>Calories</th>
            <th></th>
            </tr>`
  },
  diarySnackTableHTML: function(name, calories, index) {
    return `<tr class='snack-row' data-row-index='${index}'>
            <td class='snack-food-name'>${name}</td>
            <td class='snack-food-calories'>${calories}</td>
            <td><button class='delete-food-meal-button badge' type='button'>-</button></td>
            </tr>`
  },
  diarySnackTotalsHTML: function(allCalories, colorCalorieCount, remainingCalories) {
    return `<tr class="cal-totals-row">
            <td>Total Calories</td>
            <td class='calorie-total'>${allCalories}</td>
            <td></td>
            </tr>
            <tr class="cal-totals-row">
            <td>Remaining Calories</td>
            <td class='calorie-total
            ${colorCalorieCount}'>
            ${remainingCalories}</td>
            <td></td>
            </tr>`
  },
  clearSnackTableHTML: function() {
    return `<tr>
            <th>Name</th>
            <th>Calories</th>
            <th></th>
            </tr>`
  },
  diaryExercisesTableHTML: function(name, calories, index) {
    return `<tr class='exercise-row' data-row-index='${index}'>
            <td class='diary-exercise-name'>${name}</td>
            <td class='diary-exercise-calories'>${calories}</td>
            <td><button class='delete-exercise-diary-button badge' type='button'>-</button></td>
            </tr>`
  },
  diaryExercisesTotalsHTML: function(allCalories, colorCalorieCount) {
    return  `<tr class="cal-totals-row">
            <td>Total Calories</td>
            <td class='calorie-total ${colorCalorieCount}'>${allCalories}</td>
            <td></td>
            </tr>`
  },
  clearDiaryExercisesHTML: function() {
    return  `<tr>
            <th>Name</th>
            <th>Calories</th>
            <th></th>
            </tr>`
  },
  diaryExerciseOptionsTableHTML: function(name, calories) {
    return `<tr>
            <td class='selected-exercises'><input id=${name} type='checkbox'></td>
            <td id='exercise-diary-name'>${name}</td>
            <td id='exercise-diary-calories'>${calories}</td>
            </tr>`
  },
  diaryFoodOptionsTableHTML: function(name, calories) {
    return `<tr>
            <td class='selected-foods'><input id=${name} type='checkbox'></td>
            <td id='foods-diary-name'>${name}</td>
            <td id='foods-diary-calories'>${calories}</td>
            </tr>`
  }
};

module.exports = helpers;
