$(document).ready(function() {
  
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

  // // popup
  // var popup = $('.popup')
  // var close = $('.popup__close')
  // $('.js__popup').click(function(event) {
  //   popup.addClass('jsVisible');
  // });
  // close.click(function(event) {
  //   popup.removeClass('jsVisible');
  //   $(this).closest('.jsVisible').removeClass('jsVisible');
  // });

  function popup (popup, closePopup, popupVisible) {
    var popup = popup;
    var close = closePopup;
    var popupActive = popupVisible;
    close.click(function(){
      popup.removeClass(popupVisible);
      $(this).closest(popupVisible).removeClass(popupVisible)
    });
  }
  popup('popup','popup__close','jsVisible');


  // Navgoco acordion
  var acordion = $('.jsNavgoco')
  acordion.navgoco({accordion: true});


  // Lightgallery
  // $().lightGallery(); 


  // Bx slider
  var slider = $().bxSlider({
    pager: false,
    controls: false,
    auto: true,
    speed: 1000,
    pause: 7000,
    mode: 'fade'
  });


  var slider2 = $().bxSlider({
    pager: true,
    controls: false,
    auto: true,
    speed: 1000,
    pause: 5000,
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
  $().slick({
  infinite: true,
  dots: false,
  arrows: false,
  autoplay: false,
  slidesToShow: 15,
  slidesToScroll: 9,
    // You can unslick at a given breakpoint now by adding:
    // settings: "unslick"
    // instead of a settings object
  });


  // Scroll to top
  $().click(function () {
    $('body,html').animate({
        scrollTop: 0
    }, 1000);
    return false;
  });


  // Height detect funciton
  function heightDetect(){
    $().css( 
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
  var scrolVar = $()
  (function($){
    $(window).load(function(){
      scrollVar.mCustomScrollbar({
        scrollInertia:100,
        contentTouchScroll: true,
        autoExpandScrollbar: true
      });
    });
  })(jQuery);


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

});

