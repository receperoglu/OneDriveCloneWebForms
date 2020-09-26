/*
*   MA5Gallery
*   v 1.1
*   Copyright (c) 2015 Tomasz Kalinowski
*   http://galeria.ma5.pl
*   GitHub: https://github.com/ma-5/ma5-gallery
*/ 
;
function ma5showActive(isim, id, tumb) {

    $("#yenidengaleri").val("ok");
    $(".ma5-imgbox").remove();
     $('body').addClass('ma5-in').append('<div class="ma5-imgbox"></div>');
    setTimeout(function() {$('.ma5-imgbox.ma5-previous').remove();$('body').removeClass('ma5-in');}, 300);
    var last = $('.ma5-imgbox').last();
    $('.resimolcusu').css("height", "100px");
    $('.resimislem').css("display", "none");
    $('.resimbaslik').css("display", "none");
    $('#resimisim').css("display", "block");
    $('.resimdiv').removeClass("col-xs-6 col-sm-4 col-md-2 col-lg-2");
    $('.ma5-active img').clone().attr('src', $(this).attr("data-info")).addClass('ma5-clone').appendTo(last);
    var sayi = +(new Date).getTime();
     $('.ma5-imgbox').html("<img id='resimdonder' data-name='"+isim+"' data-id='" + tumb + "' data-url='" + id + "' src='" + isim + "?"+sayi+"' width='100'/>");
     $('#resimadi').html(id);
 }

 


function ma5hideActive() {
 }
function kapatslayt() {
    $("#kontrolculer").hide();
         $('.ma5-imgbox').addClass('ma5-out');
        var content = $(".ma5-bg").contents();
        $('.ma5-gallery').addClass('ma5-out');
        setTimeout(function () {
            $('.ma5-gallery .resimdiv').removeClass('ma5-active');
            $('.ma5-gallery').removeClass('ma5-control').removeClass('ma5-out');
            $(".ma5-bg").replaceWith(content);
            $('.resimolcusu').css("height", "200px");
            $('.resimislem').css("display", "block");
            $('.resimbaslik').css("display", "block");
            $('#resimisim').css("display", "none");

            $('.resimdiv').addClass("col-xs-6 col-sm-4 col-md-2 col-lg-2");
            $("#yenidengaleri").val("");


        }, 100);
        setTimeout(function () {
            $('.ma5-imgbox').remove();
            $('.ma5-control .resimdiv').removeClass('ma5-active');
            $('body').removeClass('ma5-gallery-active')
        }, 100);
   
}

function ma5gallery(img) {
    $(img).on('touch click', function () {
        $("#kontrolculer").show();
         if(!$('.ma5-imgbox').hasClass('ma5-out') && !$('body').hasClass('ma5-in') ) {
            if($(this).parent().parent().hasClass('ma5-gallery') || $(this).parent().parent().hasClass('ma5-bg')) {
                // gallery mode
               

                
                if (!$(this).parent().hasClass('ma5-active')) {
                    $('.ma5-gallery .resimdiv').removeClass('ma5-active');
                    $(this).parent().addClass('ma5-active');
                    if (!$('body').hasClass('ma5-gallery-active')) {
                        $('body').addClass('ma5-gallery-active');
                        $(this).parent().parent().find('.resimdiv').wrapAll('<div class="ma5-bg" />');
                    }

                    var url = $(this).attr('data-info');
                    var name = $(this).attr('data-name');
                    var id = $(this).attr('id');
                     ma5showActive(url,name,id);
                    var fThis = $(this);
                    setTimeout(function () {
                        $(fThis).parent().parent().parent().addClass('ma5-control')
                    }, 100);
                    ma5hideActive(url);
                }
            } else {
                //single mode
                var fThis = $(this);

                 
                $('body').append('<div class="ma5-imgbox ma5-animated"></div>');
                setTimeout(function() {$('.ma5-imgbox').removeClass('ma5-animated')}, 300);
                var last = $('.ma5-imgbox').last();
                $(this).clone().attr('src', $(fThis).attr("data-info")).addClass('ma5-clone').appendTo(last);

                $('.ma5-imgbox').html("<img src=" + $(fThis).attr('data-info') + " width='100'/>");
                $('#resimadi').html(id); 

                $('.ma5-imgbox').on('touch click', function() {
                    if (!$('.ma5-imgbox').hasClass('ma5-animated')) {
                        $(this).addClass('ma5-out');
                        var thisobject = $(this);
                        setTimeout(function() {thisobject.remove(); fThis.parent()}, 100);
                    }
                });
            }
        }
    });
  
};
