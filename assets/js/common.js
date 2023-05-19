$(function () {
  new ScrollHint('.js-scrollable');

  $(".c_ham_menu").click(function () {
    $(this).toggleClass('active');
    $(".c_ham_menu_window").toggleClass('active');
    $(".override_bg").fadeToggle();
  });

  var state = false;
  var pos;
  $(".c_ham_menu").click(function () {
    if (state == false) {
      pos = $(window).scrollTop();
      $("body").addClass("fixed").css({ "top": - pos });
      state = true;
    } else {
      $("body").removeClass("fixed").css({ "top": 0 });
      window.scrollTo(0, pos);
      state = false;
    }
  });

});
