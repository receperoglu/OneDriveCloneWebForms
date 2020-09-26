function NewOrderAdd() {   
    var formData = new FormData();
    formData.append('CorpId', $("body").attr("data-corpid"));
    formData.append('Piece', $(".OrderPiece").val());
    formData.append('ProductType', $(".OrderProductType").attr("data-id"));
    formData.append('SaleType', $("body").attr("data-saletype"));
    formData.append('Dimensions', $(".OrderDimensions").val());
    formData.append('Color', $(".OrderColor").val());
    formData.append('Articel', $("body").attr("data-articelname"));
    formData.append('ArticelId', $("body").attr("data-articelid"));
    var NewOrder = "0";

    $.ajax({
        type: "POST",
        url: "post/AddOrder.ashx",
        contentType: false,
        processData: false,
        data: formData,
        success: function (result) {

            NewOrder = result;
            $("#NewOrderList").append("<tr data-OrderId='order" + NewOrder + "' class='Order'><td>" +
                $(".OrderPiece").val() + " Ad</td><td>" +
                $(".OrderDimensions").val() + " </td><td>" +
                $(".OrderProductType").attr("data-value") + "</td><td>" +
                $(".OrderColor").val() + "</td><td class='RemoveOrder' data-orderid='" + NewOrder + "'>" +
                "<i title='Kaldır' class='pointer ms-Button-icon icon-73'></i></td></tr>");
        },
        error: function () {
            Error();
        }
    });




}