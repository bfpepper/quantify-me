var assert    = require('chai').assert;
var webdriver = require('selenium-webdriver');
var test      = require('selenium-webdriver/testing');

test.describe("User sees all exercises on index.html", function(){
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

  test.it('User sees all exercises on index.html', function() {
    driver.get('http://localhost:8080/index.html');
    var exercisesJSON = JSON.stringify([{name:'Ski', calories:'500'}]);
    driver.executeScript("window.localStorage.setItem('exercises', '" + exercisesJSON + "')");

    driver.get('http://localhost:8080/index.html');

    driver.findElement({id: 'exercise-diary-name'}).getText().then(function(textValue) {
      assert.equal(textValue, 'Ski');
    });

    driver.findElement({id: 'exercise-diary-calories'}).getText().then(function(textValue) {
      assert.equal(textValue, '500');
    });
  });
});
