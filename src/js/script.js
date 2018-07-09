$(document).ready(function(){
//ここからはスライドショーのライトボタン系
  var num               = 0;
  var slideNum          = $('#slides div').length;
  var slideIntervalID   = 0;
  var slideCurrentIndex = 0;
  var slideTime         = 5000;
  var thumbnailAction   = "click";
  //先頭の画像をフェードインさせる
  $('#slides .slider0').fadeIn('slow');
  $('#thumbnail .slider0').addClass('active');
  //スライドショー開始
  slideIntervalID = setInterval(moveSlide , slideTime);
  //スライドを次へ送る
  //idx:あれば指定された番号のスライドを表示、なければ+1する
  function moveSlide(idx) {
    //表示している画像と同じサムネイルをクリックしたときは処理しない
    if (idx == slideCurrentIndex) {
        return false;
    }
    //idxがundefindだった場合
    if (typeof idx === 'undefined') {
       idx = Number(slideCurrentIndex) + 1;
    }
    //idxが最後までいった場合最初に戻す
    if (idx == slideNum) {
       idx = 0;
    }
    //slideCurrentIndexのスライドを隠す
    $('#slides .slider' + slideCurrentIndex).fadeOut('slow');
    $('#thumbnail .slider' + slideCurrentIndex).removeClass('active');
    //idxのスライドを表示する
    $('#slides .slider' + idx).fadeIn('slow');
    $('#thumbnail .slider' + idx).addClass('active');
    //slideCurrentIndexを更新する
    slideCurrentIndex = idx;
    }
    //指定された数字にスライドする
    function newSlideInterval(num) {
      //インターバルを止める
      clearInterval(slideIntervalID);
      //moveSlideにiを与えてスライドを再開
      moveSlide(num);
      slideIntervalID = setInterval(moveSlide , slideTime);
    }
    //サムネイルをクリックorホバーしたらスライドする
    $('#thumbnail div').bind(thumbnailAction , function() {
      var _this = $(this);
      //スライドさせる
      num = _this.attr('class').replace('slider' , '');
      newSlideInterval(num);
    });
    //矢印をクリックしたらスライドを送る
    $('.moveSlide').bind('click' , function() {
      //クリックされたボタンのIDで戻る進を判断する
      var moveDirection = $(this).attr('id').replace('slider' , '');
      if (moveDirection == 'Right') {
        //右矢印をクリックした場合
        if (slideCurrentIndex == slideNum + 1) {
            num = 0;
        } else {
            num = slideCurrentIndex + 1;
        }
      } else {
      //左矢印をクリックした場合
        if (slideCurrentIndex == 0) {
            num = slideNum - 1;
          } else {
            num = slideCurrentIndex - 1;
        }
      }
      //スライドさせる
      newSlideInterval(num);
    });
});

//ここからスライド
$(document).ready(function(){
  $('.center').slick({
    arrows: true,
    prevArrow: '<img src="src/images/prev.jpg" class="slide-arrow prev-arrow">',
    nextArrow: '<img src="src/images/next.jpg" class="slide-arrow next-arrow">',
    centerMode: true,
    infinite: true,
    centerPadding: '60px',
    slidesToShow: 3,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: true,
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 3
        }
      },
      {
        breakpoint: 480,
        settings: {
          arrows: true,
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 1
        }
      }
  ]
  });
});
