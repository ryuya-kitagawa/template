$(function () {
  new ScrollHint('.js-scrollable');

  $(".c_ham_menu").click(function () {
    $(this).toggleClass('active');
    $(".c_ham_menu_window").toggleClass('active');
    $(".override_bg").fadeToggle();
  });

  $(document).on('click touchend', function (event) {
    // 表示したポップアップ以外の部分をクリックしたとき
    if (!$(event.target).closest('.c_ham_menu').length) {
      $('.c_ham_menu').removeClass('active');
      $('.c_ham_menu_window').removeClass('active');
      $(".override_bg").removeClass();
    }
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


  $('.accordion_menu_btn').click(function () {
    $('.c_accordion_menu').fadeToggle();
  });

  //※ページ内リンクを行わない場合は不必要なので削除してください
  var headerH = $("#header").outerHeight(true);//headerの高さを取得
  $('#g-navi li a').click(function () {
    var elmHash = $(this).attr('href');
    var pos = $(elmHash).offset().top - headerH;//header分の高さを引いた高さまでスクロール
    $('body,html').animate({ scrollTop: pos }, 1000);
    return false;
  });

  // 画面をスクロールをしたら動かしたい場合の記述
  $(window).scroll(function () {
    ScrollAnime();
  });

  // ページが読み込まれたらすぐに動かしたい場合の記述
  // $(window).on('load', function () {
  //   ScrollAnime();
  // });

  var beforePos = 0;//スクロールの値の比較用の設定

  function ScrollAnime() {
    var elemTop = $('#area').offset().top;
    console.log(elemTop);
    var scroll = $(window).scrollTop();
    if (scroll == beforePos) {
    } else if (elemTop > scroll || 0 > scroll - beforePos) {
      $('.l_header._fixed').removeClass('UpMove');
      $('.l_header._fixed').addClass('DownMove');
    } else {
      $('.l_header._fixed').removeClass('DownMove');
      $('.l_header._fixed').addClass('UpMove');
    }

    beforePos = scroll;
  }

  $('.c_slider').slick({
    autoplay: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    prevArrow: '<div class="slick-prev"></div>',
    nextArrow: '<div class="slick-next"></div>',
    dots: true,
    responsive: [
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 426,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  });

  var windowwidth = window.innerWidth || document.documentElement.clientWidth || 0;
  if (windowwidth > 768) {
    var responsiveImage = [//PC用の画像
      // { src: 'C:/Users/elspc001/workspace/template/assets/img/mv1.jpg' },
      // { src: 'C:/Users/elspc001/workspace/template/assets/img/mv2.jpg' },
      // { src: 'C:/Users/elspc001/workspace/template/assets/img/mv3.jpg' }
      { src: 'https://coco-factory.jp/ugokuweb/wp-content/themes/ugokuweb/data/6-2-2/img/19.jpg' },
      { src: 'https://coco-factory.jp/ugokuweb/wp-content/themes/ugokuweb/data/6-2-2/img/23.jpg' },
      { src: 'https://coco-factory.jp/ugokuweb/wp-content/themes/ugokuweb/data/6-2-2/img/26.jpg' }
    ];
  } else {
    var responsiveImage = [//タブレットサイズ（768px）以下用の画像
      // { src: './img/img_sp_01.jpg' },
      // { src: './img/img_sp_02.jpg' },
      // { src: './img/img_sp_03.jpg' }
      { src: 'https://coco-factory.jp/ugokuweb/wp-content/themes/ugokuweb/data/6-2-2/img/19.jpg' },
      { src: 'https://coco-factory.jp/ugokuweb/wp-content/themes/ugokuweb/data/6-2-2/img/23.jpg' },
      { src: 'https://coco-factory.jp/ugokuweb/wp-content/themes/ugokuweb/data/6-2-2/img/26.jpg' }
    ];
  }

  //Vegas全体の設定

  $('#slider').vegas({
    overlay: true,//画像の上に網線やドットのオーバーレイパターン画像を指定。
    transition: 'blur',//切り替わりのアニメーション。http://vegas.jaysalvat.com/documentation/transitions/参照。fade、fade2、slideLeft、slideLeft2、slideRight、slideRight2、slideUp、slideUp2、slideDown、slideDown2、zoomIn、zoomIn2、zoomOut、zoomOut2、swirlLeft、swirlLeft2、swirlRight、swirlRight2、burnburn2、blurblur2、flash、flash2が設定可能。
    transitionDuration: 2000,//切り替わりのアニメーション時間をミリ秒単位で設定
    delay: 10000,//スライド間の遅延をミリ秒単位で。
    animationDuration: 20000,//スライドアニメーション時間をミリ秒単位で設定
    animation: 'kenburns',//スライドアニメーションの種類。http://vegas.jaysalvat.com/documentation/transitions/参照。kenburns、kenburnsUp、kenburnsDown、kenburnsRight、kenburnsLeft、kenburnsUpLeft、kenburnsUpRight、kenburnsDownLeft、kenburnsDownRight、randomが設定可能。
    slides: responsiveImage,//画像設定を読む
    //timer:false,// プログレスバーを非表示したい場合はこのコメントアウトを外してください
  });

  //スクロールをするたびにアニメーションを行う設定
  $('.fadeInUpTrigger').on('inview', function (event, isInView) {
    if (isInView) {//表示領域に入った時
      $(this).addClass('animate__animated animate__fadeInUp');//クラス名が付与
    } else {//表示領域から出た時
      $(this).removeClass('animate__animated animate__fadeInUp');//クラス名が除去
    }
  });

  //スクロールをしたら1度だけアニメーションをする設定
  $('.fadeInUpTriggerOnce').on('inview', function (event, isInView) {
    if (isInView) {//表示領域に入った時
      $(this).addClass('animate__animated animate__fadeInUp');//クラス名が付与
    }
  });

  //違う動きを追加設定
  $('.fadeInDownTrigger').on('inview', function (event, isInView) {
    if (isInView) {//表示領域に入った時
      $(this).addClass('animate__animated animate__fadeInDown');//クラス名が付与
    } else {//表示領域から出た時
      $(this).removeClass('animate__animated animate__fadeInDown');//クラス名が除去
    }
  });
});


$(window).on('load', function () {
  var grid = new Muuri('.grid', {
    showDuration: 600,
    showEasing: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
    hideDuration: 600,
    hideEasing: 'cubic-bezier(0.215, 0.61, 0.355, 1)',


    visibleStyles: {
      opacity: '1',
      transform: 'scale(1)'
    },
    hiddenStyles: {
      opacity: '0',
      transform: 'scale(0.5)'
    }
  });


  $('.sort_btn li').on('click', function () {
    $(".sort_btn .active").removeClass("active");
    var className = $(this).attr("class");
    className = className.split(' ');
    $("." + className[0]).addClass("active");
    if (className[0] == "sort00") {
      grid.show('');
    } else {
      grid.filter("." + className[0]);
    }
  });


  $('[data-fancybox]').fancybox({
    thumbs: {
      autoStart: true,
    },
  });
});
