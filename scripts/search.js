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
        result_template = Handlebars.compile($('#result-template').html()),
        page_number = $('#page-number');

    function submit_form() {
      console.log('Form submit requested.');

      // Reset page number
      page_number.val(0);

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

      return false;
    }

    search_form.submit(submit_form);

    window.next_page = function () {
      console.log('Page increase');
      page_number.val(parseInt(page_number.val()) + 1);
      submit_form();
    };

    window.prev_page = function () {
      console.log('Page decrease');
      page_number.val(parseInt(page_number.val()) - 1);
      submit_form();
    };

  }
};
