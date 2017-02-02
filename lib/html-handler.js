module.exports = {
  addExerciseHTML: function(name, calories) {
    return `<tr>
      <td class='exercise-name'>${name}</td>
      <td class='exercise-calories'>${calories}</td>
      <td><button id='delete-exercise-button' class='delete-exercise-button badge' type='button'>-</button></td>
      </tr>`;
  }
};
