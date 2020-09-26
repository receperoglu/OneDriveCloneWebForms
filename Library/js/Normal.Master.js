var CurrentDomain = "http://localhost";
var notifications = $.connection.TetikHub;

setTimeout(function () {

   


    if ($.cookie("memid")) {


        
            
            var bildirims = 0;

            var ServicesGate = CurrentDomain+ "/tr/NotificationServices.ashx";
            $.ajax({
                type: "POST",
                url: ServicesGate,
                contentType: "text",
                async: true,
                success: function (datas) {
                    var sayac = 0;
                    $(".ChatFirstIcon").fadeIn();

                    $.each(datas, function (i, SD) {
                        var sinif = "";
                        if (SD.tur == "teklif") {

                            sinif = "newnoti";
                        }
                        else {
                            sinif = "talep";
                        }
                        if (SD.databs == "-404") {
                            //Bildirim YOK
                        }
                        if (SD.databs == "-300") {
                            var ResRequest = "<li class='" + sinif + "' data-tur='" + SD.tur + "' data-bs='" + SD.apidurum + "' data-requestkey='" + SD.apitalepid +
                                "'><a href='" + CurrentDomain + "/talepdetay/" + SD.apitalepid + "' class='clearfix'> <span class='ni w_bg_" + SD.renk + "'>" +
                                "<i class='fa fa-bullhorn'></i></span> <span class='notification-message'>Sözleşmeniz Hazır Ödeme Yapınız </span></a> </li>";
                            $(".bildirimlistclass").append(ResRequest);
                            bildirims++;
                            sayac++;

                            LastDataId = SD.apitalepid;
                            NotificationAreaColored(bildirims, LastDataId);
                        }
                        else {
                            var ResRequest = "<li class='" + sinif + "' data-tur='" + SD.tur + "' data-bs='" + SD.apidurum + "' data-requestkey='" + SD.apitalepid +
                                "'><a href='" + CurrentDomain + "/talepdetay/" + SD.apitalepid + "' class='clearfix'> <span class='ni w_bg_" + SD.renk + "'>" +
                                "<i class='fa fa-bullhorn'></i></span> <span class='notification-message'>" + SD.apibaslik + " </span></a> </li>";
                            $(".bildirimlistclass").append(ResRequest);
                            bildirims++;
                            sayac++;

                            LastDataId = SD.apitalepid;
                            NotificationAreaColored(bildirims, LastDataId);
                        }


                    });
                    if (sayac == 0) {

                        $(".noty-bubble").css("background-color", "transparent");

                    }
                    else {
                        $(".NotificationServicesTotal").css("background-color", "red");

                    }
                },

                error: function (error) {
                    console.log(error);
                }
            });

        }
    

setTimeout(function () { 
    $("*[data-page='" + $("body").attr("data-currentpage") + "']").addClass("active");     
}, 200)


notifications.client.karsidanmesaj = function (mesaj, ad, userid, adminid) {
    var myDate = new Date();
    var displayDate = myDate.getMonth() + '/' + myDate.getDate() + '/' + myDate.getFullYear() + ' ' + formatAMPM(myDate);
    Karsi(mesaj, displayDate, ad);
    $("#form1").attr("data-admin", adminid);
}
     

$(document).on("click", "#DovizYenileNOW", function () {
    $("#DovizYenileNOW").hide();
    $("#DovizBekle").show();

    DovizYeniden();

});
function NotificationAreaColored(bs, dl) {
    if (bs == "0") {
        $(".NotificationServicesTotal").css("background-color", "fff !important");
    } else {
        $(".NotificationServicesTotal").css("background-color", "ff5252");
        $(".NotificationServicesTotal").html(bs);
    }
    $("body").attr("data-notiftotal", bs);
    $("body").attr("data-lastrequestid", dl);
}
function PinkColor() {
    setTimeout(function () {
        $(".kirmizi").css("background-color", "#ff8a80");
        setTimeout(function () {
            RedColor();
        }, 1000)
    }, 1000)
}

function RedColor() {
    setTimeout(function () {
        $(".kirmizi").css("background-color", "red");
        setTimeout(function () {
            PinkColor();
        }, 1000);
    })
}
//DovizYeniden();
function DovizYeniden() {

    var HizmetURL = "/Services/Dovizler.ashx";
    $.ajax({
        type: "GET", url: HizmetURL,
        contentType: "text",
        async: true,
        success: function (datas) {

            $("#dovizalani").html(datas);
            $("#DovizYenileNOW").show();
            $("#DovizBekle").hide();
        },
        error: function (error) {
            alert("Merkez Bankası Döviz Hatası");
        }
    });
}
function Bildirim(baslik, bildirimadi) {
    if (!window.Notification) {
        console.log("Tarayıcı Desteklemiyor");
        return;
    }
    if (Notification.permission !== "granted")
        Notification.requestPermission();
    var notification = new Notification(baslik, {
        icon: "logo/mobillogo.png",
        body: bildirimadi
    })
    notification.onclick = function () {
        document.getElementById("kullanicieposta").click();
    }
}

//Bildirim("Yeni Teklif Aldınız", "Okumak için Tıklayın")
    $(document).on("click", "span#cikisspan", function () {
        document.getElementById("CikisYap").click();
    });
   
    $(document).on("click", "div.dildegisimkapat", function () {
        $(".top-search-bar").removeClass("search-bar-toggle");
    });
});


 
$(document).on("click", "#chatalt", function () {
    $(".box-body").slideUp();
    $(".box-footer").slideUp();
    $("#chatalt").hide();
    $("#chatust").show();
    $("#chatt").hide();
    // $("#chaticon").show();
    $("#chatbaslik").hide();


});
$(document).on("click", ".ChatFirstIcon", function () {
    $(".box-body").slideDown();
    $(".box-footer").slideDown();
    $("#chatalt").show();
    $("#chatust").hide();
    $("#chatt").show();
    $("#chatbaslik").show();

})

 


$(document).on("click", "#chatalt", function () {
    $(".box-body").slideUp();
    $(".box-footer").slideUp();
    $("#chatalt").hide();
    $("#chatust").show();
    $("#chatt").hide();
    // $("#chaticon").show();
    $("#chatbaslik").hide();

    $.cookie('chatstatus', 'B', { expires: +5, path: "https://www.Fırsat.com/taleplerim" });

});
$(document).on("click", "#destekchat", function () {
    $(".box-body").slideDown();
    $(".box-footer").slideDown();
    $("#chatalt").show();
    $("#chatust").hide();
    $("#chatt").show();
    $("#chatbaslik").show();

    $.cookie('chatstatus', 'A', { expires: +5, path: "https://www.Fırsat.com/taleplerim" });
})

$('#mesaj').on('keydown', function (e) {
    if (e.which == 13) {
        $(".gonder").click();
        e.preventDefault();
    }
});

function CloseMobileMenu() {

    $("#mobilenav").removeClass("visible");
}


$(document).on("click", ".desktop-hamburger", function () {

    $("#mobilenav").addClass("visible")
})

$(document).on("click", ".Kisi", function () {
    var userid = $(this).attr("data-userid");
    var connid = $(this).attr("data-connid");
    $("#User").val(userid);
    $("#connid").val(connid);
    $(".box-title").html($(this).html());
    $(".Kisi").show();
    $(this).hide();
    $(".box-body").html("");
})



$(document).on("click", ".gonder", function () {
    var mesajuzunluk = $("#mesaj").val();


    var myDate = new Date();
    var displayDate = myDate.getMonth() + '/' + myDate.getDate() + '/' + myDate.getFullYear() + ' ' + formatAMPM(myDate);

    notifications.server.adminemesajyolla($.cookie("memid"), $("#kullanicieposta").html(), mesajuzunluk);

    Siz($("#mesaj").val(), displayDate);
    $("#mesaj").val("");


});
Konusma($.cookie("memid"), $("#kullanicieposta").html());

function Konusma(userid, isim) {
    var HizmetURL = "/Services/Konusma.ashx?userid=" + userid;
    $.ajax({
        type: "GET", url: HizmetURL,
        contentType: "text",
        async: true,
        success: function (datas) {
            var veriler = JSON.parse(datas);
            $(".box-body").html("");
            $.each(veriler, function (i, item) {

                var kim = item.kim;
                var mesaj = item.mesaj;
                var tarih = item.saat;

                if (kim == "Admin") {
                    Karsi(mesaj, tarih, "Destek");
                } else {

                    Siz(mesaj, tarih);

                }

            })

            //document.getElementById('konusmadiv').scrollIntoView() = document.getElementById('konusmadiv').scrollIntoView();



        },
        error: function (error) {
            alert(error);
        }
    });
}


function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 24 ? 'pm' : 'am';
    hours = hours % 24;
    hours = hours ? hours : 24;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}
function Karsi(mesaj, zaman, isim) {
    var Konusma = "<div class='direct-chat-msg right'><div class='direct-chat-info clearfix'><span class='direct-chat-name pull-right'>Destek</span><span class='direct-chat-timestamp pull-left'>" + zaman + "</span></div><img class='direct-chat-img' src='../Library/images/chat.png' alt='' /><div class='direct-chat-text'>" + mesaj + "</div></div>";
    $(".box-body").append(Konusma);
    ChatPencere();
}

function Siz(mesaj, zaman) {
    var Konusma = " <div class='direct-chat-msg left'><div class='direct-chat-info clearfix'><span class='direct-chat-name pull-left'>Siz</span><span class='direct-chat-timestamp pull-right'>" + zaman + "</span></div><img class='direct-chat-img' src='../Library/images/chat.png' alt='' /><div class='direct-chat-text'>" + mesaj + "</div></div>";
    $(".box-body").append(Konusma);
    ChatPencere();

}

function ChatPencere() {
    var KonusmaYukseklik = $(".box-body").height();
    if (KonusmaYukseklik > 350) {
        $(".box-body").addClass("Yukselik350");
    }

    //document.getElementById('konusmadiv').scrollIntoView() = document.getElementById('konusmadiv').scrollIntoView();
     
}
 
