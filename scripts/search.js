/*jslint browserify: true */
'use strict';

var $ = require('jquery'),
    console = require('console-browserify'),
    result_template = require('./templates/results');

module.exports = {
  init: function() {
    console.log('Initializing search');

    var search_form = $('#search-form'),
        result_container = $('#result-container'),
        page_number = $('#page-number');

    function submit_form() {
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

      return false;
    }

    search_form.submit(function () {
      // Reset page number
      page_number.val(0);
      return submit_form();
    });

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
