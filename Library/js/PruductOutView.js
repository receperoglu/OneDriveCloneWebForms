function PruductOutView(json, ArticelId) {
    var Result = "";
    $.each(JSON.parse(json), function (i, z) {
        var SaveBtn = "data-orderid='" + z.OrderId + "' data-saletype='" + z.SaleTypeId + "' data-corpid='" + z.CorpId + "'  data-articelid='" + ArticelId + "'";
        Result += "<div data-orderid='" + z.OrderId + "' class='clearfix OrderRow' dataid='Kalem" + z.OrderId + "'>" +
            "<div class='col-md-1 fleft'>" +
            "<input type='text' placeholder='" + z.Piece + " Adet'   data-id='" + z.OrderId + "' class='Piece form-control'/>" +
            "</div>" +
            "<div class='col-md-1 fleft'>" +
            "<input type='text' placeholder='Ağırlık' data-id='" + z.OrderId + "' class='Weight form-control'/>" +
            "</div>" +
            "<div class='col-md-1 fleft'>" +
            "<input type='text' placeholder='" + z.Dimensions + "' class='form-control'/>" +
            "</div>" +
            "<div class='col-md-6 fleft'>" +
            "<span  >" + z.Color + " " + z.ProductTypeName + "</span>" +
            "</div>" +
            "<div class='col-md-1 text-right fleft'>" +
            "<span class='btn btnoutlineprimary Gramaj" + z.OrderId + "'></span>" +
            "</div>" +
            "<div class='col-md-2 text-right fleft'>" +
            "<span  " + SaveBtn + " class='Transfer TransferBTN ms-Button ms-Button--primary'>" +
            " <i class=' ico" + z.OrderId + "  ButtonIcon icon-93'></i>" +
            " <span data-orderid='" + z.OrderId + "' class='transfersavetext'>Kaydet</span>" +
            " </span></div></div>" +
            "<hr>"
    });

    return Result;
}