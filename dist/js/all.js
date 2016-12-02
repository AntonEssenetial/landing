$(document).ready(function() {
  
  // Paralax
  var $layerParallax = $('.section__top__intro');
    if ( ! Modernizr.touch ) {
      if ( $layerParallax.length > 0 ) {
      $layerParallax.parallax();
    }
  }


  var wHeight = $(window).height();
  
  function parallax() {
    var pHeight = $(this).outerHeight();
    var pMiddle = pHeight / 2;
    var wMiddle = wHeight / 2;
    var fromTop = $(this).offset().top;
    var scrolled = $(window).scrollTop();
    var speed = $(this).attr('data-parallax-speed');
    var rangeA = (fromTop - wHeight);
    var rangeB = (fromTop + pHeight);
    var rangeC = (fromTop - wHeight);
    var rangeD = (pMiddle + fromTop) - (wMiddle + (wMiddle / 2));
    
    if (rangeA < 0) {
      rangeA = 0;
      rangeB = wHeight
    }

    var percent = (scrolled - rangeA) / (rangeB - rangeA);
    percent = percent * 100;
    percent = percent * speed;
    percent = percent.toFixed(2);
    
    var animFromBottom = (scrolled - rangeC) / (rangeD - rangeC);
    animFromBottom = animFromBottom.toFixed(2);
    
    if (animFromBottom >= 1) {
      animFromBottom = 1;
    }

    $(this).css('background-position', 'center ' + percent + '%');
    $(this).find('.parallax-content').css('opacity', animFromBottom);
    $(this).find('.parallax-content').css('transform', 'scale(' + animFromBottom + ')');
  }
  $('.parallax').each(parallax);
  $(window).scroll(function(e) {
    $('.parallax').each(parallax);
  });
  
  // Active tabs
  function swtch(tab, tabActive, tabContent, parentDiv){
    var tab = $(tab),
        tabActive = tabActive,
        parentEl = $(parentDiv),
        tabContent = $(tabContent);
    tab.click(function() {
      $(this).closest(parentEl).find(tab).removeClass(tabActive).eq($(this).index()).addClass(tabActive);
      $(this).closest(parentEl).find(tabContent).removeClass(tabActive).eq($(this).index()).addClass(tabActive);
    }).eq(0)
  };
  swtch('.jsTab', 'active', '.jsCont', '.jsParent')


  // Navgoco acordion
  var acordion = $('.jsNavgoco')
  acordion.navgoco({accordion: true});


  // Lightgallery
  // $().lightGallery(); 


  // Bx slider
  var slider1 = $('jsBxSlider-0').bxSlider({
    pager: true,
    controls: false,
    auto: true,
    speed: 1000,
    pause: 5000,
    mode: 'fade',
    pagerCustom: '.bx__pager',
    responsive: true,
    // nextSelector: '.s-next',
    // prevSelector: '.s-prev',
    // nextText: '↽',
    // prevText: '↽'
  });


  // Bx custom controls 
  // $('#next').click(function(){
  //   slider1.goToNextSlide();
  //   slider2.goToPrevSlide();
  //   return false
  // });
  // $('#prev').click(function(){
  //   slider1.goToPrevSlide();
  //   slider2.goToNextSlide();
  //   return false
  // });


  // Slick slider
  $('.jsSlick-0').slick({
    infinite: true,
    dots: true,
    arrows: true,
    autoplay: false,
    slidesToShow: 1,
    slidesToScroll: 1
  });


  // Slick slider
  $('.jsSlick-1').slick({
    infinite: true,
    dots: false,
    arrows: true,
    autoplay: false,
    slidesToShow: 11,
    // slidesToScroll: 11,
    draggable: false,
    lazyLoad: 'ondemand',
    focusOnSelect: true,
    centerMode: true,
    variableWidth: true,
    nextArrow: '.jsSlickNext',
    prevArrow: '.jsSlickPrev',
    responsive: [
      {
        breakpoint: 1250,
        settings: {
          slidesToShow: 7,
          slidesToScroll: 3
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }]
  });


  // Reenit slick
  // $().click(function(event) {
  //   $().slick("setPosition");
  // });


  // Scroll to top
  $().click(function () {
    $('body,html').animate({
        scrollTop: 0
    }, 1000);
    return false;
  });


  // Height detect funciton
  function heightDetect(){
    $('.section__top').css( 
      'height', $(window).height()
    );
  };
  heightDetect();
  $(window).resize(function(){
    heightDetect();
  });


  // Width detect funciton
  function widthDetect(){
    $().css( 
      'width', $(window).width()
    );
  };
  widthDetect();
  $(window).resize(function(){
    widthDetect();
  });


  // Toggle menu
  var menu = $()
  $('.jsTag').click(function(event) {
    $(this).toggleClass('active')
    menu.toggleClass('active animated fadeInUp');
    // $('.menu').toggleClass('active animated fadeInUp');
  });


  // Custom scroll
  (function($){
    $(window).load(function(){
      $('.custom-scroll').mCustomScrollbar({
        scrollInertia:100,
        contentTouchScroll: true,
        autoExpandScrollbar: true
        // axis:"x"
      });
    });
  })(jQuery);


  // Destroy custom scroll
  function menuScroll() {
    if ($(window).width() <= 1024) {
        $('.custom-scroll').mCustomScrollbar("destroy").addClass('overflow');
      } else {
      $(".custom-scroll").mCustomScrollbar({
        scrollInertia:100,
        contentTouchScroll: true,
        autoExpandScrollbar: true
      });
    }
  }


  // Auto height column function
  equalheight = function(container){

  var currentTallest = 0,
       currentRowStart = 0,
       rowDivs = new Array(),
       $el,
       topPosition = 0;
   $(container).each(function() {
  
     $el = $(this);
     $($el).height('auto')
     topPostion = $el.position().top;
  
     if (currentRowStart != topPostion) {
       for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
         rowDivs[currentDiv].height(currentTallest);
       }
       rowDivs.length = 0; // empty the array
       currentRowStart = topPostion;
       currentTallest = $el.height();
       rowDivs.push($el);
     } else {
       rowDivs.push($el);
       currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);
    }
     for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
       rowDivs[currentDiv].height(currentTallest);
     }
   });
  }
  
  $(window).load(function() {
    equalheight();
  });
  
  
  $(window).resize(function(){
    equalheight();
  });


  // Anchor function
  $(function() {
    $(".jsAnchor").click(function() {
      if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
        if (target.length) {
          $('html,body').animate({
            scrollTop: target.offset().top
          }, 1000);
          return false;
        }
      }
    });
  });


  // Lightbox
  // var lightbox = $('.jsLightBox').simpleLightbox({
  //   captions: false,
  //   showCounter: false,
  //   nav: false
  // });


  // Lang selector
  $('.jsLangSelector').click(function(){
    $(this).toggleClass('active');
    $('.jsLangContent').toggleClass('jsVisible');
  });
  $(document).mouseup(function (e) {
    var container = $(".jsLangSelector");
    if (container.has(e.target).length === 0){
        container.removeClass('active');
    }
  });

});