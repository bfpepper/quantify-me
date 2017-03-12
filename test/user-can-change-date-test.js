// var assert    = require('chai').assert;
// var webdriver = require('selenium-webdriver');
// var test      = require('selenium-webdriver/testing');
//
// test.describe("user can change the date on index.html.", function(){
//   var driver;
//   this.timeout(10000);
//
//   test.beforeEach(function(){
//     driver = new webdriver.Builder()
//     .forBrowser('chrome')
//     .build();
//   });
//
//   test.afterEach(function(){
//     driver.get('http://localhost:8080/index.html');
//     driver.executeScript('window.localStorage.clear');
//     driver.quit();
//   });
//
//   test.it("user can click the button to decrease the date.", function() {
//     driver.get('http://localhost:8080/index.html');
//
//     driver.findElement({id: 'date'}).getText().then(function(textValue) {
//       assert.equal(textValue, '02/01/2017')
//     });
//
//     decreaseDate = driver.findElement({id: 'decrease-date'})
//     decreaseDate.click()
//
//     driver.findElement({id: 'date'}).getText().then(function(textValue) {
//       assert.equal(textValue, '01/31/2017')
//     });
//
//   });
//
//   test.it("user can click the button to increase the date.", function() {
//     driver.get('http://localhost:8080/index.html');
//
//     driver.findElement({id: 'date'}).getText().then(function(textValue) {
//       assert.equal(textValue, '02/01/2017')
//     });
//
//     increaseDate = driver.findElement({id: 'increase-date'})
//     increaseDate.click()
//
//     driver.findElement({id: 'date'}).getText().then(function(textValue) {
//       assert.equal(textValue, '02/02/2017')
//     });
//
//   });
//
// });
