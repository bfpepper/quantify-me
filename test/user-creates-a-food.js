var assert    = require('chai').assert;
var webdriver = require('selenium-webdriver');
var test      = require('selenium-webdriver/testing');

test.describe("user creates a food on foods.html", function(){
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

  test.it("user can submit new food to foods.html", function() {
    driver.get("http://localhost:8080/foods.html");

    var name = driver.findElement({id: 'create-food-name'});
    var calories = driver.findElement({id: 'create-food-calorie-count'});
    var submitButton = driver.findElement({id: 'create-food-button'});

    name.sendKeys('Apple');
    name.getAttribute('value').then(function(value) {
      assert.equal(value, "Apple");
    });

    calories.sendKeys('134');
    calories.getAttribute('value').then(function(value) {
      assert.equal(value, '134');
    });

    submitButton.click();

    driver.findElement({css: 'table td'}).getText().then(function(textValue) {
      assert.include(textValue, 'Apple');
    });

    driver.findElement({css: 'table td:nth-child(2)'}).getText().then(function(textValue) {
      assert.include(textValue, '134');
    });
  });
});
