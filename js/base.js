/**
 * Created by Zhichao Liu on 1/11/2016.
 */
$(function () {
    var width;
    $(window).resize(function () {
        width = $(this).width();
        var height = $(this).height();
        $('.banner-content li').css('width',width);
        $('.banner-content').css({marginLeft:$('.dot .sel').index()*width*-1});
        $('.header-mobi .submenu').css({width:width,height:height-44});

        if(width<756){
            $('.header-mobi').show();
            $('.header-pc').hide();
            $('.footer-mobi').show();
            $('.footer-pc').hide();
        }else{
            $('.header-mobi').hide();
            $('.header-pc').show();
            $('.footer-mobi').hide();
            $('.footer-pc').show();
            $('.header-mobi .submenu').slideUp();
        }
    });
    $(window).resize();
    $('.menu').click(function () {
        $('.header-mobi .submenu').finish();
        $('.header-mobi .submenu').slideToggle(500);
        $('body').toggleClass('disableScroll');
    });
    $('.footer-mobi .menulist').find('span').click(function () {
        $('.footer-mobi .menulist').find('ul').finish();
        $(this).parent().find('ul').slideToggle(500);
    });

    (function(){
        var count = 0;
        var length = $('.banner-content li').length;
        var lunbo = function () {
            $('.banner-content').animate({'marginLeft':count*width*-1},500);
            $('.dot li').removeClass('sel');
            $($('.dot li')[count]).addClass('sel');
            if(count<length-1){
                count++;
            }else{
                count = 0;
            }
        };
        lunbo();
        var timerId = setInterval(lunbo,8000);
        $('.dot li').click(function(){
            clearInterval(timerId);
            $('.dot li').removeClass('sel');
            $(this).addClass('sel');
            count = $(this).index();
            lunbo();
            timerId = setInterval(lunbo,8000);
        });
        $('.banner').hover(function(){
            clearInterval(timerId);
        },function(){
            clearInterval(timerId);
            timerId = setInterval(lunbo,8000);
        });

        $('.banner').mousedown(function(e){
            e.preventDefault();
        });

        /*Touch Event*/
        touch.on('.banner','dragend',function(e){
            e.preventDefault();
            if(e.direction=='right'){
                if(Math.abs(e.x)>50){
                    if(count>1){
                        clearInterval(timerId);
                        count-=2;
                        lunbo();
                        timerId = setInterval(lunbo,8000);
                    }else if(count==0) {
                        clearInterval(timerId);
                        count = $('.banner-content li').length - 2;
                        lunbo();
                        timerId = setInterval(lunbo, 8000);
                    }else{
                        clearInterval(timerId);
                        $('.banner-content').animate({'marginLeft':100},200);
                        $('.banner-content').animate({'marginLeft':0},150);
                        timerId = setInterval(lunbo, 8000);
                        return false;
                    }
                }
            }else if(e.direction=='left'){
                if(Math.abs(e.x)>50){
                    if(count<$('.banner-content li').length && count!=0){
                        clearInterval(timerId);
                        lunbo();
                        timerId = setInterval(lunbo,8000);
                    }else if(count==0){
                        clearInterval(timerId);
                        $('.banner-content').animate({'marginLeft':($('.banner-content li').length-1)*width*-1-100},200);
                        $('.banner-content').animate({'marginLeft':($('.banner-content li').length-1)*width*-1},150);
                        timerId = setInterval(lunbo, 8000);
                        return false;
                    }
                }
            }
        });


    })();
});
