var assert    = require('chai').assert;
var webdriver = require('selenium-webdriver');
var test      = require('selenium-webdriver/testing');

test.describe("user sees their exercises on exercises.html", function(){
  var driver;
  this.timeout(10000);

  test.beforeEach(function(){
    driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();
  });
  test.afterEach(function(){
    driver.get('http://localhost:8080/exercises.html');
    driver.executeScript('window.localStorage.clear()');
    driver.quit();
  });

  test.it('add exercise into localStorage', function(){
    driver.get('http://localhost:8080/exercises.html');
    var exercisesJSON = JSON.stringify([{name:'hop', calories:'20'}]);
    driver.executeScript("window.localStorage.setItem('exercises', '" + exercisesJSON + "')");

    driver.get("http://localhost:8080/exercises.html");
    driver.executeScript("return window.localStorage.getItem('exercises')")
    .then(function(exercise){
      assert.equal(exercise, '[{"name":"hop","calories":"20"}]');
    });

    driver.get("http://localhost:8080/exercises.html");
    driver.findElement({css: 'table td'}).getText().then(function(textValue){
      assert.include(textValue, 'hop');
    });
    driver.findElement({css: 'table td:nth-child(2)'}).getText().then(function(textValue){
      assert.include(textValue, '20');
    });
  });
});
