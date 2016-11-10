/*jslint browserify: true */
'use strict';

var $ = require('jquery'),
    console = require("console-browserify");

module.exports = {
  init: function() {
    console.log('Initializing search');

    var search_form = $('#search-form');

    search_form.submit(function (event) {
      console.log('Form submit requested.');

      event.preventDefault();
    });
  }
};
