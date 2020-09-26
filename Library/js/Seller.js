$(function () {

    var Claims = "";
    var Contracts = "";
    var ClaimCount = 0;
    var ContractCount = 0;
    var bs = 0;
    var SellerId = $("#acentaid").html();
    var lang = $.cookie('dil');

    var Url = "Gate/AcentaUstBildirim.ashx?dil=" + lang + "&userid=" + SellerId;

    $.ajax({
        type: "GET", url: Url, async: true,

        success: function (datas) {
             try {
                $.each(datas, function (i, item) {
                    var tur = item.Durum;
                     var Tur = item.Tur;
                    var ClaimId = item.ClaimId;
                    var BidId = item.BidId;
                    var DivId = item.DivId;
                    var UserId = item.UserId;
                    var Renk = item.Renk;
                    var BaslikTR = item.BaslikTR;
                    var BaslikAR = item.BaslikAR;
                    var BaslikEN = item.BaslikEN;
                    var TeklifTR = item.TeklifTR;
                    var TeklifEN = item.TeklifEN;
                    var TeklifAR = item.TeklifAR;
                    var CreatedDate = item.CreatedDate;
                    var Amount = item.Amount;
                    var Currency = item.Currency;
                    var Durum = item.Durum;
                    var Published = item.Published;


                    var Teklif0 = "<div class='col-md-12 col-xs-12' > <div class='col-xs-1 yukseklik57 pad0 '> " +
                        "<i style='color:" + Renk + "'  class='fa fa-2x fa-building-o'></i> </div> <div class='col-xs-11'>";
                    var TeklifStart = "<li  data-teklif='" + DivId +
                        "' data-currency='" + Currency +
                        "' data-published='" + Published +
                        "'  class='" + tur +
                        "' data-acenta='" + SellerId +
                        "'  data-UserId='" + UserId +
                        "'  data-BidId='" + BidId +
                        "' data-ClaimId='" + ClaimId + "'>" + Teklif0;
                    var TeklifEnd = "</span> </div> </div></li>";
                    var tklf = "<h5>" + Tur + "</h5><small><b>" + CreatedDate + "</b> </small><span> " +
                        "<span data-lang='tr' class='titleoption' >" + BaslikTR + "</span>" +
                        "<span data-lang='en'  class='titleoption' >" + BaslikEN + "</span>" +
                        "<span data-lang='ar'  class='titleoption' >" + BaslikAR + +"</span>" +
                        "</span>";


                    if (tur == "yenitalep") {
                         var turkcetalep = "<div data-name='tr' data-lang='tr' class='talepmusteri titleoption tr'>" + BaslikTR + "</br>" + TeklifTR + "</div>";
                        var arapcatalep = "<div dir='rtl'  data-name='ar' data-lang='ar'  class='talepmusteri titleoption ar'>" + BaslikAR + "</br>" + TeklifAR + "</div>";
                        var ingilizcetalep = "<div  data-name='en' data-lang='en'  class='talepmusteri titleoption en'>" + BaslikEN + "</br>" + TeklifEN + "</div>";
                        Claims += "<div data-talep='" + ClaimId + "' class='panel musteritalep panel-success'><div class='teklifli' id='teklifli" + ClaimId + "'><div  class='panel-heading'>" +
                            " <h3 class='panel-title'>Yeni Talep</h3> </div><div data-Id='" + ClaimId + "' class='panel-body teklif'>" + turkcetalep + arapcatalep + ingilizcetalep +
                            "<hr><div class='col-md-6 col-xs-6'><i class='paratarih btn btn-outline-success fa fa-money'></i><span class='para'>" + Amount + "</span>" +
                            "<i class='paratarih btn btn-outline-danger fa fa-calendar takvim'></i> " + CreatedDate + "  </div><div class='col-md-6 col-xs-6 text-right'>" +
                            "<span data-sellerid='" +
                            SellerId + "' data-userid='" +
                            UserId + "' data-claimid='" +
                            ClaimId + "' data-published='" +
                            Published + "' data-currency='" +
                            Currency + "' data-teklif='teklifli" +
                            ClaimId +
                            "'  class='yenitalep BidCreateBtn'>Teklif Ver</span></div></div></div></div>";
                        ClaimCount++;
                    }
                    else {
                        Contracts += "<div class='col-md-12 col-xs-12 sozlesme" + BidId + " bottom5px'>" +
                            "<span data-lang='tr' class='' >" + BaslikTR + "</span>" +
                            "</span> <hr><div class='col-md-12 col-xs-12'>" +
                            "<div class='col-md-6 col-xs-6'><i class='margR5px btn btn-outline-success fa fa-money'></i>" +
                            Amount +
                            "</div><div class='col-md-6 col-xs-6'><div data-UserId='" +
                            UserId + "' data-ClaimId='" +
                            ClaimId + "' data-BidId='" +
                            BidId +
                            "' data-name='" +
                            SellerId + "' class='sozlesme btn btn-success pull-right'>Sözleşme Yolla</div></div></div></div>";
                        ContractCount++;
                    }

                    $("#newbildirim").append(TeklifStart + tklf + TeklifEnd);
                    bs++;
                });
                 $(".ContractDiv").html(Contracts);
                $(".ClaimDiv").html(Claims);

            }
            catch{


            }






            setTimeout(function () {
                if (ClaimCount == 0) {
                    $("#talepalani").hide();
                    $("#acentalani").addClass("col-md-12").removeClass("col-md-4 col-lg-4");
                }
                if (ContractCount == 0) {
                    $("#talepalani").addClass("col-md-12").addClass("col-lg-12");
                    //  SendNowDataDetail.Attributes["class"] = "col-md-12 col-lg-12";
                    $("#acentalani").hide();
                }
                $(".titleoption").hide();
                //$(".titleoption[data-lang='" + lang + "']").show();
                $("span#bildirimsayi").html(bs);
                $(".titleoption").hide();

                $(".titleoption[data-lang='" + lang + "']").show();
                ToggleNotificationDiv();

            }, 1000)



        },
        error: function (error) {
            console.log(error)
        }
    });

   
    $(document).on('click', '.sozlesme', function () {
        var bu = $(this);
        var teklifid = bu.attr("data-BidId");
        var talepid = bu.attr("data-claimid");
        var userid = bu.attr("data-UserId");
        var memid = $.cookie("memid");
        var dil = $.cookie("dil");
        var adres = talepid + "&UserId=" + userid + "&SellerId=" + memid + "&BidId=" + teklifid + "&Lang=" + dil;
        var url = "sozlesmehazirla.aspx?ClaimId=" + adres;
        $("#TeklifFrame").attr("src", url);
        $("#TeklifFrame").show();
        $("#exampleModal").modal("show");
        $("#enbasadon").show();
    });
    $(document).on('click', '.yenitalep', function () {
      
        var teklif = $(this);
        var teklifid = teklif.attr("data-claimid");
        TeklifYayindami(teklifid);
        $("#talepalani").hide();
        $("#sozlesmeframe").show();
        var dil = $.cookie("dil");
        var HizmetURL = teklif.attr("data-claimid") + "&published=" + teklif.attr("data-published") +
       "&SellerId=" + teklif.attr("data-SellerId") + "&UserId=" + teklif.attr("data-UserId") +
       "&Currency=" + teklif.attr("data-Currency");
        $("#TeklifFrame").attr("src", "NowSend.aspx?lang=" + dil + "&claimid=" + HizmetURL);
        $("#TeklifFrame").show();
        $("#exampleModal").modal("show");
    });
   
    $(document).on("click", "#enbasadon", function () {
        $("#DocumentContent").show();
        $("#TeklifFrame").attr("src", "../Library/images/yukleme.gif");
         $("#TeklifFrame").hide();
        $("#TeklifFrame").hide();
        $("#exampleModal").modal("hide")
        var anasayfa = $("#InputThis").val();

        if (anasayfa == "yes") {
            $("#talepalani").show();
            $("#acentalani").show();
        } else {
            $("#DocumentContent").show();
            $("#talepalani").hide();
            $("#acentalani").hide();
        }

        $("#TeklifDetayFrame").hide();

        if (parseInt($("#talepsayisi").text(), 10) == 0) {
        }
        else {
            $("#taleplerListesi").slideDown();

        }
    });
    $(document).on('click', '.talepdil', function () {
        $(".talepmusteri").hide();
        var dil = $(this).attr("data-lang");
        console.log(dil);
        $(".talepmusteri[data-name='" + dil + "']").show();
    });
    function TeklifYayindami(teklifid) {
        $.post("Gate/TeklifYayindaMi.ashx?teklifid=" + teklifid,
            function (data) {
                if (data == "1") { }
                else {
                    $.gritter.add({
                        title: 'Üzgünüz',
                        text: 'Teklif Yayından Kaldırıldı.',
                        class_name: 'with-icon check-circle danger'
                    });
                    $(".teklifver").text("Teklif Ver");
                    $('#SendNowDataDetail').animate({ "bottom": '-900px' });
                    $('#SendNowDataDetail').fadeOut();
                    $(".teklifli").fadeIn();
                }

            });


    }
    var notifications = $.connection.TetikHub;
    notifications.client.karsidanmesaj = function (mesaj, ad, userid, adminid) {
        var myDate = new Date();
        var displayDate = myDate.getMonth() + '/' + myDate.getDate() + '/' + myDate.getFullYear() + ' ' + formatAMPM(myDate);
        Karsi(mesaj, displayDate, ad);
        $("#form1").attr("data-admin", adminid);
    }
    $(document).on("click", ".Kisi", function () {
        var userid = $(this).attr("data-userid");
        var connid = $(this).attr("data-connid");
        $("#User").val(userid);
        $("#connid").val(connid);
        $("h3.box-title").html($(this).html());
        $(".Kisi").show();
        $(this).hide();
        $(".box-body").html("");
    })
    $(document).on("click", "#chatalt", function () {
        $(".box-body").slideUp();
        $(".box-footer").slideUp();
        $("#chatalt").hide();
        $("#chatust").show();
        $("#chatt").hide();
        $("#chaticon").show();
        $("#chatbaslik").hide();

        $.cookie('chatstatus', 'B', { expires: +5, path: domain });

    });
    $(document).on("click", "#chaticon", function () {
        $(".box-body").slideDown();
        $(".box-footer").slideDown();
        $("#chatalt").show();
        $("#chatust").hide();
        $("#chatt").show();
        $("#chatbaslik").show();

        $.cookie('chatstatus', 'A', { expires: +5, path: domain });

    });
    setTimeout(function () {
        Konusma($("#acentaid").html(), $("#Acentaismi").html());
        $(".talepmusteri").hide();
        var dil = $.cookie('dil');
        $(".talepmusteri[data-name=" + dil + "]").show();
        var anasayfa = $("#InputThis").val();
        if (anasayfa == "yes") {
            $("#talepalani").show();
            $("#acentalani").show();
        } else {
            $("#DocumentContent").show();
            $("#talepalani").hide();
            $("#acentalani").hide();
        }
        try {
            var ContactInfo = $.cookie("PlaceNfo");
            $.each(JSON.parse(ContactInfo), function (i, item) {
                $("#Aemail").html(item.mail);
                $("address#AAdres").html(item.adres);
                $("#Atel1").html(item.tel1);
                $("#Atel2").html(item.tel2);
                $("#Acentaismi").html(item.unvan);
            });
            var chatstatus = $.cookie("chatstatus")
            if (chatstatus == "B") {
                $(".box-body").slideUp();
                $(".box-footer").slideUp();
                $("#chatbaslik").hide();
                $("#chatust").show();
                $("#chaticon").show();

            }
        }
        catch (err) {
            $.cookie('chatstatus', 'A', { expires: +5, path: domain });
            console.log("Üye bilgileri hatalı" + err);
        }

    }, 50)
    $(document).on("click", ".gonder", function () {
        var mesajuzunluk = $("#mesaj").val();


        var myDate = new Date();
        var displayDate = myDate.getMonth() + '/' + myDate.getDate() + '/' + myDate.getFullYear() + ' ' + formatAMPM(myDate);

        notifications.server.adminemesajyolla($("#acentaid").html(), $("#Acentaismi").html(), mesajuzunluk);

        Siz($("#mesaj").val(), displayDate);
        $("#mesaj").val("");


    });
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
        var Konusma = " <div class='direct-chat-msg right'><div class='direct-chat-info clearfix'><span class='direct-chat-name pull-right'>" + isim + "</span><span class='direct-chat-timestamp pull-left'>" + zaman + "</span></div><img class='direct-chat-img' src='../Acenta/css/chat.png' alt='' /><div class='direct-chat-text'>" + mesaj + "</div></div>";
        $(".box-body").append(Konusma);
        ChatPencere();
    }
    function Siz(mesaj, zaman) {
        var Konusma = " <div class='direct-chat-msg left'><div class='direct-chat-info clearfix'><span class='direct-chat-name pull-left'>Siz</span><span class='direct-chat-timestamp pull-left'>" + zaman + "</span></div><img class='direct-chat-img' src='../Acenta/css/chat.png' alt='' /><div class='direct-chat-text'>" + mesaj + "</div></div>";
        $(".box-body").append(Konusma);
        ChatPencere();

    }
    function ChatPencere() {
        var KonusmaYukseklik = $(".box-body").height();
        if (KonusmaYukseklik > 400) {
            $(".box-body").addClass("Yukselik400");
        }

        document.getElementById('konusmadiv').scrollTop = document.getElementById('konusmadiv').scrollHeight;


    }
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
                        Karsi(mesaj, tarih, isim);
                    } else {

                        Siz(mesaj, tarih);

                    }

                })
                document.getElementById('konusmadiv').scrollTop = document.getElementById('konusmadiv').scrollHeight


            },
            error: function (error) {
                alert(error);
            }
        });
    }
});


var domain = "";
$.ajax({
    type: "GET", url: "../Services/GetDomain.ashx",
    contentType: "text",
    async: true,
    success: function (dat) {
        domain = dat + "/Seller/";
    },
    error: function (error) {
        alert("boş data");
    }
});


$(document).on("click", ".panel-heading", function () {
    $(this).closest(".panel-primary").find(".panel-body").slideToggle();
});
$(document).on("click", ".panel-heading", function () {
    $(this).closest(".panel-success").find(".panel-body").slideToggle();
});
function sozlesmedetaykapat() {
    document.getElementById("enbasadon").click();
}
function cikisyap() {
    document.getElementById("LoggingOut").click();
    console.log("düğmeye basıldı");
}
$(document).on("click", "#DovizYenileNOW", function () {
    $("#DovizYenileNOW").hide();
    $("#DovizBekle").show();
    DovizYeniden();
});

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
function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}
function TalepKaldir(TalepId) {

    var Taleps = "div.musteritalep[data-talep='" + TalepId + "']";
    $(Taleps).hide();
     $(".yenitalep[data-id=" + TalepId + "]").hide();
    var bildirimler = parseInt($("#bildirimsayi").text(), 10) - 1;
    if (bildirimler == 0) {
        $("span#bildirimsayi").text("");
        $("#talepalani").hide();
    } else {
        $("span#bildirimsayi").text(bildirimler);

    }
    setTimeout(function () {
        $.gritter.add({ title: 'İşlem Tamamlandı', text: 'Teklifiniz İletildi, Değerlendirme işleminden sonra yayına alınacaktır.', class_name: 'with-icon check-circle info' });


    }, 2000)
}

function CloseSettings() {
    $("#enbasadon").click();
}



function OpenInNewWindow() {

    $("#exampleModal").modal("hide");
    $("#TeklifFrame").show();
    var CurrentModalUrl = $("#TeklifFrame").attr("src");

    window.open(CurrentModalUrl, '_blank');
}
function ChangeModalSize() {

    if ($("#exampleModal").hasClass("minimodal")) {
        $("#exampleModal").removeClass("minimodal").addClass("effect").addClass("pad0")
    }
    else {
        $("#exampleModal").addClass("minimodal").removeClass("effect")
    }

}
