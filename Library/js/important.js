$(function () {

    var CurrentDomain = "http://receperoglu.net/";
 
    var bildirims = parseInt($("body").attr("data-notiftotal"));

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
    var notifications = $.connection.TetikHub;



    $.connection.hub.start({ transport: 'longPolling' }, function () {
        var Space = $.cookie("memid");
        notifications.server.firstgate(Space);
        console.log('connected');
    });

    $.connection.hub.reconnecting({ transport: 'longPolling' }, function () {
        notifyUserOfTryingToReconnect(); // Your function to notify user.
        console.log("reconnect");
    });

    $.connection.hub.error(function (error) {
        console.log(': ' + error);
        $("#teklifyap").slideUp();
        $("#ConnError").slideDown();

    });

    $.connection.hub.disconnected(function () {
        setTimeout(function () {
            $.connection.hub.start();
            console.log("connection closed again connected");
        }, 5000);
    });


    notifications.client.touch = function (bkbk, ststs) {
        $(".notifications-dropdown").show();
        $("#notifier").addClass("open");
        var ResRequest = "<li class='newnoti' data-durum='" + bkbk + "' data-requestkey='" + bkbk +
            "'>" + "<a href='" + CurrentDomain + "/talepdetay/" + bkbk + "' class='clearfix'> <span class='ni kirmizi'>" +
            "<i class='fa fa-bullhorn'></i></span> <span class='notification-message'>" + ststs + " </span></a> </li>";
        $(".bildirimlistclass").append(ResRequest);
        $("tr.talep*[data-id='" + bkbk + "']").css("background-color", "red")
        var current = parseInt($("body").attr("data-notiftotal")) + 1;
        NotificationAreaColored(current, ststs);
        PinkColor();

    }

    notifications.client.useryeniteklif = function (id, stst) {

        var talepbildirim = "li [data-tur='talep'][data-requestkey='" + id + "']";
        if ($(talepbildirim).length) {
            $(talepbildirim).hide();
            bildirims--;
        }
        var teklifbildirimtoplami = 1;
        var teklifbildirim = ".newnoti[data-requestkey='" + id + "']";
        if ($(teklifbildirim).length) {
            teklifbildirimtoplami = $(teklifbildirim).attr("data-bs");
            var iNum = parseInt(teklifbildirimtoplami)
            iNum++;
            $(teklifbildirim).attr("data-bs", iNum);
            $(teklifbildirim + "> a .notification-message").html("<span class='badge teklifadet'>" + iNum + "</span> Adet Teklif Aldınız");
        }
        else {
            var ResRequest = "<li class='newnoti' data-talepid='" + stst + "' data-bs='1' data-durum='" + id + "' data-requestkey='" + id +
                "'>" + "<a href='" + CurrentDomain + "/talepdetay/" + id + "' class='clearfix'> <span class='ni kirmizi'>" +
                "<i class='fa fa-bullhorn'></i></span> <span class='notification-message'><span class='badge teklifadet'>" + teklifbildirimtoplami + "</span> Yeni Teklif Aldınız </span></a> </li>";
            $(".bildirimlistclass").append(ResRequest);
        }

        $(".notifications-dropdown").show();


        var current = parseInt($("body").attr("data-notiftotal")) + 1;
        NotificationAreaColored(current, ststs);
        PinkColor();

    }
    notifications.client.oturumactiniz = function () {
        $.connection.hub.stop();
        $("html").css("text-align", "center !important");
        $("html").html("<h1 style='text-align:center'>Başka yerde Oturum Açtınız<h1>");
    }

    notifications.client.sozlesmehazir = function (id, stst) {
        console.log(id + stst);
        var talepbildirim = "li [data-tur='talep'][data-requestkey='" + id + "']";
        if ($(talepbildirim).length) {
            $(talepbildirim).hide();
            bildirims--;
        }
        var teklifbildirimtoplami = 1;
        var teklifbildirim = ".newnoti[data-requestkey='" + id + "']";
        if ($(teklifbildirim).length) {
            teklifbildirimtoplami = $(teklifbildirim).attr("data-bs");
            var iNum = parseInt(teklifbildirimtoplami)
            iNum++;
            $(teklifbildirim).attr("data-bs", iNum);
            $(teklifbildirim + "> a .notification-message").html("Sözleşmeniz geldi, ödeme yapınız");
        }
        else {
            var ResRequest = "<li class='newnoti' data-talepid='" + stst + "' data-bs='1' data-durum='" + id + "' data-requestkey='" + id +
                "'>" + "<a href='" + CurrentDomain + "/talepdetay/" + id + "' class='clearfix'> <span class='ni kirmizi'>" +
                "<i class='fa fa-bullhorn'></i></span> <span class='notification-message'>Sözleşmeniz geldi, ödeme yapınız</a> </li>";
            $(".bildirimlistclass").append(ResRequest);
        }

        $(".notifications-dropdown").show();
        $(".NotificationServicesTotal").css("background-color", "ff5252");


        bildirims++;
        PinkColor();
        NotificationAreaColored(bildirims, stst);

    }



});