var assert = require('chai').assert;
var webdriver = require('selenium-webdriver');
var test = require('selenium-webdriver/testing');

test.describe("user creates an exercise entry from exercises.html", function(){
  var driver;
  this.timeout(10000);

  test.beforeEach(function(){
    driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();
  })

  test.afterEach(function(){
    driver.get('http://localhost:8080/exercises.html')
    driver.executeScript("window.localStorage.clear()");
    driver.quit();
  })

  test.it("prints updated information to page", function(){
    driver.get("http://localhost:8080/exercises.html");
    driver.sleep(1000)
    var name = driver.findElement({id: 'create-exercise-name'});
    var calories = driver.findElement({id: 'create-exercise-calorie-count'});

    name.sendKeys('hop');
    name.getAttribute('value').then(function(value){
      assert.equal(value, 'hop');
    });
    calories.sendKeys('20');
    calories.getAttribute('value').then(function(value){
      assert.equal(value, '20');
    });
  });
});
