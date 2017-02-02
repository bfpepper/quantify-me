var assert    = require('chai').assert;
var webdriver = require('selenium-webdriver');
var test      = require('selenium-webdriver/testing');

test.describe("user can click on checkbox next to item", function(){
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

  test.it("user can click on a check box next to a food in index.html", function() {
    driver.get('http://localhost:8080/index.html');
    var foodsJSON = JSON.stringify([{name:'Apple', calories:'134'}, {name:'Bananna', calories:'75'}]);
    driver.executeScript("window.localStorage.setItem('foods', '" + foodsJSON + "')");

    driver.get('http://localhost:8080/index.html');
    var firstFood = driver.findElement({id: "Apple"});
    var breakfastButton = driver.findElement({id: "breakfast-button"});

    firstFood.click();
    breakfastButton.click();

    driver.findElement({className: 'breakfast-food-name'}).getText().then(function(textValue) {
      assert.equal(textValue, 'Apple')
    });


  });

});
