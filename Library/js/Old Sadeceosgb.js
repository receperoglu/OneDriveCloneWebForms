
//$(document).on('click', '.fc-header-title', function () {
//    $('#calendar').css("width", "1px");
//    if ($('#calendar').hasClass('takvimhavada')) {
//        $('#calendar').removeClass('takvimhavada').fadeIn(500);
//        $('#calendar').css("width", "100%")
//        $('.fc-button-next').click()
//        $('.fc-button-prev').click()

//    }
//    else {
//        setTimeout(function () {
//            $('#calendar').addClass('takvimhavada');
//            $('#calendar').css("width", "100%")
//            setTimeout(function () {
//                $('.fc-button-next').click()
//                $('.fc-button-prev').click()

//            }, 200)
//        }, 10)

//    }

//});
setTimeout(function () {
    $("#anamenusol li:last-child").hide();
}, 5)
//$("[data-spinner]").live("dblclick", function () {
//    var id = $(this).attr("id");
//     $("#bilgisayfasi").attr("src", "firmalar.aspx?id=" + id + "")

//});
$(document).on('click', '#Sonuc', function () {
    var id = $("#secilifirma").html();
    var firmaadi = $("#secilifirmaadi").html();
    $("#YetkiliEklemeSayfasi").attr("src", "YetkiliPopupORJ.aspx?id=" + id + "&ad=" + firmaadi + "")
    $('#YetkiliEkle').modal('show');
});
$(document).on('click', '#Olustur', function () {
    OlayEkleS();
    $('#kayitalani').slideUp();
    $('.gunkenarlik').addClass("gunkenarlikProcessing");
    $("#secilisaat").text($("#saatler option:selected").val());
    $('#Olustur').html("Lütfen Bekleyin");
    $('#takvim').css("opacity", "0.6");
    $('#beklemeislemi').show();
    var pers = $('#personel').html();
    var yenisa = +(new Date).getTime();
    var okey = "<img src='okey.gif?" + yenisa + "' style='width:50px;' >";
    var notification = new NotificationFx({
        message: '' + okey + '<span>Kaydetme Başarılı <b> ' + pers + '</b> Bilgi Verildi.</span>',
        layout: 'bar',
        effect: 'exploader',
        ttl: 5000,
        type: 'error', // notice, warning or error

    });
    notification.show();
    this.disabled = true;
    setTimeout(eklemebasarili, 2000);
});
function eklemebasarili() {
    $('#beklemeislemi').hide();
    var yenisa = +(new Date).getTime();
    $('#okey').html("<img src='okey.gif?" + yenisa + "' style='width:100%;' ><br><br>");
    setTimeout(restartobject, 1000);
    $('#yenidengetir').click();
}
function restartobject() {
    $('.gunkenarlik').removeClass("gunkenarlikProcessing");
    $('#beklemeislemi').hide();
    var yenisa = +(new Date).getTime();
    $('#okey').html("");
    $('#Olustur').html("Kaydet");
    $('#kayitalani').slideDown();
    $('#takvim').css("opacity", "1");
    $('#kayitalani').slideDown();
    document.getElementById("LayoutRight").style.width = "0px";
}
function YeniEmirKontrol() {
    $.ajax({
        url: "post/EventCheckPersonelForNotif.ashx",
        type: "POST",
        success: function (result) {
            if (result == "0") {
            }
            else {
                Bildirim('İş Emri Alındı', result)

            }
            setTimeout(function () { YenidenEmirKontrol() }, 2000);
        },
        error: function (err) {
            alert(err.statusText);
        }
    });
}


function Bildirim(baslik, icerik) {
    if (!window.Notification) {
        console.log("Tarayıcı Desteklemiyor");
        return;
    }
    if (Notification.permission !== "granted")
        Notification.requestPermission();
    var notification = new Notification(baslik, {
        icon: "logo/mobillogo.png",
        body: icerik
    })
    notification.onclick = function () {
        window.open("lala");
    }
}
function OlayEkleTakvim(baslik, basla, bitir, benzersizid, renk) {
    var eventObject = {
        title: baslik,
        start: basla,
        end: bitir,
        url: benzersizid,
        color: renk,
    };
    $('#calendar').fullCalendar('renderEvent', eventObject, true);
    return eventObject;
}
function OlayEkleS() {
    $.ajax({
        url: "post/EventAdd.ashx",
        type: "POST",
        data: {
            "personel": $("#Spersonel").html(),
            "firma": $("#Sfirma").html(),
            "tarih": $('.aktifgun').attr("data-date"),
            "saat": $("#saatler option:selected").val(),
            "baslik": "b",
            "durum": "0",
        },
        success: function (result) {
            $.ajax({
                url: "post/EventAll.ashx",
                type: "POST",
                data: {
                    "olaylar": "",
                },
                success: function (sonuc) {


                    setTimeout(

                        function yeniden() {

                            var bulunan = sonuc.indexOf("#");

                            var id = sonuc.substring(0, bulunan);
                            var renk = sonuc.substring(bulunan, sonuc.length)
                            $("#yeniolay").css("background-color", renk);

                            $("#yeniolay").attr("id", id);


                            var personel = $('#personel').html(); ////TAKVİMEKLE
                            var tarih = $('.aktifgun').attr("data-date");
                            var olaytarihsaat = tarih + "T" + $("#secilisaat").text();
                            var firma = $("#secilifirmaadi").html()
                            Bildirim('Randevu Yapıldı', ' ' + personel + ' Bilgi Verildi. ');
                            OlayEkleTakvim(personel, olaytarihsaat, olaytarihsaat, id, renk);





                        }







                        , 2000)












                },
                error: function (err) {
                    alert(err.statusText);

                }
            });








        },
        error: function (err) {
            alert(err.statusText);

        }
    });
}



$(document).on('click', '.popoveryakalama', function () {
    document.getElementById("LayoutRight").style.width = "0px";
    $("div").removeClass("aktifgun");

    $("td").removeClass("gunkenarlik");





    var olayid = $(this).attr("id");

    $("a").removeClass("seciligunumuz");

    $(this).addClass("seciligunumuz");



    $.ajax({
        url: "post/EventDetailPerson.ashx",
        type: "POST",
        data: {
            "personel": olayid,
        },
        success: function (result) {

            $('#randevudetaylari').html(result)
        },
        error: function (err) {
            alert(err.statusText);

        }
    });

});

$(document).on('click', '.PersDetail', function () {
    //$("#loading").show();
    //$("#loading").css('opacity', '1');               
    var id = $(this).attr("data-pk");
    $("#bilgisayfasi").attr("src", "DetayUzmanDuzenle.aspx?id=" + id + "")
    $("#popmodal").modal("show");



});











$(document).on('click', '.CorpDetail', function () {

    //$("#loading").show();
    //$("#loading").css('opacity', '1');

    var id = $(this).attr("data-pk");
    $("#bilgisayfasi").attr("src", "DetayUzmanDuzenle.aspx?id=" + id + "")
    $("#popmodal").modal("show");



});

$(document).on('click', '.gun', function () {
    $("#secilitarih").html($(this).attr("data-date"));
    $(".fc-day").removeClass("gunkenarlik");
    $("div").removeClass("aktifgun");
    $("a").removeClass("seciligunumuz");

    if ($(this).hasClass("aktifgun")) {

        $(this).removeClass("aktifgun");



        $(this).parent().parent().removeClass("gunkenarlik");
    }
    else {
        $(this).parent().parent().addClass("gunkenarlik");
        $(this).addClass("aktifgun");


        document.getElementById("LayoutRight").style.width = "0px";



        $.ajax({
            url: "post/EventDetailDay.ashx",
            type: "POST",
            data: {
                "tarih": $(this).attr("data-date"),
            },
            success: function (result) {
                if (result == "") {



                }
                else {
                    $('#randevudetaylari').html(result)


                }
            },
            error: function (err) {
                alert(err.statusText);

            }
        });



    }


});


$(document).on('click', '.ekle', function () {

    $("div").removeClass("aktifgun");



    $("a").removeClass("seciligunumuz");

    $("#secilitarih").html($(this).attr("data-date"));
    $(".fc-day").removeClass("gunkenarlik");
    $(".gun").removeClass("aktifgun");
    if ($(this).hasClass("aktifgun")) {

        $(this).removeClass("aktifgun");
        document.getElementById("LayoutRight").style.width = "0px";


        $(this).parent().parent().removeClass("gunkenarlik");
    }
    else {
        $(this).parent().parent().addClass("gunkenarlik");
        $(this).addClass("aktifgun");
        document.getElementById("LayoutRight").style.width = "300px";



    }








});






$(".kapatsimdi").live("click", function () {
    $('#popmodal').toggle();

});
$('#bildirimkapat').click(function () {
    $('#yaklasanlar').hide();
    $('#takvim').removeClass("col-md-8");
    $('#takvim').addClass("col-md-12");
    $(".fc-button-prev").trigger("click");
    $(".fc-button-next").trigger("click");



});




$(document).on('click', '.randevuiptalislem', function () {

    alert("Emin misiniz");

});