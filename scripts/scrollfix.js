/*jslint browserify: true */
var $ = require('jquery'),
    console = require("console-browserify");

module.exports = function() {
  var fixTop = $('.header-wrapper').height();
  console.debug(fixTop);

  $(window).scroll(function() {
      var currentScroll = $(window).scrollTop();
      if (currentScroll >= fixTop) {
        $('.fix').addClass('fixed');
        console.debug('added Class fixed');
      } else {
        $('.fix').removeClass('fixed');
        console.debug('removed Class fixed');
      }
  });
};
