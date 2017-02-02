var assert    = require('chai').assert;
var webdriver = require('selenium-webdriver');
var test      = require('selenium-webdriver/testing');

test.describe("User can add exercises on index.html", function(){
  var driver;
  this.timeout(10000);

  test.beforeEach(function(){
    driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();
  });

  test.afterEach(function(){
    driver.get('http://localhost:8080/index.html');
    driver.executeScript('window.localStorage.clear');
    driver.quit();
  });

  test.it("user can click to add exercise.", function () {
    driver.get('http://localhost:8080/index.html');
    var exercisesJSON = JSON.stringify([{name:'Ski', calories:'500'}, {name: "Sit", calories: "20"}]);
    driver.executeScript("window.localStorage.setItem('exercises', '" + exercisesJSON + "')");

    driver.get('http://localhost:8080/index.html');

    var checkBox = driver.findElement({id: "Ski"})
    checkBox.click()
    var button = driver.findElement({id: "exercises-button"})
    button.click()

    driver.findElement({className: "diary-exercise-name"}).getText().then(function(textValue) {
      assert.equal(textValue, "Ski")
    });

    driver.findElement({className: "diary-exercise-calories"}).getText().then(function(textValue) {
      assert.equal(textValue, "500")
    });
  });

});
