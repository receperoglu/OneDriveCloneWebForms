function OrderDetailView(json) {
    var Result = "";    
      
      
        $.each(JSON.parse(json), function (i, z) {
            Result += "<tr data-piece='" + z.Piece + "' data-product=' "
                + z.Dimensions + " "
                + z.Color + " "
                + z.ProductTypeName
                + "' class='MotionData' data-orderid='" + z.OrderId + "'>"
                +"<td>" + CallOut(z.Piece, z.Metrics) +  " </td>" +
                "<td>" + z.Dimensions + "</td>" +
                "<td> " + z.Color + "</td>" +
                "<td> " + z.ProductTypeName + "</td>" +
                "<td><i onclick=\"OneOrderEdit('" + z.OrderId + "','" + z.Dimensions + "','" + z.Color + "','" + z.Piece+  "','" + z.ProductTypeName + "')\" title='Düzenle' data-icon-name='Edit' role='presentation' aria-hidden='true' class='ms-Button-icon fleft icon-73'></i></td>" +
                "</tr>";
           
        });
        
    return Result;

}

var CallOutStart = "<div class='ms-CalloutExample'> <div class='ms-Callout ms-Callout--arrowLeft ms-Callout--OOBE is-hidden'>" +
    " <div class='ms-Callout-main'> <div class='ms-Callout-header'> <p class='ms-Callout-title'> </p> </div> " +
    "<div class='ms-Callout-inner'> <div class='ms-Callout-content'> <p class='ms-Callout-subText'>";
function CallOutBtn(Piece) {

    return "</p> </div> </div> </div> </div> <div class='ms-CalloutExample-button'>" + "<button data-piece='" + Piece+"' class='ms-Button info'>";
}
var CallOutEnd = "</button></div><br /> </div>";
function CallOut(Piece,MetricType) {

    return CallOutStart + CallOutBtn(Piece) + Piece + " "+MetricType + CallOutEnd;
}