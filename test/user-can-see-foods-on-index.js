var assert    = require('chai').assert;
var webdriver = require('selenium-webdriver');
var test      = require('selenium-webdriver/testing');

test.describe("User sees all foods on index.html", function(){
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

  test.it('User sees all foods on index.html', function() {
    driver.get('http://localhost:8080/index.html');
    var foodsJSON = JSON.stringify([{name:'Apple', calories:'134'}])
    driver.executeScript("window.localStorage.setItem('foods', '" + foodsJSON + "')");

    driver.get('http://localhost:8080/index.html');

    driver.findElement({id: 'food-diary-name'}).getText().then(function(textValue) {
      assert.equal(textValue, 'Apple')
    });

    driver.findElement({id: 'food-diary-calories'}).getText().then(function(textValue) {
      assert.equal(textValue, '134')
    });
  });
});
