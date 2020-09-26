$(document).ready(function () {
    $(".loading").html('<div class="ProgressSpinnerFlat" role="progressbar"> <div aria-hidden="true">•</div> <div aria-hidden="true">•</div> <div aria-hidden="true">•</div> <div aria-hidden="true">•</div> <div aria-hidden="true">•</div> </div>');


    
    if ($.cookie("MenuStatus")) {

        if ($.cookie("MenuStatus") == "0") {
            $("#MainMenu").css({ "display": "none" });
        }
        else {
            $("#MainMenu").css({ "display": "block" });
        }
    }
    else {
        $.cookie("MenuStatus", "0");
        $("#MainMenu").css({ "display": "none" });

    }



    setTimeout(function() { TalepKontrol() }, 1);
    var domainurl = "";

    if ($.cookie("DomainUrl")) { domainurl = $.cookie("DomainUrl") } else {


    $.ajax({
        type: "GET", url: "../Services/GetDomain.ashx",
        contentType: "text",
        async: true,
        success: function (dat) {
            domainurl = dat + "/Admin/";
            $.cookie("DomainUrl", dat + "/Admin/")
        },
        error: function (error) {
            alert("boş data");
        }
    });
    }
    //DovizYeniden();
    var notifications = $.connection.TetikHub;
    notifications.client.AdminPaymenListRefresh = function () {

        $.post("Gate/OdemeKontrol.ashx",
            function(data) {
                $("#odemelistesi").html("");
                var result = PaymentEach(data);
                $("#form1").attr("data-kos", result);
                $("#odemesayisi").html(result);
                var yukseklikodeme = result * 81;
                if (305 < yukseklikodeme) {
                    $("#odemelistesi").addClass("odemefazla305ten");
                }
                if (result == 0) {
                    $("#YeniOdeme").hide();
                }
                else {
                    $("#YeniOdeme").show();
                }
                var audio = new Audio('/vaw/yeniodeme.m4a');
                audio.play();
                BildirimArtir();
            });
    }
    notifications.client.yeniteklif = function (talepdurum) {
        $(".btn-notice").addClass("alert-notice");
        var HizmetURL = domainurl + "/Gate/UstBildirimTeklif.ashx?sonid=" + talepdurum;
        $.ajax({
            type: "GET", url: HizmetURL, contentType: "text", async: true,
            success: function (datas) {
                BidEach(datas);
                var audio = new Audio(domainurl+'/vaw/yeniteklif.m4a');
                audio.play();
            }, error: function (error) { alert(error); }
        }); 
    }
    notifications.client.sozlesmehazir = function (TeklifId, UserId, AcentaAdi) {
        var yenisozlesme = "<li class='sozlesmegeldi'   data-id='" + TeklifId + "'>" +
            " <div class='yenitalep col-md-12 col-xs-12'> <div class='col-xs-1'> <i class='fa fa-2x fa-building'></i> </div> " +
            " <div class='col-xs-11'>" +
            "  <h5>Sözleşme Geldi</h5><b></b><span> " + AcentaAdi + "</span> </div> </div></li>";
        $("#newbildirim").append(yenisozlesme);
        BildirimArtir();
    }    
    notifications.client.acentahizmetvermiyor = function (TeklifId, UserId, AcentaAdi) {
        $("li.BildirimSozlesmeBeklenenDetay[data-sozlesmebeklenenteklifid='" + TeklifId + "']").hide();
        $("li.SozlesmeBeklenenTeklif[data-sozlesmebeklenenteklifid='" + TeklifId + "']").hide();

        
        var acentahizmetvermiyor = "<li class='acentahizmetvermiyor'   data-id='" + TeklifId + "'>" +
            " <div class='yenitalep col-md-12 col-xs-12'> <div class='col-xs-1'> <i class='fa fa-2x fa-building'></i> </div> " +
            " <div class='col-xs-11'>" +
            "  <h5>Acenta Hizmet Vermeyeceğini Bildirdi</h5><b></b><span> " + AcentaAdi + "</span> </div> </div></li>";
        $("#newbildirim").append(acentahizmetvermiyor);

        var sozlesme =
"<li class='Acentaiptaletti' data-sozlesmebeklenentalepid=" + TeklifId + " data-SozlesmeBeklenenTeklifId='" + TeklifId + "'><div class='col-xs-12 pad0'>" +
"<i class='ikonsagpad fa fa-2x fa-user'> </i>" + AcentaAdi + "<br>" +
"<span class='label label-danger'>Acenta Hizmet Vermeyeceğini Bildirdi</span>  </div></li>";
        $("#SozlesmeBeklenenListesi").append(sozlesme);

        $("div#SozlesmeYeniGelecekler").show();
        
        var audio = new Audio(domainurl+'/vaw/iptal.m4a');
        audio.play();
     }
    notifications.client.NewClaim = function (yenitalepid) {
        $.ajax({
            type: "GET", url: domainurl + "Gate/UstBildirim.ashx?sonid=" + yenitalepid, contentType: "text", async: true,
            success: function (datas) {
                var result = ClaimEach(datas);
                var talepsayisi = parseInt($("span#talepsayisi").text(), 10);
                if (talepsayisi == 0) {
                    $("div#taleplerListesi").show();
                    $("span#talepsayisi").text("1");
                }
                else {
                    var taleps = parseInt($("span#talepsayisi").text(), 10) + 1;
                    $("span#talepsayisi").text(taleps);
                }
                var audio = new Audio(domainurl+'/vaw/talep.m4a');
                audio.play();
                BildirimArtir();
            }, error: function (error) { alert(error); }
        });

    }
    notifications.client.kisileriyenile = function () {

        var HizmetURL = "Gate/OnlineKisileriGetir.ashx";
        $.ajax({
            type: "GET", url: HizmetURL,
            contentType: "text",
            async: true,
            success: function (data) {
                $("div.onlinekisiler").html(data);

            }
        });
    }
    $.connection.hub.start().done(function () {

    });


    function TalepKontrol() {
        $("#YeniTaleplerListesi").html("");
        $.post("Gate/YeniTalepler.ashx",
            function(data) {
                var result = ClaimEach(data);
                $("#talepsayisi").text(result);

                $("#form1").attr("data-btas", result);
                if (result == 0) {
                    $("div#taleplerListesi").hide();
                    $("#talepsayisi").text("0");
                } else {
                    $("div#taleplerListesi").show();
                }
                TeklifKontrol();

            }); 
    }
    function OdemeKontrol() {
     
        $.post("Gate/OdemeKontrol.ashx",
            function (data) {
                $("#odemelistesi").html("");
                var result = PaymentEach(data);
                if (result == 0) {
                    $("#YeniOdeme").hide();
                } else {
                    $("#YeniOdeme").show();
                }
                $("#odemesayisi").html(result);
                var yukseklikodeme = result * 81;
                if (305 < yukseklikodeme) {
                    $("#odemelistesi").addClass("odemefazla305ten");
                }
                $("#form1").attr("data-kos", result);
                BildirimSayisiTopla();
            });
        $(".pageloading").html("");
    }
    function TeklifKontrol() {
        $.post("Gate/TeklifBirinciAsamaACENTADAN.ashx",
            function(data) {
                $("#acentadangelenilk").html("");
                var result = BidEach(data);
                $("#teklifsayisi").html(result);
                $("#form1").attr("data-btes", result);
                if (result == 0) {
                    $("#TekliflerListesi").hide();
                } else {
                    $("#TekliflerListesi").show();
                }
                AcentaBasvurulari();
            });
    }
    function AcentaBasvurulari() {

        $.post("Gate/YeniAcenta.ashx",
            function(data) {
                var result = NewSellerEach(data);
                $("#BasvuruSayisi").html(result);

                $("#form1").attr("data-abs", result);

                if (result == 0) {
                    $("#YeniAcenta").hide();
                } else {
                    $("#YeniAcenta").show();
                }
                SozlesmeBeklenen();
            });
    }
    function SozlesmeBeklenen() {

     
        $.post("Gate/SozlesmeBeklenenTalepler.ashx",
            function (data) {
                $("#SozlesmeBeklenenListesi").html("");
             
                var result=ContractEach(data)

                if (result == 0) {
                    $("div#SozlesmeYeniGelecekler").hide();
                    $("#beklenensozlesmesayisi").text("0");
                }
                else {
                    $("div#SozlesmeYeniGelecekler").show();
                }
                $("#form1").attr("data-bss", result);

                OdemeKontrol();
            })
    }


    function ContractEach(data) {
        var sozlesmebeklenentalepStart = "<div class='sozlesmebeklenentalep'>  <i class='fa fa-2x fa-building'></i>";
        var sozlesmebeklenentalepEnd = "</span> </div> </div>";
        var sayac = 0;
        $.each(data, function (i, item) {
            var Seller = item.Seller;
            var Authorized = item.Authorized;
            var SellerId = item.SellerId;
            var UserId = item.UserId;
            var Customer = item.Customer;
            var CustomerName = item.CustomerName;
            var ClaimId = item.ClaimId;
            var BidId = item.BidId;

            var sozlesme = "<li class='SozlesmeBeklenenTeklif' data-SellerId='" + SellerId + "' data-UserId='" + UserId + "' data-ClaimId=" + ClaimId + " data-BidId='" + BidId + "'><div class='col-xs-12 pad0'>" + "<i class='ikonsagpad fa fa-2x fa-user'> </i>" + CustomerName + "<span class='sozlesmemail'> (" + Customer + " ) </span><br>" + "<i class='ikonsagpad fa fa-2x fa-building'> </i>" + Authorized + "<span class='sozlesmemail'> (" + Seller + " )</span> </div></li>";
            $("#SozlesmeBeklenenListesi").append(sozlesme);
            sayac++;
            var SozlesmeBeklenenTalep = "<li class='BildirimSozlesmeBeklenenDetay'  data-SellerId='" + SellerId + "' data-UserId='" + UserId + "' data-ClaimId='" + ClaimId + "' data-BidId='" + BidId + "'>" + sozlesmebeklenentalepStart + "<b> Acenta Sözleşme Yükleyecek. " + "</b><br><span>  " + CustomerName + "</span><span>  " + Authorized + "</span>" + sozlesmebeklenentalepEnd + "</li>";;
            $("#newbildirim").append(SozlesmeBeklenenTalep);
            $("#beklenensozlesmesayisi").text(sayac);
        });
        return sayac;
    }
    function PaymentEach(data) {
        var sayac = 0;
        var odemeStart = "<div class='odeme col-md-12 col-xs-12 pad0'> <div class='col-xs-1 pad0'> <i   class='fa fa-2x fa-user'></i> </div> <div class='col-xs-11 pad0'>";
        var odemeEnd = "</span> </div> </div>";
        $.each(data, function (i, item) {

            var ClaimId = item.ClaimId;
            var BidId = item.BidId;
            var UserId = item.UserId;
            var Email = item.Email;
            var PaymentId = item.PaymentId;
            var CreatedDate = item.CreatedDate;
            var Amount = item.Amount;
            var odeme = "<li class='odemedetay pad0'  data-UserId='" +
                UserId + "' data-PaymentId='" +
                PaymentId + "'>" + "<div class='col-xs-12 pad0'><div class='col-xs-8 pad0'><i class='ikonsagpad fa fa-2x fa-user'> </i>" +
                Email + "</div><div class='col-xs-4 pad0 text-right'>" +
                ClaimId + "</div> </div><div><span><i class='odemetarih fa fa-calendar'></i>" +
                CreatedDate + "</span><span class='pull-right'><i class='fa fa-money odemepara'></i>" + Amount + "</span></div></li>";
            $("#odemelistesi").append(odeme);
            sayac++;
            var odemetur = ClaimId
            if (odemetur == "0") {
                odemetur = "Kredi Yükleme";
            }
            var odemebildirimi = "<li class='odemedetay'  data-UserId='" +
                UserId + "' data-PaymentId='" +
                PaymentId + "'>" +
                odemeStart + "<b> Ödeme Geldi </b> <span class='odemeturu pull-right'>(" +
                odemetur + ")</span><div> " +
                Email + "</div>" +
                odemeEnd + "</li>";
            $("#newbildirim").append(odemebildirimi);

        });
        return sayac;
    }
    function ClaimEach(data) {

        var staticinfo = "<div class='ms-CalloutExampleClaim'> <div class='ms-Callout ms-Callout--arrowLeft ms-Callout--OOBE is-hidden'> <div class='ms-Callout-main'> <div class='ms-Callout-header'> <p class='ms-Callout-title'></p> </div> <div class='ms-Callout-inner'> <div class='ms-Callout-content'> <p class='ms-Callout-subText'></p> </div> </div> </div> </div> <div class='ms-CalloutExample-buttons'> <div class='ClaimInfoBtn info'>";
        var PeopleInfo = "<div class='ms-CalloutExamplePeople'> <div class='ms-Callout ms-Callout--arrowLeft ms-Callout--OOBE is-hidden'> <div class='ms-Callout-main'> <div class='ms-Callout-header'> <p class='ms-Callout-title'></p> </div> <div class='ms-Callout-inner'> <div class='ms-Callout-content'> <p class='ms-Callout-subText'></p> </div> </div> </div> </div> <div class='ms-CalloutExample-buttons'> <div class='PeopleInfoBtn info'>";
        var sayac = 0;
        $.each(data,
            function (i, item) {
                var Email = item.Email;
                var Comment = item.Comment;
                var CreatedDate = item.CreatedDate;
                var UserId = item.UserId;
                var ClaimId = item.ClaimId;


                var AmountDiv = "<span style='margin-left:10px;' class=''>" + item.Amount;


                var ListTalep = "<tr class='yuzdeyuz'><td><i  data-UserId='" +
                    UserId +
                    "'  class='ikonsagpad People fa fa-2x fa-user'></i>" +
                    Email +
                    "</td>" +
                    "<td><small><a class='saatfark' href='#'>" +
                    CreatedDate +
                    "</small></td>" +
                    "<td>" +
                    AmountDiv +
                    "</td>" +
                    "<td>" +
                    staticinfo +
                    "<i class='fa fa-info-circle'></i>" +
                    "</div></div></td>" +
                    "<td><i class='fa fa-search TalepDetay' data-toggle='modal' data-target='#exampleModal' data-UserId='" +
                    UserId +
                    "'  data-ClaimId='" +
                    ClaimId +
                    "' ></i></td></tr>";


                var Teklif0 = "<div class='yenitalep col-md-12 col-xs-12 pad0' > <div class='col-xs-1 pad0'>" +
                    " <i   class='fa fa-2x fa-user'></i> </div> <div class='col-xs-11 pad0'>";
                var TeklifStart =
                    "<li class='TalepDetay'  data-toggle='modal' data-target='#exampleModal' data-UserId='" +
                    UserId +
                    "' data-ClaimId='" +
                    ClaimId +
                    "'>" +
                    Teklif0;
                var TeklifEnd = "</span> </div> </div></li>";
                var btc = "<span style='margin-left:10px;' class='para'>" +
                    item.Amount +
                    "</span>";
                var tklf = "<h5><span class='claimhead'> Yeni Talep </span>" +
                    item.Title +
                    "</h5><small><b>" +
                    CreatedDate +
                    "</b> </small><span> " +
                    Email +
                    "</span>";
                $("#newbildirim").append(TeklifStart + tklf + btc + TeklifEnd);


                sayac++;

                $("#YeniTaleplerListesi").append(ListTalep);


            });

        return sayac;
    }
    function BidEach(data) {
        var sayac = 0;
        $.each(data, function (i, item) {
            var TeklifBildirim = "<li data-toggle='modal' data-target='#exampleModal' class='YeniAcentaTeklifi ' data-sellerid='" +
                item.SellerId + "' data-Customer='" +
                item.Customer + "' data-UserId='" +
                item.UserId + "' data-SellerId='" +
                item.SellerId + "'  data-BidId='" +
                item.BidId + "'  data-ClaimId='" +
                item.ClaimId + "' data-CreatedDate='" +
                item.CreatedDate + "' data-Seller='" +
                item.Authorized + "' ><div class=' col-md-12 col-xs-12 pad0' ><div class='col-xs-1 pad0'>" +
                "<i class='fa fa-2x fa-building'></i> </div> <div class='pad0 col-xs-11'><h5 class='bidhead'>Yeni Teklif</h5><small><b>" +
                item.CreatedDate + "</b> </small>" +
                item.Authorized + "</span> </div > </div ></li >";

            $("#newbildirim").append(TeklifBildirim);

            var teklif = "<tr class='yuzdeyuz'>" +
                "<td><i data-SellerId='" + item.SellerId + "' class='ikonsagpad SellerDetail fa fa-2x fa-building'></i>" + item.Authorized + "</td>" +
                "<td><span class='alert-notice reddd'>" + item.BidCount + "</span></td>" +
                "<td><small><a class='saatfark' href='#'>" + item.CreatedDate + "</small></td>" +
                "<td>" + infocard("<i class='fa fa-info-circle'></i>") + "</td>" +
                "<td><i class='fa fa-search YeniAcentaTeklifi' data-toggle='modal' data-target='#exampleModal'  data-sellerid='" +
                item.SellerId + "' data-Customer='" +
                item.Customer + "' data-UserId='" +
                item.UserId + "' data-SellerId='" +
                item.SellerId + "'  data-BidId='" +
                item.BidId + "'  data-ClaimId='" +
                item.ClaimId + "' data-CreatedDate='" +
                item.CreatedDate + "' data-Seller='" +
                item.Authorized + "'  ></i></td>" +

                "</tr>";

            $("#acentadangelenilk").append(teklif);


            sayac++;

        });

        return sayac;
    }
    function NewSellerEach(data) {
        var sayac = 0;

        $.each(data, function (i, item) {


            var UserId = item.UserId;
            var Phone = item.Phone;
            var Authorized = item.Authorized;
            var Title = item.Title;


            var teklif = "<li class='YeniAcentaBasvurusu'  data-SellerId='" +
                UserId + "' ><i class='ikonsagpad fa fa-building'></i><a href='AcentalarBekleyen.aspx'>" +
                Authorized + "  </a><br> <small><i class='ikonsagpad fa fa-user'> </i>" +
                Title + "<a class='saatfark' href='tel:" +
                Phone + "'><br><i class='fa fa-phone ikonsagpad'></i>" +
                Phone + "</small> </li>";
            $("#yenibasvurular").append(teklif);
            sayac++;
            var tekliflist = "<li  class='YeniAcentaBasvurusu'  class='basvuruyeni' data-SellerId='" +
                UserId + "'>" + "<div class='yeniteklif col-md-12 col-xs-12'> <div class='col-xs-1'> <i class='fa fa-2x fa-building'></i> </div>" +
                " <div class='col-xs-11'><b>Yeni Acenta Başvurusu </b> " +
                Title + "<br>  <div>" +
                Authorized + "</div></div></div></li>";
            $("#newbildirim").append(tekliflist);

        });

        return sayac;
    }






   
    function BildirimSayisiTopla() {
        var t = $("#form1");

        var Btes = parseInt(t.attr("data-btes"), 10);
        var Abs = parseInt(t.attr("data-abs"), 10);
        var Kos = parseInt(t.attr("data-kos"), 10);
        var Bss = parseInt(t.attr("data-bss"), 10);
        var Btas = parseInt(t.attr("data-btas"), 10);
        var tbs = Btes + Abs + Kos + +Bss + Btas; 
       
         if (tbs == 0) {
            $("#bildirimsayi").css("background", "none");
            $("#bildirimsayi").html("");
        } else {
            $("#bildirimsayi").css("background", "red");
            $("#bildirimsayi").html(tbs);

            var yukseklik = parseInt(tbs) * 81 + "px";

            $('#notification').css("overflow-y", "show");

            if (tbs * 81 > 400) {
                $('#notification').css("overflow-y", "show");
                $('#notification').css("height", "400px");
            }
            else {
                $('#notification').css("overflow-y", "hidden");
                $('#notification').css("height", yukseklik);
            }
        }
        $(".mainpanel").fadeIn("slow");
    }
    function infocard(static) {

        var staticinfo = "<div class='ms-CalloutExample'> <div class='ms-Callout ms-Callout--arrowLeft ms-Callout--OOBE is-hidden'> <div class='ms-Callout-main'> <div class='ms-Callout-header'> <p class='ms-Callout-title'></p> </div> <div class='ms-Callout-inner'> <div class='ms-Callout-content'> <p class='ms-Callout-subText'></p> </div> </div> </div> </div> <div class='ms-CalloutExample-button'> <div class='BidInfoBtn info'>" + static + "</div> </div> </div>";
        return staticinfo;
    }

});



$(document).on("click", ".BidInfoBtn", function () {
    $(".ms-Callout-content").html($(".TeklifOnaylamaInfo").html());
    $(".ms-Callout-title").html("<b>Teklif Onaylama Talimatları</b>");
    openedinfo();
})
$(document).on("click", ".ClaimInfoBtn", function () {
    $(".ms-Callout-content").html($(".TalepOnaylamaInfo").html());
    $(".ms-Callout-title").html("<b>Talep Onaylama Talimatları</b>");
    openedinfo();
})

$(document).on("click", ".People", function () {
       $(".modalhead").html("Kullanıcı Bilgileri");
    $("#TeklifFrame").attr("src", "ProfilDetay.aspx?popup=yes&id=" + $(".People").attr("data-UserId"));
    $("#exampleModal").modal("show");
    $("#TeklifFrame").show();


})

$(document).on("click", ".odemedetay", function () {
    $(".modalhead").html("Ödeme Bilgileri");

    var profil = $(this).attr("data-UserId");
    $("#TeklifFrame").attr("src", "ProfilDetay.aspx?popup=yes&id=" + profil);
    $("#exampleModal").modal("show");
    $("#TeklifFrame").show();
});




$(document).on("click", ".YeniAcentaTeklifi", function () {
    var bu = $(this);
    bu.css("opacity", "0.7");
    var teklif = bu.attr("data-BidId");
    var HizmetURL = "UserId=" + bu.attr("data-UserId") + "&SellerId=" + bu.attr("data-SellerId") + "&ClaimId=" + bu.attr("data-ClaimId") + "&BidId=" + bu.attr("data-BidId") + "&CreatedDate=" +
        bu.attr("data-CreatedDate") + "&Customer=" + bu.attr("data-Customer") + "&Seller=" + bu.attr("data-Seller");
    console.log(HizmetURL);
    $("#TeklifFrame").attr("src", "TeklifDetay.aspx?" + HizmetURL);
    $("#work_id").attr("data-tur", "teklif");
    $("#work_id").attr("data-id", teklif);
    $("#enbasadon").fadeIn();
    $("#TeklifFrame").show();
    $(".modalhead").html("Teklif Bilgileri");

 
    // document.getElementById("menuToggle").click();
});
$(document).on("click", ".TalepDetay", function () {
    var ClaimId = $(this).attr("data-ClaimId");
    var UserId = $(this).attr("data-userid");
    $("#TeklifFrame").attr("src", "TalepDetay.aspx?UserId=" + UserId + "&ClaimId=" + ClaimId);
 
    $("#TeklifFrame").show();
    $(".modalhead").html("Talep Bilgileri");

    $(".where").html("Talep Detay");
});
 
$(document).on("click", ".SellerDetail", function () {
    var id = $(this).attr("data-sellerid");
      $("#exampleModal").modal("show");
    $("#TeklifFrame").attr("src", "AcentaBasvuruGoruntule.aspx?id=" + id);
    $("#TeklifFrame").show();
    $(".modalhead").html("Acenta Bilgileri");

 });
$(document).on("click", ".YeniAcentaBasvurusu", function () {
    var id = $(this).attr("data-SellerId");

    $("#TeklifFrame").attr("src", "AcentaBasvuruGoruntule.aspx?id=" + id);
    $(".modalhead").html("Başvuru Bilgileri");

     
    $("#TeklifFrame").show();
   
    document.getElementById("menuToggle").click();
});




function openedinfo() {
    $(".ms-Callout-inner").css("padding", "20px")
    $(".ms-Callout").removeClass("height500");
    $(".ms-Callout-content").removeClass("height500");
    $(".ms-ContextualHost-beak").show();
}







$(document).on("click", ".panel-heading", function () {
    $(this).closest(".panel-primary").find(".panel-body").slideToggle();
});
$(document).on("click", ".panel-heading", function () {
    $(this).closest(".panel-success").find(".panel-body").slideToggle();
});
$(document).on("click", "#DovizYenileNOW", function () {
    $("#DovizYenileNOW").hide();
    $("#DovizBekle").show();

    DovizYeniden();

});
$(document).on("click", "#enbasadon", function () {

    $("#TeklifFrame").html('<div class="ProgressSpinnerFlat" role="progressbar"> <div aria-hidden="true">•</div> <div aria-hidden="true">•</div> <div aria-hidden="true">•</div> <div aria-hidden="true">•</div> <div aria-hidden="true">•</div> </div>');
      $("#TeklifFrame").hide();
    $(".where").html("");
    $(".MainContainer").css("top", "48px");
    $("#exampleModal").modal("hide");
    $(this).fadeOut();
 

    if (parseInt($("#talepsayisi").text(), 10) == 0) {
    }
    else {
        $("#taleplerListesi").slideDown();

    }
});
$("#yenilereddedildi").on("click", function () {
    setTimeout(function () {
        $.gritter.add({
            title: 'İşlem Tamamlandı',
            text: 'Talep Rededildi.',
            class_name: 'with-icon check-circle danger'
        });
        islemsonrasiyenile();
    }, 1000)
})
$("#yenileonaylandi").on("click", function () {
    setTimeout(function() {
            $.gritter.add({
                title: 'İşlem Tamamlandı',
                text: 'Talep Onaylandı.',
                class_name: 'with-icon check-circle success'
            });
            islemsonrasiyenile();
        },
        1000);
})
setTimeout(function() {
        $("body").append(
            "<script class='CallOutScriptYeniTalep' type='text/javascript'> var CalloutExamples = document.querySelectorAll('.ms-CalloutExampleClaim'); for (var i = 0; i < CalloutExamples.length; i++) { var Example = CalloutExamples[i]; var ExampleButtonElement = Example.querySelector('.ms-CalloutExample-buttons .ClaimInfoBtn'); var CalloutElement = Example.querySelector('.ms-Callout'); new fabric['Callout']( CalloutElement, ExampleButtonElement, 'right' ); } </script>")

        $("body").append(
            "<script class='CallOutScriptYeniTeklif' type='text/javascript'> var CalloutExamples = document.querySelectorAll('.ms-CalloutExample'); for (var i = 0; i < CalloutExamples.length; i++) { var Example = CalloutExamples[i]; var ExampleButtonElement = Example.querySelector('.ms-CalloutExample-button .BidInfoBtn'); var CalloutElement = Example.querySelector('.ms-Callout'); new fabric['Callout']( CalloutElement, ExampleButtonElement, 'right' ); } </script>")
        $("body").append(
            "<script class='CallOutScriptYeniTalep' type='text/javascript'> var CalloutExamples = document.querySelectorAll('.ms-CalloutExamplePeople'); for (var i = 0; i < CalloutExamples.length; i++) { var Example = CalloutExamples[i]; var ExampleButtonElement = Example.querySelector('.ms-CalloutExample-buttons .PeopleInfoBtn'); var CalloutElement = Example.querySelector('.ms-Callout'); new fabric['Callout']( CalloutElement, ExampleButtonElement, 'right' ); } </script>")

        //$(".ms-ContextualHost").draggable();
    },
    2000);
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
            $("#dovizalani").html("<div class='alert-info'>Merkez Bankası Döviz Hatası</div>");
            $("#DovizYenileNOW").show();
            $("#DovizBekle").hide();
        }
    });
}
function islemsonrasiyenile() {
    var tur = $("#work_id").attr("data-tur");
    var id = $("#work_id").attr("data-id");
    if (tur == "talep") {
        $(".teklifdetay[data-id='" + id + "']").css("display", "none");
    }
    else if (tur == "teklif") { }
    $("#myModal").modal("hide");
}
function BildirimAzalt() {
    var bildirimler = parseInt($("#bildirimsayi").text(), 10);
    if (bildirimler == "") {
        $("#bildirimsayi").text("1");
    }
    else {
        var azalt = parseInt($("#bildirimsayi").text(), 10) - 1;
        $("#bildirimsayi").html(azalt);
        if (azalt == 0) {
            $("#bildirimsayi").text("");
            $("#bildirimsayi").css("background", "none");

        }
    }
}
function BildirimArtir() {
    $("#bildirimsayi").css("background", "rgb(254, 11, 11)");
    var bildirimler = parseInt($("#bildirimsayi").text(), 10);
    if (bildirimler == "") {
        $("#bildirimsayi").text("1");
        $('#notification').css("height", "81px");

    }
    else {
        var artir = parseInt($("#bildirimsayi").text(), 10) + 1;
        $("#bildirimsayi").html(artir);
        if (artir == 0) {
            $("#bildirimsayi").text("");
        }
        var bildirimyukseklik = bildirimler;
        var yukseklik = parseInt(bildirimyukseklik) * 81 + "px";
        $('#notification').css("overflow-y", "scroll");
        if (bildirimyukseklik > 400) {
            $('#notification').css("overflow-y", "scroll");
            $('#notification').css("height", "400px");
        }
        else {
            $('#notification').css("overflow-y", "hidden");
            $('#notification').css("height", yukseklik);
        }
    }


}
function BildirimYukseklik(parametre) {
    var yukseklik = parseInt(parametre) + "px";

    $('#notification').css("overflow-y", "scroll");

    if (parametre > 400) {
        $('#notification').css("overflow-y", "scroll");
        $('#notification').css("height", "400px");
    }
    else {
        //   $('#notification').css("overflow-y", "hidden");
        //   $('#notification').css("height", yukseklik);
    }
}
function cikisyap() {
    document.getElementById("LoggingOut").click();
}
function TeklifListesiniGizle() {
    $("#tekliflistesi").hide();
    $("#anaekran").hide();
}
function OdemeListesindenKaldir(odemeid) {
    var GizleOdemeBildirimden = ".odemedetay[data-id='" + odemeid + "']";
    $(GizleOdemeBildirimden).hide();
    var GizleOdemeListeden = ".odemetalebi[data-odeme='" + odemeid + "']";
    $(GizleOdemeListeden).hide();
    var OdemeBildirimSayisi = parseInt($("#odemesayisi").html(), 10) - 1;
    if (OdemeBildirimSayisi == 0) { $("#odemesayisi").html(""); $("#YeniOdeme").hide(); } else { $("#odemesayisi").html(OdemeBildirimSayisi); }
    var YBS = parseInt($("#bildirimsayi").text(), 10) - 1;
    if (YBS == "0") { $("#bildirimsayi").html(""); } else { $("#bildirimsayi").html(YBS); }

}
function TeklifiKaldir(talepid) {
    var Teklif = $(".YeniAcentaTeklifi[data-talep='" + talepid + "'] >.toplamteklifsayisi");
    var TeklifSayisi = parseInt(Teklif.html(), 10);
    TeklifSayisi = TeklifSayisi - 1;
    if (TeklifSayisi == 0) {
        Teklif.hide();
        $(".YeniAcentaTeklifi[data-talep='" + talepid + "']").hide();
    } else {
        Teklif.html(TeklifSayisi);
    }
    var AcentaTeklifSayisi = parseInt($("#teklifsayisi").html() - 1);
    if (AcentaTeklifSayisi == 0) {
        $("#teklifsayisi").html("");
        $("#TekliflerListesi").hide();
    }
    else {
        $("#teklifsayisi").html(AcentaTeklifSayisi);
    }
    var YBS = parseInt($("#bildirimsayi").text(), 10) - 1;
    if (YBS == "0") { $("#bildirimsayi").html(""); } else { $("#bildirimsayi").html(YBS); }
}
function TalebiKaldir(talepid) {
    var Listedeki = ".talebi" + talepid;
    $(Listedeki).hide();
    $("#myModal").modal("hide");
    var BildirimdekiTalep = $(".BildirimTalepDetay[data-id='" + talepid + "']");
    $(BildirimdekiTalep).hide();
    var YBS = parseInt($("#bildirimsayi").text(), 10) - 1;
    if (YBS == "0") { $("#bildirimsayi").html(""); } else { $("#bildirimsayi").html(YBS); }
    var TalepSayisi = parseInt($("#talepsayisi").text() - 1);
    if (TalepSayisi == 0) {
        $("span#talepsayisi").text("0");
        $("#taleplerListesi").hide();
    }
    else {
        $("span#talepsayisi").text(TalepSayisi);
    }
    $("#enbasadon").click();
}
function BasvuruKaldir(acentaid) {

    $(".basvuruyeni[data-acenta='" + acentaid + "']").hide();


    $(".YeniAcentaBasvurusu[data-acentaid='" + acentaid + "']").hide();


    var YBS = parseInt($("#bildirimsayi").text(), 10) - 1;
    if (YBS == "0") { $("#bildirimsayi").html(""); } else { $("#bildirimsayi").html(YBS); }
    var BasvuruSayisi = parseInt($("#BasvuruSayisi").text() - 1);
    if (BasvuruSayisi == 0) {
        $("span#BasvuruSayisi").text("0");
        $("#YeniAcenta").hide();
    }
    else {
        $("span#BasvuruSayisi").text(BasvuruSayisi);
    }
 }
function sbs() {
    $("#TekliflerListesi").draggable();
    $("#YeniAcenta").draggable();
    $("#YeniOdeme").draggable();
    $("#SozlesmeYeniGelecekler").draggable();
    $("#taleplerListesi").draggable();
}
function loading() {

    var width = 1;
    var id = setInterval(frame, 50);
    function frame() {
        if (width >= 100) {
            clearInterval(id);
            setTimeout(function () {
                $("#Loading").css("display", "none");

            }, 1000)
        } else {
            width++;

            $("#Loading").css("width", width + "%");
        }
    }
}
function CloseSettings() {
    $("#enbasadon").click();
}
function OpenInNewWindow() {

    $("#exampleModal").modal("show");
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
 

function SearchItem(Icon, Comment) {
    return '<div class="  pad0 col-xs-12"> <div class="col-xs-2 pad10"> <i class="fa fa-2x fa-' + Icon + '">' +
        '</i> </div> <div class="col-xs-10 pad10">' + Comment + '</div> ' +
        '</div> <div style="clear: both; height: 10px; border-bottom: 1px solid #f2f2f2" class="clearfix"> </div>';
}
function CloseSearchResult() {
    $(".AfterIcon").fadeOut();
    $(".BeforeIcon").fadeIn();
    $(".SearchResultPanel").hide();
    $(".SearchList").html("");
    $("#FilterData").val("");
}
$("#FilterData").on("input", function () {
    if ($(this).val()) {
        $(".SearchResultPanel").show();
        $(".AfterIcon").fadeIn();
        $(".BeforeIcon").fadeOut();
        if ($(this).val() >= '0' && $(this).val() <= '9') {
            $(".SearchList").append(SearchItem("user", "Rakam"))
        } else {
            $(".SearchList").append(SearchItem("building", "Harf"))
        }
    }
    else {
        $(".AfterIcon").fadeOut();
        $(".BeforeIcon").fadeIn();
        $(".SearchResultPanel").hide();
        $(".SearchList").html("");
    }
});