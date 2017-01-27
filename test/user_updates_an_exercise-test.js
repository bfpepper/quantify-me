var assert    = require('chai').assert;
var webdriver = require('selenium-webdriver');
var test      = require('selenium-webdriver/testing');

test.describe("user updates an exercise on exercise.html", function(){
  var driver;
  this.timeout(10000);

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

  test.it('updates an exercise inline', function(){
    driver.get('http://localhost:8080/exercises.html');
    var exercisesJSON = JSON.stringify([{name:'hop', calories:'20'}])
    driver.executeScript("window.localStorage.setItem('exercises', '" + exercisesJSON + "')");

    driver.get('http://localhost:8080/exercises.html');
    var exerciseName = driver.findElement({css: 'table td'});
    var exerciseCal = driver.findElement({css: 'table td:nth-child(2)'});
    var elsewhere = driver.findElement({id: 'create-exercise-name'})

    exerciseName.click();
    var updateName = driver.findElement({css: 'table td input'});
    updateName.sendKeys('s');
    elsewhere.click();

    driver.findElement({css: 'table td'}).getText().then(function(textValue){
      assert.equal(textValue,'hops')
    });
  });
});
