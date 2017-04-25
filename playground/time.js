var moment = require('moment');
// var date = new Date();
// console.log(date.getMonth());

var date = moment(); // current moment in time
date.add(1000, 'year').subtract(4, 'months');
console.log(date.format('MMM Do, YYYY'))

var someTimestamp = moment().valueOf();
console.log(someTimestamp)
var createdAt = 1234;
var date = moment(1234);
console.log(date.format('h:mm a'))
