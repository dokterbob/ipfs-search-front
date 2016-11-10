/*jslint browserify: true */
'use strict';

var $ = require('jquery'),
    console = require("console-browserify"),
    scrollfix = require('./scrollfix');

$(function () {
  console.log('init');

  scrollfix();
});



