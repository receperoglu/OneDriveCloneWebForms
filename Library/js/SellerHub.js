setTimeout(function () {    
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
var notifications = $.connection.TetikHub;
$.connection.hub.start().done(function () {
    var Space = $.cookie("memid");
    notifications.server.firstgate(Space);
});
function sescal() {

    var audio = new Audio('bildirim.mp3');
    audio.play();

}
notifications.client.musterikabuletti1 = function () {
    console.log("çalıştı");

}
notifications.client.teklifonaylandi = function (TeklifId, Talepid, UserId) {
    var audio = new Audio('bildirim.mp3');
    audio.play();
    var TeklifStart = "<li data-teklif='+ DivId + '  class='+Durum +' data-name='" + UserId + "' data-teklifid='" + TeklifId + "' data-Id='" + Talepid +
        "'><div  col-md-12 col-xs-12' > <div class='col-xs-1'> <i style='color:Red'" +
        " class='fa fa-2x fa-building-o'></i> </div> <div class='col-xs-11'>";
    var tklf = "<h5> Teklifiniz Yayında </h5>";
    var TeklifEnd = "</span></div></div></li>";

    $("ul#bildirimler").append(TeklifStart + tklf + TeklifEnd);

    bildirimler++;
}
notifications.client.acentayayenitalepbildir = function (yenitalepid) {
    var audio = new Audio(domain + '/admin/vaw/talep.m4a');
    audio.play();
    var bildirimler = parseInt($("#bildirimsayi").text(), 10);
    $(".btn-notice").addClass("alert-notice");
    var aid = $("#acentaid").html();
    var lang = $.cookie('dil');
    $.ajax({
        type: "POST", url: "Gate/AcentaUstBildirim.ashx?start=no&dil=" + lang + "&userid=" + aid + "&sonid=" + yenitalepid, contentType: "text", async: true,
        success: function (datas) {
            $.each(datas, function (i, item) {
                var tur = item.Durum;
                if (tur == "yenitalep") {
                    var Teklif0 = "<div class='col-md-12 col-xs-12' > <div class='col-xs-1'> <i style='color:" + item.Renk + "'  class='fa fa-2x fa-building-o'></i> </div> <div class='col-xs-11'>";
                    var TeklifStart = "<li data-teklif='" + item.DivId + "' data-pb='" + item.Pb + "' data-acentatalepid='" + item.YayinTalepId + "'  class='yenitalep' data-acenta='" + aid + "'  data-user='" + item.UserId + "'  data-teklifid='" + item.TeklifId + "' data-talep='" + item.Talepid + "'>" + Teklif0;
                    var TeklifEnd = "</span> </div> </div></li>";
                    var btc = "<span style='margin-left:10px;' class='para'>" + item.Butce + "</span>";
                    var tklf = "<h5>" + item.Tur + "</h5><small><b>" + item.Tarih + "</b> </small><span> " + item.Teklif + "</span>";
                    $("ul#bildirimler").append(TeklifStart + tklf + TeklifEnd);
                }
                if (tur == "sozlesme") {
                    var Teklif0 = "<div class='col-md-12 col-xs-12' > <div class='col-xs-1'> <i style='color:" + item.Renk + "'  class='fa fa-2x fa-building-o'></i> </div> <div class='col-xs-11'>";
                    var TeklifStart = "<li data-teklif='" + item.DivId + "' data-pb='" + item.Pb + "' data-acentatalepid='" + item.YayinTalepId + "'  class='sozlesme' data-name='" + aid + "'  data-userid='" + item.UserId + "'  data-teklifid='" + item.TeklifId + "' data-id='" + item.Talepid + "'>" + Teklif0;
                    var TeklifEnd = "</span> </div> </div></li>";
                    var btc = "<span style='margin-left:10px;' class='para'>" + item.Butce + "</span>";
                    var tklf = "<h5>" + item.Tur + "</h5><small><b>" + item.Tarih + "</b> </small><span> " + item.Teklif + "</span>";
                    $("ul#bildirimler").append(TeklifStart + tklf + TeklifEnd);
                }
                bildirimler++;
            });

            $("span#bildirimsayi").html(bildirimler);
        }, error: function (error) { console.log(error.responseText); }
    });

},200
},200)