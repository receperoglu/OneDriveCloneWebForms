var MotionWayBillTableHead = "<tr class='MotionHead'><td>Adet</td>" +
    "<td>Ağırlık</td>" +
    "<td>Tarih</td>" +
    "<td>İrsaliye</td>" +
    "</tr>";
var SearchResultTableHead = "<tr><td>Sipariş /Articel</td><td>Firma </td><td>Adet</td><td>Ağırlık</td><td>Tarih</td><td>İrsaliye</td></tr>";
var WayBillTableHead = "<thead>" +
    "<tr class='alert alert-primary'>" +
    "<td>Adet</td>" +
    "<td>Ağırlık</td>" +
    "<td>Ölçü</td>" +
    "<td>Renk</td>" +
    "<td>Tarih</td>" +
    "<td>İrsaliye</td>" +
    "</tr>" +
    "</thead>";
var TableSuccess = "<table class='table table-hover alert-success'>";
var OkeyGif = "<img class='okey' style='position:fixed;z-index:2000;width:200px;'   src='css/img/okey.gif?";
var DondurHTML = "<div style='margin-right:8px' onclick='Dondur(\"sol\")' class='fa fa-rotate-left'>Sola</div>" +
    " <div style='margin-right:8px' onclick='Dondur(\"sag\")'  class='fa fa-rotate-right'> Sağa</div>" +
    " <div style='margin-right:8px' id='resimindir' class='fa fa-download'> İndir</div>" +
    " <div id='buresmisil' style='margin-right:8px;' class='fa fa-eraser'> Sil</div><div id='resimbilgisiiste' class='fa fa-info'></div>";
var LoadingHTML = '<div class="ProgressSpinnerFlat" role="progressbar"> <div aria-hidden="true">•</div> <div aria-hidden="true">•</div> <div aria-hidden="true">•</div> <div aria-hidden="true">•</div> <div aria-hidden="true">•</div> </div>';
var Offline = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMTEuODcgMTA2LjY2Ij48ZGVmcz48c3R5bGU+LmF7ZmlsbDojZmZlMDM3O30uYntmaWxsOiNmZmM0MGI7fS5je2ZpbGw6IzNiNzdlNzt9LmR7ZmlsbDojM2I2ODMxO30uZXtmaWxsOiNmZjkwYmQ7fS5me2ZpbGw6I2ZmN2UyODt9PC9zdHlsZT48L2RlZnM+PHRpdGxlPkFzc2V0IDEyPC90aXRsZT48cGF0aCBjbGFzcz0iYSIgZD0iTTk1Ljc2LDkwbC03LjUzLTIuNzdhMS4wOSwxLjA5LDAsMCwxLS42NS0xLjMybDMuNzQtMTIuNjItMjgtNzJjLS42LTEuNTQtMS45LTEuNzMtMi45LS40MUwyMC45NCw1Mi44MmE0LjgzLDQuODMsMCwwLDEtMy42OCw0Ljg0TC41MSw3OS42OUMtLjQ5LDgxLDAsODIuMjcsMS42Nyw4Mi41TDk3LjMyLDk1Ljk0YzEuNjUuMjQsMi40OC0uODMsMS44OC0yLjM4bC0xLjg1LTQuNzUtLjI2LjYxQTEuMDYsMS4wNiwwLDAsMSw5NS43Niw5MFpNNTYuNiw2NmgwYTQuNjEsNC42MSwwLDAsMS05LjEzLTEuMjloMEE0LjYxLDQuNjEsMCwxLDEsNTYuNiw2NlptNi43NC0zNi4yOC02LDI1LjQyYTEuMDcsMS4wNywwLDAsMS0xLjIxLjhsLTQuNy0uODJhMS4wOSwxLjA5LDAsMCwxLS44OS0xLjE3bDIuMzYtMjYuMTdBLjg5Ljg5LDAsMCwxLDU0LDI2LjkzbDguNTUsMS41OUExLDEsMCwwLDEsNjMuMzQsMjkuNjhaIi8+PHBhdGggY2xhc3M9ImIiIGQ9Ik02Mi41NywyOC41Miw1NCwyNi45M2EuODkuODksMCwwLDAtMS4wOC44MUw1MC41OCw1My45MWExLjA5LDEuMDksMCwwLDAsLjg5LDEuMTdsNC43LjgyYTEuMDcsMS4wNywwLDAsMCwxLjIxLS44bDYtMjUuNDJBMSwxLDAsMCwwLDYyLjU3LDI4LjUyWiIvPjxwYXRoIGNsYXNzPSJiIiBkPSJNNTIuNjcsNjAuNzVhNC42LDQuNiwwLDAsMC01LjIsMy45M2gwQTQuNjEsNC42MSwwLDAsMCw1Ni41OSw2NmgwQTQuNjMsNC42MywwLDAsMCw1Mi42Nyw2MC43NVoiLz48cGF0aCBjbGFzcz0iYyIgZD0iTTExMS4yNiw1My42OSw5OS41OCw0OC45YS44OS44OSwwLDAsMC0xLjIxLjU4bC03LjA1LDIzLjgsNiwxNS41M0wxMTEuOCw1NUExLDEsMCwwLDAsMTExLjI2LDUzLjY5WiIvPjxwYXRoIGNsYXNzPSJkIiBkPSJNODcuNTgsODUuOWExLjA5LDEuMDksMCwwLDAsLjY1LDEuMzJMOTUuNzYsOTBhMS4wNiwxLjA2LDAsMCwwLDEuMzMtLjU3bC4yNi0uNjEtNi0xNS41M1oiLz48cGF0aCBjbGFzcz0iYyIgZD0iTTg4LjY5LDk1LjU5QTUuNjksNS42OSwwLDAsMCw4MS4zOSw5OWgwYTUuNyw1LjcsMCwxLDAsMTAuNzEsMy45aDBBNS43LDUuNywwLDAsMCw4OC42OSw5NS41OVoiLz48cGF0aCBjbGFzcz0iZSIgZD0iTTksNDIuNzZhMS4wOCwxLjA4LDAsMCwwLDEuMjcuNzJsNy40Ny0xLjcyYTEuMDksMS4wOSwwLDAsMCwuODItMS4yMUwxNC4xOCwxMS4zNmEuOS45LDAsMCwwLTEuMTItLjc2TC44OSwxMy40MWEuOTEuOTEsMCwwLDAtLjY4LDEuMTdaIi8+PHBhdGggY2xhc3M9ImUiIGQ9Ik0yMC44Miw1MS44OWgwYTQuODMsNC44MywwLDEsMC05LjQxLDIuMTdoMGE0LjgzLDQuODMsMCwwLDAsNS43OSwzLjYybC4wNiwwLDMuNjgtNC44NEE0Ljk0LDQuOTQsMCwwLDAsMjAuODIsNTEuODlaIi8+PHBhdGggY2xhc3M9ImYiIGQ9Ik0yMC45NCw1Mi44MmwtMy42OCw0Ljg0QTQuODMsNC44MywwLDAsMCwyMC45NCw1Mi44MloiLz48L3N2Zz4='
var OrderDetailsComment = "<table class='pointer OrderItemsTable table table-hover'>" +
    "<thead>" +
    "<tr class='alert alert-success'>" +
    "<td>Adet</td>" +
    "<td>Ölçü</td>" +
    "<td>Renk</td>" +
    "<td>Tip</td>" +
    "</tr>" +
    "</thead>";
var ConnectionError = "<div style='font-size:18px;padding-top:200px;' class='text-center'><div class='fa fa-2x fa-shield'></div>" +
    "<br>İnternet Bağlantı Hatası<br> Çevrimiçi bağlantı kuramıyoruz. <div class='clearfix'></div>" +
    " <div style='background:url(//'css/img/bekle.gif//');width:24px;height:24px;display:inline-block'></div>";
var OrderDetailEditHTML = "<div onclick=\"Layout('OrderRepair','Düzenle / Oluştur')\" class='Wnow btn btn-primary'>" +
    "Sipariş Detayı Oluştur <i class='pad10 fa fa-plus'></i></div>";
function FileSizeError() {
    $(".dialog__body").html('<div class="col-md-4"></div><div class="col-md-4"><img src="' + Offline + '" /></div> <div class="col-md-4"></div> <div class="col-md-12 text-center">Dosya boyutu sınırı aştı farklı bir dosya eklemeyi deneyin.</div> ');
    $(".modal").removeClass("hide"); $(".modal").modal("show"); $(".modal").addClass("show");
}
var CallOutStart = "<div class='ms-CalloutExample h30 '> <div class='ms-Callout ms-Callout--arrowLeft ms-Callout--OOBE is-hidden'> <div class='ms-Callout-main'> <div class='ms-Callout-header'> <p class='ms-Callout-title'> </p> </div> <div class='ms-Callout-inner'> <div class='ms-Callout-content'> <p class='ms-Callout-subText'>";
var CallOutBtn = "</p> </div> </div> </div> </div> <div class='ms-CalloutExample-button'><button class='ms-Button info'>";
var CallOutEnd = "</button></div><br /> </div>";