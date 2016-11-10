/*jslint node: true */
'use strict';
var $ = require('jquery');

$(function () {
  // your code goes here
  console.log('init');

  var fixTop = $('.header-wrapper').height();
  console.log(fixTop);
  $(window).scroll(function() {
      var currentScroll = $(window).scrollTop();
      if (currentScroll >= fixTop) {
        $('.fix').addClass('fixed');
        console.log('added Class fixed');
      } else {
        $('.fix').removeClass('fixed');
        console.log('removed Class fixed');
      }
  });
});



