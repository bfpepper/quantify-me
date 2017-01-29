var assert    = require('chai').assert;
var webdriver = require('selenium-webdriver');
var test      = require('selenium-webdriver/testing');

test.describe("user deletes a food on foods.html", function(){
  var driver;
  this.timeout(10000);

  test.beforeEach(function(){
    driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();
  });

  test.afterEach(function(){
    driver.get('http://localhost:8080/foods.html');
    driver.executeScript('window.localStorage.clear');
    driver.quit();
  });

  test.it("User can delete a given food from foods.html", function() {
    driver.get('http://localhost:8080/foods.html');
    var foodsJSON = JSON.stringify([{name:'Apple', calories:'134'}, {name:'Bananna', calories:'75'}]);
    driver.executeScript("window.localStorage.setItem('foods', '" + foodsJSON + "')");

    driver.get('http://localhost:8080/foods.html');
    var firstFoodDelete = driver.findElement({className: 'delete-food-button'});

    firstFoodDelete.click();

    driver.findElement({css: 'table td'}).getText().then(function(textValue) {
      assert.equal(textValue, "Bananna");
    });
  });
});
