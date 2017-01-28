var assert    = require('chai').assert;
var webdriver = require('selenium-webdriver');
var test      = require('selenium-webdriver/testing');

test.describe("User can see their foods on foods.html", function() {
  var driver;
  this.timeout(10000);

  test.beforeEach(function() {
    driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();
  });

  test.afterEach(function() {
    driver.get('http://localhost:8080/foods.html');
    driver.executeScript('window.localStorage.clear()');
    driver.quit();
  });

  test.it("User sees existing foods when on foods.html", function() {
    driver.get('http://localhost:8080/foods.html');
    var foodsJSON = JSON.stringify([{name:'Apple', calories:'134'}]);
    driver.executeScript("window.localStorage.setItem('foods', '" + foodsJSON + "')");

    driver.get('http://localhost:8080/foods.html');
    driver.executeScript("return window.localStorage.getItem('foods')")
    .then(function(food) {
      assert.equal(food, '[{"name":"Apple","calories":"134"}]');
    });

    driver.get('http://localhost:8080/foods.html');
    driver.findElement({css: 'table td'}).getText().then(function(textValue) {
      assert.include(textValue, 'Apple');
    });
    driver.findElement({css: 'table td:nth-child(2)'}).getText().then(function(textValue) {
      assert.include(textValue, '134');
    });
  });
});
