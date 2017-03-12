var assert    = require('chai').assert;
var webdriver = require('selenium-webdriver');
var test      = require('selenium-webdriver/testing');

test.describe("User sees all foods on index.html", function(){
  var driver;
  this.timeout(100000);

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

  test.it("user can click to add foods to a given meal.", function () {
    driver.get('http://localhost:8080/index.html');
    var foodsJSON = JSON.stringify([{name:'Apple', calories:'134'}, {name: "Bananna", calories: "52"}]);
    driver.executeScript("window.localStorage.setItem('foods', '" + foodsJSON + "')");

    driver.get('http://localhost:8080/index.html');

    var checkBox = driver.findElement({id: "Apple"})
    // driver.findElement({css: 'input[id=Apple]'}).click()
    var button = driver.findElement({id: "breakfast-button"})

    checkBox.click()
    // driver.sleep(100000)
    button.click()

    driver.findElement({className: "breakfast-food-name"}).getText().then(function(textValue) {
      assert.equal(textValue, "Apple")
    });

    driver.findElement({className: "breakfast-food-calories"}).getText().then(function(textValue) {
      assert.equal(textValue, "134")
    });
  });

});
