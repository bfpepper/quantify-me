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
    var foodsJSON = JSON.stringify([{name:'Apple', calories:'134'}]);
    driver.executeScript("window.localStorage.setItem('foods', '" + foodsJSON + "')");

    driver.get('http://localhost:8080/index.html');

    var checkBox = driver.findElement({id: "Apple"})
    checkBox.click()
    var button = driver.findElement({id: "breakfast-button"})
    button.click()

    driver.findElement({id: 'calories-consumed'}).getText().then(function(textValue) {
      assert.equal(textValue, '134');
    });

    var appleRow = driver.findElement({id: 'index-0'})
    appleRow.click()

    driver.findElement({id: 'diary-breakfast-table'}).getText().then(function(textValue) {
      assert.notInclude(textValue, 'Apple')
    });

    driver.findElement({id: 'calories-consumed'}).getText().then(function(textValue) {
      assert.equal(textValue, '0')
    });

  });

  test.it("user can delete a food off the lunch diary table.", function() {

    driver.get('http://localhost:8080/index.html');
    var foodsJSON = JSON.stringify([{name:'Apple', calories:'134'}]);
    driver.executeScript("window.localStorage.setItem('foods', '" + foodsJSON + "')");

    driver.get('http://localhost:8080/index.html');

    var checkBox = driver.findElement({id: "Apple"})
    checkBox.click()
    var button = driver.findElement({id: "lunch-button"})
    button.click()

    driver.findElement({id: 'calories-consumed'}).getText().then(function(textValue) {
      assert.equal(textValue, '134');
    });

    var appleRow = driver.findElement({id: 'index-0'})
    appleRow.click()

    driver.findElement({id: 'diary-lunch-table'}).getText().then(function(textValue) {
      assert.notInclude(textValue, 'Apple')
    });

    driver.findElement({id: 'calories-consumed'}).getText().then(function(textValue) {
      assert.equal(textValue, '0')
    });

  });

  test.it("user can delete a food off the dinner diary table.", function() {

    driver.get('http://localhost:8080/index.html');
    var foodsJSON = JSON.stringify([{name:'Apple', calories:'134'}]);
    driver.executeScript("window.localStorage.setItem('foods', '" + foodsJSON + "')");

    driver.get('http://localhost:8080/index.html');

    var checkBox = driver.findElement({id: "Apple"})
    checkBox.click()
    var button = driver.findElement({id: "dinner-button"})
    button.click()

    driver.findElement({id: 'calories-consumed'}).getText().then(function(textValue) {
      assert.equal(textValue, '134');
    });

    var appleRow = driver.findElement({id: 'index-0'})
    appleRow.click()

    driver.findElement({id: 'diary-dinner-table'}).getText().then(function(textValue) {
      assert.notInclude(textValue, 'Apple')
    });

    driver.findElement({id: 'calories-consumed'}).getText().then(function(textValue) {
      assert.equal(textValue, '0')
    });

  });

  test.it("user can delete a food off the snacks diary table.", function() {

    driver.get('http://localhost:8080/index.html');
    var foodsJSON = JSON.stringify([{name:'Apple', calories:'134'}]);
    driver.executeScript("window.localStorage.setItem('foods', '" + foodsJSON + "')");

    driver.get('http://localhost:8080/index.html');

    var checkBox = driver.findElement({id: "Apple"})
    checkBox.click()
    var button = driver.findElement({id: "snacks-button"})
    button.click()

    driver.findElement({id: 'calories-consumed'}).getText().then(function(textValue) {
      assert.equal(textValue, '134');
    });

    var appleRow = driver.findElement({id: 'index-0'})
    appleRow.click()

    driver.findElement({id: 'diary-snacks-table'}).getText().then(function(textValue) {
      assert.notInclude(textValue, 'Apple')
    });

    driver.findElement({id: 'calories-consumed'}).getText().then(function(textValue) {
      assert.equal(textValue, '0')
    });

  });

});
