function ErrorHandler () {

};

ErrorHandler.prototype.validations = function (object) {
  try {
    if (object.name === '') {
      throw `Please enter a ${object.constructor.name.toLowerCase()} name`
    }
    if (object.calories === '') {
      throw `Please enter a calorie amount`
    }
  } catch(err) {
    return err
  }
};

module.exports = ErrorHandler;
