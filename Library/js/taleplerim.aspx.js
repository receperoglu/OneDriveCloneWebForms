
$(".clb-title").html("Talep Listesi");
$(document).on("mouseover", ".popinfo", function () {
    $(".bilgikart").html($(this).attr("data-info"));
    $(".bilgikart").show();
    var ust = $(this).offset().top;
    var sol = $(this).offset().left;
    $(".bilgikart").css({ 'top': ust - 80, 'left': sol })
});
$(document).on("mouseleave", ".popinfo", function () {
    $(".bilgikart").hide();
});



$(document).ready(function () {

    var onay = function () {
        $(".modal-body").html("Talebiniz İletildi,Hizmet alımının onayı için teyit alınıyor");
        $("#ouibounce-modal").show();
        $("#bilgimodal").show();
        $("#kapsayici").css({ "display": "none" });
        $("body").css("overflow", "scroll");
        document.getElementById('geridon').click();
        document.getElementById('kabuledildi').click();
    }
    $(document).on("change", "#parabirimisecici", function () {
        var value = $(this).children(":selected").attr("data-id");
        $("#parabirimitxt").val(value);
        console.log(value);
    });



    $(document).on("click", "#kabulid", function () {
        var id = $(this).attr("data-Id");
        $("#kapsayici").css({ "display": "block" });
      //  $("body").css("overflow", "hidden");
       setTimeout(onay, 2000);
    });
    $(document).on("click", ".detay", function () {
        $(".bilgikart").hide();
        $(".clb-post-meta").addClass("pad10");


        $("#bekleyin").slideDown();
        $("#talepfiltre").hide();
        $("#taleplistesi").hide();
        var talepid = $(this).attr("data-Id");
        var ClaimStatus = $(this).attr("data-statu");
        $("#ClaimStatus").val(ClaimStatus);
        $("#gecerliteklif").val(talepid);
        document.getElementById('teklifgetir').click();
    });

    $(document).on("click", ".teklifdetay", function () {

        var talepid = $(this).attr("data-Id");
        $("#acentateklifid").val(talepid);
        document.getElementById('teklifdetaybtn').click();
        var alt = function () {
           document.getElementById('sonbtn').click();
            $("#kabul").show();
            $("#kabulid").attr("data-Id", talepid);
            $(".teklifpanel").css("opacity","0.85")
        };
        setTimeout(alt, 1000);
    });

    $(document).on("click", ".sozlesmeindir", function () {
        var sozlesmeid = $(this).attr("data-teklifid");
        window.open("sozlesmeler/Sozlesme" + sozlesmeid + ".pdf");
    });
    $(document).on("click", ".faturaindir", function () {
        var fatura = $(this).attr("data-teklifid");
        window.open("paylasilan/fatura/" + fatura);
    });


    $(document).on("click", "#geridon", function () {
        $("#divacentateklif").attr("data-state", "");
        $("#kabul").hide();
        $("#talepdetay").html("");
        $("#taleplistesi").slideDown();
        $("#sozlesmehazirlaniyor").slideDown();

        $('#sozlesmebilgi').hide();

        $('#OnOdemeAlindiBilgi').hide();

        $('#sozlesmehazirbilgi').hide();
        $(".clb-post-meta").html("");
        $(".clb-post-meta").removeClass("pad10");
        $("#sayfabaslik").html("Talep Listesi.");
        $("#geridon").hide();
        $("#talepfiltre").show();
        $("#alinanteklifler").hide();
        $("#teklifyok").hide();
        $("#taleponaylanmadi").hide();
        $("#divacentateklif").hide();
        $("#talepiptaledildi").hide();
        $("#OdemeBildirmeAlani").slideUp();
        $("#thumblar").hide();
        $(".teklifpanel").css("opacity", "1")
    });

    $(document).on("click", "#teklifyap", function () {
        $(".teklifpanel").slideDown();
        $("#teklifyap").slideUp();
        $("#teklifdetaytxt").focus();
    })
    $(document).on("click", "#dropdown1 li", function () {

        var tur = $(this).attr("data-tur");
        $(".talep").hide();
        var turclass = ("." + tur);
        $(turclass).show();
        if (tur == "tum") {
            $(".talep").show();
        }
    });

    //$(document).on("click", "img", function () {
    //    var resimadres = $(this).attr("src");
    //    $("#resim").attr("src", resimadres);
    //    $("#ouibounce-modal").show();
    //    $("#bilgimodal").show();
    //});
    $(document).on("click", ".OdemeBildir", function () {
        $("#thumblar").hide();
        $("#OdemeBildirmeAlani").show();
        $("#divacentateklif").hide();
        $('#sozlesmebilgi').animate({ "right": '-300px' });
        $('#sozlesmehazirbilgi').animate({ "right": '-300px' });

        $('#OnOdemeAlindiBilgi').animate({ "right": '-300px' });

        document.getElementById('odemebtngit').click();
        var yuzdeyirmiodeme = $(".minimumodemetutari").html();
        $("#rezervasyonodemesitutari").html(yuzdeyirmiodeme);

        var kalanodeme = $(".kalanodemetutari").html();
        $("#kalanodemetutari").html(kalanodeme);

    });
    $(document).on("click", "#OdemeGonder", function () {
        $("#OdemeBildirmeAlani").slideUp();
        $("#kapsayici").slideDown();
        $("#OdenecekTeklif").val($("#divacentateklif").attr("data-teklifid"));
        setTimeout(function () {
            document.getElementById("odemekaydet").click();
        }
            , 100)


    });



});

function vazgecteyit() { window.alert("Emin misiniz ?"); }
function gecerliteklifiac() {
    document.getElementById('teklifdetaybtn').click();

}
function notInterested() {
    $("#ouibounce-modal").hide();
    $("#bilgimodal").hide();
}

function yayindadegil() {
    $("div.clb-post-meta").html("Talebiniz Değerlendiriliyor.");

}
function teklifverilmedi() {
    $("div.clb-post-meta").html("Henüz Teklif Almadınız, Sizin için en iyi teklifler hazırlanıyor.");

    $(".hizmetdurum").html($('#sozlesmebilgi'));
    $('#sozlesmebilgi').css({ 'position': 'static', 'width': '100%', "display": 'inline-block' });
}

function sozlesmehazirlaniyor() {
    $("div.clb-post-meta").html("    İş ortağımızdan hizmet teyidi alıyoruz.Kısa süre sonra sözleşmenizi ileteceğiz.");

    $(".hizmetdurum").html($('#sozlesmebilgi'));
    $('#sozlesmebilgi').css({ 'position': 'static', 'width': '100%', "display": 'inline-block' });
 }

function OnayAliniyor() {

     $("div.clb-post-meta").html("İş ortağımızdan hizmet teyidi alıyoruz.Kısa süre sonra sözleşmenizi ileteceğiz.");

}

function OnOdemeAlindi() {
    $("div.clb-post-meta").html("Ön Ödemeniz Alındı, Kalan Ödemeyi Şimdi veya Hizmetin Başladığı gün yapabilirsiniz.");

      
    $(".hizmetdurum").html($('#OnOdemeAlindiBilgi'));
    $('#OnOdemeAlindiBilgi').css({ 'position': 'static', 'width': '100%', "display": 'inline-block' });
}
function sozlesmehazir() {
    
    $("div.clb-post-meta").html("Ödeme yapmanız gerekiyor.Sözleşmeniz Hazırlanmıştır.");

    $(".hizmetdurum").html($('#sozlesmehazirbilgi'));
    $('#sozlesmehazirbilgi').css({ 'position': 'static', 'width': '100%', "display": 'inline-block' });

}
function yenidenboyutla(talepid) {

    setTimeout(function () {
        $("#taleplistesi").slideUp();
        $("#sayfabaslik").html(talepid + " No'lu Talebiniz.");
         
        $("#geridon").show();
        $("#bekleyin").slideUp();
        $("#taleplistesi").css("opacity", "1");

        setTimeout(function () {
            var baglantidurumu = $("#divacentateklif").attr("data-state");
            if (baglantidurumu == "yes") {
                $("#divacentateklif").attr("data-state", "");
            }
            else {
                //$(".box-inn-sp").html("<br><center>Bağlantı Hatası</center><br>");
            }
        }, 1000)
    }, 10);


    setTimeout(function () {
        $("#thumblar").html("");
        $("#divacentateklif > img").addClass("icresim");
        $("#divacentateklif p > img").addClass("icresim");
        $("#divacentateklif table > img").addClass("icresim");
        $("#divacentateklif td > img").addClass("icresim");

        $(".htmlcolmd12 > img").addClass("icresim");
        $(".icresim").each(function () {
            var imgsrc = this.src;
            $("#thumblar").append("<img class='miniresim' src='" + imgsrc + "' height='100' width='100' />");
        });

        $("#thumblar").show();
        ma5gallery('#thumblar .miniresim');
    }
        , 10)
}

function ma5showActive(isim, id, tumb) {
    $('#resimisim').css("display", "block");

    $('body').addClass('ma5-in').append('<div class="ma5-imgbox"></div>');
    setTimeout(function () { $('.ma5-imgbox.ma5-previous').remove(); $('body').removeClass('ma5-in'); }, 300);
    var last = $('.ma5-imgbox').last();
    $('.resimolcusu').css("height", "100px");
    $('.resimislem').css("display", "none");
    $('.resimbaslik').css("display", "none");
    $('#resimisim').css("display", "block");
    $('#thumblar').removeClass("col-xs-6 col-sm-4 col-md-2 col-lg-2");
    $('.ma5-active img').clone().attr('src', $(this).attr("src")).addClass('ma5-clone').appendTo(last);
    var sayi = +(new Date).getTime();
    $('.ma5-imgbox').html("<img id='resimdonder' data-name='" + isim + "' data-id='" + tumb + "' data-url='" + id + "' src='" + isim + "?" + sayi + "' width='100'/>");
    $('#resimadi').html(id);
}


$(document).on('click', '.ma5-imgbox', function () {


    $('#resimisim').fadeToggle();


});

function ma5hideActive() {
}
function kapatslayt() {
    $('#resimisim').css("display", "none");
    $("#thumblar").removeClass("aktifthumb");

    $(".nesne").removeClass('ma5-control');
    $("#kontrolculer").hide();
    $('.ma5-imgbox').addClass('ma5-out');
    var content = $(".ma5-bg").contents();
    $('.ma5-gallery').addClass('ma5-out');
    setTimeout(function () {
        $('.ma5-gallery #thumblar').removeClass('ma5-active');
        $('.ma5-gallery').removeClass('ma5-control').removeClass('ma5-out');
        $(".ma5-bg").replaceWith(content);
        $('#resimisim').css("display", "none");



    }, 100);
    setTimeout(function () {
        $('.ma5-imgbox').remove();
        $('.ma5-control #thumblar').removeClass('ma5-active');
        $('body').removeClass('ma5-gallery-active')
    }, 100);

}

function ma5gallery(img) {
    $(img).on('touch click', function () {
        $("#thumblar").show();
        $('#resimisim').css("display", "block");
        $('#thumblar').addClass("aktifthumb");

        if (!$('.ma5-imgbox').hasClass('ma5-out') && !$('body').hasClass('ma5-in')) {
            if ($(this).parent().parent().hasClass('ma5-gallery') || $(this).parent().parent().hasClass('ma5-bg')) {
                if (!$(this).parent().hasClass('ma5-active')) {
                    $('.ma5-gallery #thumblar').removeClass('ma5-active');
                    $(this).parent().addClass('ma5-active');
                    if (!$('body').hasClass('ma5-gallery-active')) {
                        $('body').addClass('ma5-gallery-active');
                        $(this).parent().parent().find('#thumblar').wrapAll('<div class="ma5-bg" />');
                    }




                    var fThis = $(this);
                    setTimeout(function () {
                        $(fThis).parent().parent().parent().addClass('ma5-control')
                    }, 100);

                }
            } else {
                //single mode
                var fThis = $(this);


                $('body').append('<div class="ma5-imgbox ma5-animated"></div>');
                setTimeout(function () { $('.ma5-imgbox').removeClass('ma5-animated') }, 300);
                var last = $('.ma5-imgbox').last();
                $(this).clone().attr('src', $(fThis).attr("src")).addClass('ma5-clone').appendTo(last);

                $('.ma5-imgbox').html("<img src=" + $(fThis).attr('src') + " width='100'/>");
                $('#resimadi').html(id);

                $('.ma5-imgbox').on('touch click', function () {
                    if (!$('.ma5-imgbox').hasClass('ma5-animated')) {
                        $(this).addClass('ma5-out');
                        var thisobject = $(this);
                        setTimeout(function () { thisobject.remove(); fThis.parent() }, 100);
                    }
                });
            }
        }
    });

};


function odemebildirildi() {

    $("#kapsayici").css("background", "url('https://Fırsat.com/images/okey.gif') center center no-repeat #fff");


    setTimeout(function () {
        $("#kapsayici").slideUp();
        $("#taleplistesi").slideDown();
        $("#talepdetay").html("");
        $("#sayfabaslik").html("Talep Listesi.");

    }, 1000)
}