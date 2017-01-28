var assert    = require('chai').assert;
var webdriver = require('selenium-webdriver');
var test      = require('selenium-webdriver/testing');

test.describe("user deletes an exercise test", function(){
  var driver;
  this.timeout(1000000);

  test.beforeEach(function(){
    driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();
  });

  test.afterEach(function(){
    driver.get('http://localhost:8080/exercises.html');
    driver.executeScript('window.localStorage.clear');
    driver.quit();
  });

  test.it("user deletes an exercise from exercise.html", function(){
    driver.get('http://localhost:8080/exercises.html');
    var exercisesJSON = JSON.stringify([{name:'hop', calories:'20'}, {name:'skip', calories:'30'}]);
    driver.executeScript("window.localStorage.setItem('exercises', '" + exercisesJSON + "')");

    driver.get('http://localhost:8080/exercises.html');
    var firstExerciseDelete = driver.findElement({id: 'delete-exercise-button'});

    firstExerciseDelete.click();

    driver.findElement({css: 'table td'}).getText().then(function(textValue){
      assert.equal(textValue, 'skip');
    });
  });
});
