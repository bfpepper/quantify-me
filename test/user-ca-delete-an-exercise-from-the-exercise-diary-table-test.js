var assert    = require('chai').assert;
var webdriver = require('selenium-webdriver');
var test      = require('selenium-webdriver/testing');

test.describe("user can delete an exercise off the exercise diary table.", function(){
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

  test.it("user can delete an exercise off the exercise diary table.", function() {

    driver.get('http://localhost:8080/index.html');
    var exercisesJSON = JSON.stringify([{name:'Ski', calories:'500'}]);
    driver.executeScript("window.localStorage.setItem('exercises', '" + exercisesJSON + "')");

    driver.get('http://localhost:8080/index.html');

    var checkBox = driver.findElement({id: "Ski"})
    checkBox.click()
    var button = driver.findElement({id: "exercises-button"})
    button.click()

    driver.findElement({id: 'calories-burned'}).getText().then(function(textValue) {
      assert.equal(textValue, '500')
    });

    var skiRow = driver.findElement({id: 'index-0'})
    skiRow.click()

    driver.findElement({id: 'diary-exercise-table'}).getText().then(function(textValue) {
      assert.notEqual(textValue, 'Ski')
    });

    driver.findElement({id: 'calories-burned'}).getText().then(function(textValue) {
      assert.equal(textValue, '0')
    });

  });

});
