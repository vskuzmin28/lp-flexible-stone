$(window).scroll(function() {
  let scroll = $(window).scrollTop();
  
  $('.main__navigation li a').each(function() {
      let elementPositionTop = parseFloat($(this).offset().top) + (parseFloat($(this).height() / 2));

      if (elementPositionTop >= 770 && elementPositionTop <= 1380 || elementPositionTop >= 2130 && elementPositionTop <= 4520 || elementPositionTop >= 5240 && elementPositionTop <= 7520) {
          $(this).addClass('black-link');
      } else {
          $(this).removeClass('black-link');
      }

  });
});



// Cache selectors
var lastId,
    topMenu = $(".main__navigation"),
    topMenuHeight = topMenu.outerHeight()+15,
    // All list items
    menuItems = topMenu.find("a"),
    // Anchors corresponding to menu items
    scrollItems = menuItems.map(function(){
      var item = $($(this).attr("href"));
      if (item.length) { return item; }
    });

// Bind click handler to menu items
// so we can get a fancy scroll animation
menuItems.click(function(e){
  var href = $(this).attr("href"),
      offsetTop = href === "#" ? 0 : $(href).offset().top-topMenuHeight+270;
  $('html, body').stop().animate({ 
      scrollTop: offsetTop
  }, 1500);
  e.preventDefault();
});

// Bind to scroll
$(window).scroll(function(){
   // Get container scroll position
   var fromTop = $(this).scrollTop()+topMenuHeight;
   
   // Get id of current scroll item
   var cur = scrollItems.map(function(){
     if ($(this).offset().top < fromTop)
       return this;
   });
   // Get the id of the current element
   cur = cur[cur.length-1];
   var id = cur && cur.length ? cur[0].id : "";
   
   if (lastId !== id) {
       lastId = id;
       // Set/remove active class
       menuItems
         .parent().removeClass("main__navigation-active")
         .end().filter("[href='#"+id+"']").parent().addClass("main__navigation-active");
   }                   
});

$('.header__nav-item a').click(function(e){
  e.preventDefault();
  $('.burger').toggleClass('active');
  $('.header__nav').toggleClass('header__nav-active');
  $('.header__button').toggleClass('header__button-active');
  $('.header').toggleClass('header__float-show');
})

$(document).scroll(function () {
  svg4everybody();
})

// sliders

$(document).ready(function () {
  let mySwiper = new Swiper ('.about-container', {
    slidesPerView: 1,
    spaceBetween: 0,
    autoHeight: true,
    loop: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    
    breakpoints: {
      320: {
        slidesPerView: 1,
      },
      576: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 1,
      },
      1024: {
        slidesPerView: 1,
      },

    },
    on: {
      init: function() {
        checkArrow();
      },
      resize: function () {
        checkArrow();
      }
    },
  })
});

  $(document).ready(function () {
    let mySwiper = new Swiper ('.swiper-container', {
      slidesPerView: 1,
      spaceBetween: 0,
      autoHeight: true,
      loop: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      
      breakpoints: {
        320: {
          slidesPerView: 1,
        },
        576: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 1,
        },
        1024: {
          slidesPerView: 1,
        },

      },
      on: {
        init: function() {
          checkArrow();
        },
        resize: function () {
          checkArrow();
        }
      },
    })
  });

  function checkArrow() {
    var swiperPrev = document.querySelector('.swiper-button-prev');
    var swiperNext = document.querySelector('.swiper-button-next');
    if ( window.innerWidth > 450 ) {
      swiperPrev.style.display = 'block';
      swiperNext.style.display = 'block';
    } else {
      swiperPrev.style.display = 'none';
      swiperNext.style.display = 'none';
    }
  }

  $('.repair__slider').each(function(){
    let swiper = new Swiper('.repair__slider', {
        direction: 'vertical',
        slidesPerView: 1,
        spaceBetween: 30,
        noSwipingClass: "repair__slider",
        
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            },
    })
});

/* window thanks */

$('.send-form').submit(function() {
    $.post($(this).attr('action'), $(this).serialize(), function(res) {         
   if (res.success == 1) {
       $('.popupCall').bPopup().close();
         $('.popupThanks').bPopup({
           closeClass:'close-popup-one',
               amsl: 0
          });
         setTimeout(function(){$('.popupThanks').bPopup().close();}, 6000);
     }else{
     alert(res.text);
     }
  }, 'json');
  return false;
})

// popup

$('.popupCall, .popupPolytic, .popupThanks').hide();

$('.linkCall').click(function(e){
    e.preventDefault();
	$('.popupCall').bPopup({
        closeClass:'popup__close, close',
        amsl: 0
    })
})

$('.linkCallThx').click(function(e){
    e.preventDefault();
	$('.popupThanks').bPopup({
        closeClass:'close',
        amsl: 0
    })
})

// mask
$(document).ready(function () {
    $("input[name='phone']").mask(" +7 (999) 999-99-99");
});

$('.burger').click(function () {
    $(this).toggleClass('active');
    $('.main__navigation').toggleClass('main__navigation_active');
    $('.header__button').toggleClass('header__button-active');
    $('.header').toggleClass('header__float-show');
});

$('.not-show').hide();

$('.show-btn').click(function (e) {
    e.preventDefault();
    $('.not-show').fadeIn();
    $(this).hide();
});

$('.not-show-brands').hide();

$('.show-btn-brands').click(function (e) {
    e.preventDefault();
    $('.not-show-brands').fadeIn();
    $(this).hide();
});


//Переменная для включения/отключения индикатора загрузки
var spinner = $('.ymap-container').children('.loader');
//Переменная для определения была ли хоть раз загружена Яндекс.Карта (чтобы избежать повторной загрузки при наведении)
var check_if_load = false;
//Необходимые переменные для того, чтобы задать координаты на Яндекс.Карте
var myMapTemp, myPlacemarkTemp;

//Функция создания карты сайта и затем вставки ее в блок с идентификатором "map-yandex"
function init () {
  var myMapTemp = new ymaps.Map("map", {
    center: [55.730138, 37.594238], // координаты центра на карте
    zoom: 7, // коэффициент приближения карты
    controls: ['zoomControl', 'fullscreenControl'] // выбираем только те функции, которые необходимы при использовании
  });
  var myPlacemarkTemp = new ymaps.GeoObject({
    geometry: {
        type: "Point",
        coordinates: [55.730138, 37.594238] // координаты, где будет размещаться флажок на карте
    }
  });
  myMapTemp.geoObjects.add(myPlacemarkTemp); // помещаем флажок на карту

  myMapTemp.controls.add('zoomControl');
  myMapTemp.behaviors.disable('scrollZoom');

  // Получаем первый экземпляр коллекции слоев, потом первый слой коллекции
  var layer = myMapTemp.layers.get(0).get(0);

  // Решение по callback-у для определния полной загрузки карты
  waitForTilesLoad(layer).then(function() {
    // Скрываем индикатор загрузки после полной загрузки карты
    spinner.removeClass('is-active');
  });
}

// Функция для определения полной загрузки карты (на самом деле проверяется загрузка тайлов) 
function waitForTilesLoad(layer) {
  return new ymaps.vow.Promise(function (resolve, reject) {
    var tc = getTileContainer(layer), readyAll = true;
    tc.tiles.each(function (tile, number) {
      if (!tile.isReady()) {
        readyAll = false;
      }
    });
    if (readyAll) {
      resolve();
    } else {
      tc.events.once("ready", function() {
        resolve();
      });
    }
  });
}

function getTileContainer(layer) {
  for (var k in layer) {
    if (layer.hasOwnProperty(k)) {
      if (
        layer[k] instanceof ymaps.layer.tileContainer.CanvasContainer
        || layer[k] instanceof ymaps.layer.tileContainer.DomContainer
      ) {
        return layer[k];
      }
    }
  }
  return null;
}

// Функция загрузки API Яндекс.Карт по требованию (в нашем случае при наведении)
function loadScript(url, callback){
  var script = document.createElement("script");

  if (script.readyState){  // IE
    script.onreadystatechange = function(){
      if (script.readyState == "loaded" ||
              script.readyState == "complete"){
        script.onreadystatechange = null;
        callback();
      }
    };
  } else {  // Другие браузеры
    script.onload = function(){
      callback();
    };
  }

  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
}

// Основная функция, которая проверяет когда мы навели на блок с классом "ymap-container"
var ymap = function() {
  $('.ymap-container').mouseenter(function(){
      if (!check_if_load) { // проверяем первый ли раз загружается Яндекс.Карта, если да, то загружаем
    
      // Чтобы не было повторной загрузки карты, мы изменяем значение переменной
        check_if_load = true; 
    
    // Показываем индикатор загрузки до тех пор, пока карта не загрузится
        spinner.addClass('is-active');

    // Загружаем API Яндекс.Карт
        loadScript("https://api-maps.yandex.ru/2.1/?lang=ru_RU&loadByRequire=1", function(){
           // Как только API Яндекс.Карт загрузились, сразу формируем карту и помещаем в блок с идентификатором "map-yandex"
           ymaps.load(init);
        });                
      }
    }
  );  
}

$(function() {

  //Запускаем основную функцию
  ymap();

});