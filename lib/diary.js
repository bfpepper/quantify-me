var $         = require('jquery');
var thing     = require('./stylesheets/main.css');
var breakfast = require('./breakfast')
var lunch     = require('./lunch')
var dinner    = require('./dinner')
var snacks    = require('./snacks')
var exercises = require('./exercises-diary')

function Diary() {
  this.breakfast = new breakfast;
  this.lunch     = new lunch;
  this.dinner    = new dinner;
  this.snacks    = new snacks;
  this.exercises = new exercises;
}

Diary.prototype.setBreakfastTable = function () {
  var thing = $('input[type=checkbox]:checked').parent().each(function( index ) {
    $(this).siblings().each(function( index ) {
      console.log( "inner index" + index + ": " + $( this ).text() );
    });
    console.log( "outer index" + index + ": " + $( this ).text() );
  });
};

module.exports = Diary;
