function AClaimDetail() {

    var result = "";
    var clas = "";
    var talepdurum = "";
    var detay = "";

    $.each(NewClaims , function (i, SD) {

        var Status = SD.Status;
        if (Status == "1") {
            var BidCount = SD.BidCount;
            Status = "<span class='label label-success'>Yayında</span>";
            clas = "yayinda";
            talepdurum = "<span class='bildirimkirmizi label label-info'>" + BidCount + "</span>";

        }
        else if (Status == "4") {

            Status = "<span title='Talebiniz reddedildi.' class='label label-danger'>Reddedildi</span>";
            clas = "redd";
            talepdurum = "-";

        }
        else if (Status == "2") {
            talepdurum = "";
            Status = "<span data-info='Hizmet alım sözleşmesi hazırlanıyor.' class='popinfo label label-primary'>Hazırlanıyor.</span>";
            clas = "";
        }
        else if (Status == "3") {
            talepdurum = "";
            Status = "<span data-info='Sözleşmeniz geldi ödeme yapınız' class='popinfo label label-success'>Ödeme Yapınız.</span>";
            clas = "yayinda";
        }
        else if (Status == "5") {
            talepdurum = "";
            Status = "<span class='label label-primary'>Ödemeniz Onaylandı</span>";
            clas = "yayinda";
        }
        else if (Status == "6") {
            talepdurum = "";
            Status = "<span class='label label-primary'>Alınacak Hizmet</span>";
            clas = "yayinda";
        }
        else if (Status == "7") {
            talepdurum = "";
            Status = "<span class='label label-primary'>Alınan Hizmet</span>";
            clas = "yayinda";
        }
        else if (Status == "0") {
            talepdurum = "";
            Status = "<span data-info='Talebiniz değerlendirme aşamasındadır.Yayına alındığında bilgi verilecektir' class='degerlendirme popinfo label label-warning'>İnceleniyor</span></div>";
            clas = "beklemede";
        }



        result += "<tr   data-Id='" + SD.ClaimId + "' data-statu='" + SD.Status + "'  class='talep detay " +
            clas + "'><td >" + SD.ClaimId + "</td><td >" + SD.CreatedDate + "</td><td>" + SD.Coast + "</td><td>" +
            Status + "</td>" + detay + "<td>" + talepdurum + "</td></tr>";


    })




    if (result == "") {
        sayfabaslik.InnerHtml = "Henüz Talebiniz Yok";
        taleplistesi.Visible = false;


    }
    else {
        $("#listteklif").html(result);

    }
}
