/*jslint browserify: true */
'use strict';

var $ = require('jquery'),
    console = require('console-browserify'),
    Handlebars = require('handlebars');

module.exports = {
  init: function() {
    console.log('Initializing search');

    var search_form = $('#search-form'),
        result_container = $('#result-container'),
        result_template = Handlebars.compile($('#result-template').html());

    search_form.submit(function (event) {
      console.log('Form submit requested.');

      $.get(
        search_form.attr('action'),
        search_form.serialize()
      ).done(function (results) {

        result_container.html(result_template(results));

        // Wait for re-render
        setTimeout(function () {
          $(window).scrollTop($('.header-wrapper').height());
        }, 100);
        console.log(results);
      });

      event.preventDefault();
    });
  }
};
