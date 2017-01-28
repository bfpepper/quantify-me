var assert    = require('chai').assert;
var webdriver = require('selenium-webdriver');
var test      = require('selenium-webdriver/testing');

test.describe("User can update a food on foods.html", function() {
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

  test.it('user updates a given food', function() {
    driver.get('http://localhost:8080/foods.html');
    var foodsJSON = JSON.stringify([{name:'Apple', calories:'134'}])
    driver.executeScript("window.localStorage.setItem('foods', '" + foodsJSON + "')");

    driver.get('http://localhost:8080/foods.html');
    var foodName = driver.findElement({css: 'table td'});
    var foodCalories = driver.findElement({css: 'table td:nth-child(2)'});
    var elseWhere = driver.findElement({id: 'create-food-name'})

    foodName.click();
    var updateName = driver.findElement({css: 'table td input'});
    updateName.sendKeys('s');
    elseWhere.click();

    driver.findElement({css: 'table td'}).getText().then(function(textValue) {
      assert.equal(textValue, "Apples")
    });
  });
});
