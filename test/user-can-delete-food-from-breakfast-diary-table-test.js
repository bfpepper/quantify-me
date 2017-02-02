var assert    = require('chai').assert;
var webdriver = require('selenium-webdriver');
var test      = require('selenium-webdriver/testing');

test.describe("user can delete a food off a diary meal table.", function(){
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

  test.it("user can delete a food off the breakfast diary table.", function() {

    driver.get('http://localhost:8080/index.html');
    var foodsJSON = JSON.stringify([{name:'Apple', calories:'134'}, {name: "Bananna", calories: "52"}]);
    driver.executeScript("window.localStorage.setItem('foods', '" + foodsJSON + "')");

    driver.get('http://localhost:8080/index.html');

    var checkBox = driver.findElement({id: "Apple"})
    checkBox.click()
    var button = driver.findElement({id: "breakfast-button"})
    button.click()

    var appleRow = driver.findElement({className: 'delete-food-meal-button'})
    appleRow.click()

    driver.findElement({id: 'diary-breakfast-table'}).getText().then(function(textValue) {
      assert.notEqual(textValue, 'Apple')
    });

  });

});
