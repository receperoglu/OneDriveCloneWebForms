
$(document).ready(function () {
    $.fn.replaceWithTag = function (tagName) {
        var result = [];
        this.each(function () {
            var newElem = $('<' + tagName + '>').get(0);
            for (var i = 0; i < this.attributes.length; i++) {
                newElem.setAttribute(
                    this.attributes[i].name, this.attributes[i].value
                );
            }
            newElem = $(this).wrapInner(newElem).children(0).unwrap().get(0);
            result.push(newElem);
        });
        return $(result);
    };
    $('form').replaceWithTag('div');

    var select = $("[class^='col-md']");     
    select.addClass("fleft");
    setTimeout(function () {
        $("body").removeClass("effect")
        $(".SSOrder").html(LoadingHTML)

        if (/Mobi|Tablet|iPad|iPhone/.test(navigator.userAgent)) {
            $(".OptionsNew").hide();
            $("#MainWrapper").addClass("col-xs-12");
            $(".row").removeClass("row");
            $("#Contents").removeClass("col-md-9");
            $(".col-md-12").addClass("col-xs-12").removeClass("col-md-12");
            $(".col-md-9").addClass("col-xs-9").removeClass("col-md-9");
            $(".col-md-6").addClass("col-xs-12");
            $(".col-md-6").removeClass("col-md-12");
            $(".col-md-4").addClass("col-xs-4").removeClass("col-md-4");
            $(".col-md-3").addClass("col-xs-3").removeClass("col-md-3");
            $(".col-md-2").addClass("col-xs-2").removeClass("col-md-2");
            $("body").attr("data-platform", "mobile");
            $(".LongName").hide();
            $(".ShortName").removeClass("hide");
        }
        else {
            var a = $(document).outerWidth();
            if (a < 1368) {
                $(".fa-2x").removeClass("fa-2x");
                $("#Contents").removeClass("col-md-9");
                $(".col-md-12").addClass("col-xs-12");
                $(".col-md-9").addClass("col-xs-9")
                $(".col-md-6").addClass("col-xs-6")
                $(".col-md-4").addClass("col-xs-4")
                $(".col-md-3").addClass("col-xs-3")
                $(".col-md-2").addClass("col-xs-2")
                $(".LongName").hide();
                $(".ShortName").removeClass("hide");
            }
            $("body").attr("data-platform", "desktop");
        }

    }, 1000)
    
    $.each(SalesType, function (i, z) {
        $(".SalesType").append("<option value='" + z.Id + "'>" + z.Name + "</option");
    });
    $.each(CorpList, function (i, z) {
        var NewCorpName = z.Name;
        var NewName = NewCorpName.split(" ");
        var CorpName = NewName[0] + " " + NewName[1] + " " + NewName[2];
        $(".CorpList").append("<option value='" + z.Id + "'>" + CorpName + "</option");
    });
    $.each(ProductType, function (i, z) {
        $(".ProductType").append("<option value='" + z.Id + "'>" + z.Name + "</option");
        $(".OrderProductType ").append("<option value='" + z.Id + "'>" + z.Name + "</option");
    });   
    $(document).on('mouseover', '.btnwarning', function () {   
        $(this).html("Kaldır");
    })
    $(document).on('mouseout', '.btnwarning', function () {
        $(this).html("Kaydedildi");
    })
    $(document).on('click', '.DetailsOrder', function () {  //ORJİNAL
        $(".od-Search").fadeOut();
        $(".od-BasePage-search").removeClass("w100");

        $(".Pictures").css("background", "url(css/img/bekle.gif) no-repeat center");
        var ArticelId = $(this).attr("data-articelid");
        var Articel = $(this).attr("data-articelname");
        $("body").attr("data-articelname", Articel);
        $("body").attr("data-corpname", $(this).attr("title"));
        $("body").attr("data-articelid", ArticelId);
        $("body").attr("data-corpid", $(this).attr("data-corpid"));
        $("body").attr("data-saletype", $(this).attr("data-saletype"))
        $(".DetailsOrder").removeClass("ActiveOrder");
        $(".ArticelObj").removeClass("ActiveArticelRow")
        $(".ArticelObj[data-articelid=" + ArticelId + "]").addClass("ActiveArticelRow");
        $(this).addClass("ActiveOrder");
        $(".LongName").hide();
        $(".ShortName").removeClass("hide");      
        $(".DetailOrders").html("");
        $(".SSOrder").html(LoadingHTML)
        $("#FirstScreen").removeClass("col-md-12").removeClass("col-md-3").addClass("col-md-4");
        $("#SecondScreen").removeClass("col-md-4").removeClass("hide").addClass("col-md-8").show();
        $(".SubTools").fadeIn();
        $(".ms-FocusZone").css("float", "right");
        PlatformControl($("body").attr("data-platform"));
        $('.clamped-text').html(Articel);
        $(".ArticelNameHead").html("<div class='text-capitalize'>" + Articel + " </div>");
        $(".resources-action-bar").css({ "background-repeat": "none", "background-image": "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' version='1.1' height='60px' width='100%'><text x='0' y='15' fill='grey' font-size='20px'>" + Articel + " </text></svg>" })
        setTimeout(function () {
            OrderDetail(ArticelId);
            $('.OrderDetailTable').tablesorter();
            var WhichWizard = $("body").attr("data-activewizard")
            if (WhichWizard == "OrderRepair") {
                $(".CloseLayout").click();
            }
            ArticelNotes();
            AllMotion();
        }, 50)
    });
    $('.StatusArticel').click(function () {
        $(this).css("display", "none");
        $(".StatusUpdating").css("display", "block");
        $.ajax({
            url: "post/ArticelStatusChange.ashx",
            type: "POST",
            data: { "ArticelId": $("body").attr("data-articelid") },
            success: function (result) {
                $(".StatusUpdating").css("display", "none");
            },
            error: function (err) {
                Error();
            }
        });
    });
    $(document).on('click', '.MotionHead', function () {

        $('.MotionDetails').toggle();
    });
    $(document).on('click', '.FilesHead', function () {

        $('.Files').toggle();
    });
    $(document).on('click', '.Transfer', function () {
        var O = $(this);
        var OrderId = O.attr("data-orderid")
        var Piece = $(".Piece[data-id='" + OrderId + "']").val();
        var Weight = $(".Weight[data-id='" + OrderId + "']").val();
        var fdata = new FormData();
        fdata.append('CorpId', O.attr("data-corpid"));
        fdata.append('OrderId', O.attr("data-orderid"));
        fdata.append('ArticelId', O.attr("data-articelid"));
        fdata.append('WayBillId', $(".irsaliyeno").val());
        fdata.append('Comment', "Açıklama Yok Sonra Ekleyebiliriz.");
        fdata.append('SaleType', $("body").attr("data-saletype"));
        fdata.append('Piece', Piece);
        fdata.append('Weight', Weight);       
        if (O.attr("data-transferid")) {
            fdata.append('Type', "Update");
            fdata.append('TransferId', O.attr("data-transferid"));
            TransferData(fdata, OrderId)
        }
        else {
            fdata.append('Type', "New");
            fdata.append('TransferId', "Empty");
            TransferData(fdata, OrderId)
        }

      
       //LocalStorageAddOrder(OrderId,O);
    });
    function LocalStorageAddOrder(OrderId,O) {

        var Kalem = {
            'Piece': $(".Piece[data-id='" + OrderId + "']").val(),
            'Weight': $(".Weight[data-id='" + OrderId + "']").val(),
            'ArticelId': O.attr("data-articelid"),
            'OrderId': O.attr("data-orderid"),
            'WayBillId': $(".irsaliyeno").val(),
            'CorpId': O.attr("data-corpid"),
        };
        if (localStorage.getItem('Kalemler')) {
            localStorage.setItem('Kalemler', localStorage.getItem('Kalemler') + "," + JSON.stringify(Kalem));
        }
        else {
            localStorage.setItem('Kalemler', JSON.stringify(Kalem));
        }
    }
    $(document).on('click', '.LayoutHead', function () {
        var genislik = $("#LayoutRight").width();
        var total = genislik + 100;
        document.getElementById("LayoutRight").style.width = total + "px";
    });
    $(document).on('click', '.KalemEkle', function () {
        $("#KalemlerListe").append("<tr><td>" + $(".adet").val() + " Ad</td><td>" + $(".agirlik").val() + " Kg</td><td>" +
            $(".aciklama").val() + " " + $(".ProductType").attr("data-value") + "</td><td>" + $(".siparisno").val() +
            "</td><td><i class='fa fa-minus'></i></td></tr>");
        if (localStorage.getItem('Kalemler')) {
            var Kalem = {
                'adet': $(".adet").val(),
                'agirlik': $(".agirlik").val(),
                'aciklama': $(".aciklama").val(),
                'siparisno': $(".siparisno").val()
            };
            localStorage.setItem('Kalemler', localStorage.getItem('Kalemler') + "," + JSON.stringify(Kalem));
        }
        else {
            var Kalem = {
                'adet': $(".adet").val(),
                'agirlik': $(".agirlik").val(),
                'aciklama': $(".aciklama").val(),
                'siparisno': $(".siparisno").val()
            };
            localStorage.setItem('Kalemler', JSON.stringify(Kalem));
        }
    });
    $(document).on('click', '.Picture', function () {
        $("body").addClass("notoverflow");
         var randomsayi           = +(new Date).getTime();
        $(".Picture").removeClass("ActivePicture");
        $('.PicturePreview').fadeIn();
        $('#PictureCanvas').fadeIn();
        $("#FullScreen").attr("src", 'dosyalar/' + $(this).attr("data-url") + "?" + randomsayi);
        $("#FullScreen").attr("data-url", $(this).attr("data-url"));
        $("#FullScreen").attr("data-id", $(this).attr("data-id"));
        $(this).addClass("ActivePicture");
        $(".resources-action-bar").addClass("OpenedPictureTool");
        $(".resources-action-bar").removeClass("ClosedPictureTool");
    });
    $(document).on('click', '.RemoveOrder', function () {
        var orderid = $(this).attr("data-orderid");
        $("tr.Order[data-orderid=order" + orderid + "]").remove();
        var formData = new FormData();
        formData.append("OrderId", orderid )
        $.ajax({
            type: "POST",
            url: "post/OrderDelete.ashx",
            contentType: false,
            processData: false,
            data: formData,
            success: function (json) {

            }
        })
    });

    $(document).on('click', '.ArticelDelete', function () {
    
        var formData = new FormData();
        formData.append("ArticelId", $(this).attr("data-articelid"))
        $.ajax({
            type: "POST",
            url: "post/ArticelDelete.ashx",
            contentType: false,
            processData: false,
            data: formData,
            success: function (json) {

            }
        })
    })
    $(document).on('click', '.ArticelNameHead', function () {
        if ($("#SecondScreen").hasClass("col-md-12")) {
            $("#FirstScreen").show();
            $("#SecondScreen").removeClass("col-md-12");
            $("#SecondScreen").addClass("col-md-8");
        } else {
            $("#FirstScreen").hide();
            $("#SecondScreen").addClass("col-md-12");
            $("#SecondScreen").removeClass("col-md-8");
            $(".PartHead").css("padding", "10px");
        }
    });
    $(document).on('click', '.FileLink', function () {
        $("body").addClass("notoverflow");
 
        var link = $(this).attr("data-link");
        var Type = $(this).attr("data-type").toLocaleLowerCase();
        if (Type == "mp4") {
            $(".VideoCanvas").fadeIn();
            $("#Playfile").html("");
            var source = "http://localhost" + link;
            $("#Playfile").append("<source src='" + source + "' autoplay type='video/mp4'>");
            document.getElementById("Playfile").play();
        } else {
            $(".modal").modal("show");
            $(".dialog__body").html("<iframe src='../" + link + "' style='width:100%;height:100vh;border:0'></iframe>");
            $(".modal__content").css("width", "100%");
        }
    });
    $(".SearchInput").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#OrderTable tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
            if ($('#OrderTable').height() == 0) {
                $(".SearchResultNo").show();
            } else {
                $(".SearchResultNo").hide();
            }
        });
    });
    function OrderDetail(ArticelId) {
        $(".CallOutScript").remove();//MS CallOutScript Sınıfına ait javascript kodunu sayfadan kaldırır.
        GetFiles(ArticelId);
        GetYarn(ArticelId);
        var formData = new FormData();
        formData.append("ArticelId", ArticelId)
        $.ajax({
            type: "POST",
            url: "post/OrderDetail.ashx",
            contentType: false,
            processData: false,
            data: formData,
            success: function (json) {
                var Result = OrderDetailView(json)
                if (Result=="") {
                    $(".OrderDetailsComment").html("Henüz sipariş detayı girilmemiş.<br><br> " +
                        "<span data-articelid='" + ArticelId + "'   class='ArticelDelete btn btn-warning'>Bu Siparişi Sil</span>");

                } else {

                    $(".OrderDetailsComment").html( OrderDetailsComment+Result + "</table>");
                    $(".OrderDetailTable").tablesorter();
                 
                    
                        $("body").append("<script class='CallOutScript' type='text/javascript'> var CalloutExamples = document.querySelectorAll('.ms-CalloutExample'); for (var i = 0; i < CalloutExamples.length; i++) { var Example = CalloutExamples[i]; var ExampleButtonElement = Example.querySelector('.ms-CalloutExample-button .ms-Button'); var CalloutElement = Example.querySelector('.ms-Callout'); new fabric['Callout']( CalloutElement, ExampleButtonElement, 'right' ); } </script>")
                     
                }          
               
                
            },
            error: function () {
                Error();
            }
        });
    }
    function GetYarn(ArticelId) {

        var formData = new FormData();
        formData.append("Multiple", ArticelId)
        $.ajax({
            type: "POST",
            url: "post/YarnDetail.ashx",
            contentType: false,
            processData: false,
            data: formData,
            success: function (json) {
                var R = "";
                if (R == "") {
                    $(".Yarn").hide();

                }
                else {
                    $(".Yarn").show();
                json = JSON.parse(json);
                $.each(json, function (i, z) {
                    R += "<tr> <td>" + z.Mark + "</td>" +
                        "<td>" + z.OutId + "</td>" +
                        "<td>" + z.Type + "</td>" +
                        "<td>" + z.Part + "</td>" +
                        "<td> " + z.Color + "</td>" +
                        "<td> " + z.Person + "</td>" +
                        "<td> " + z.Weight + " KG</td>" +
                        "</tr>";
                });
               
                $("#YarnTable").html(R);
                $(".YarnDetailTable").tablesorter();
                }
            },
            error: function () {
                Error();
            }
        });

    }
    function GetFiles(ArticelId) {
        var formData = new FormData();
        formData.append("ArticelId", ArticelId)
        $.ajax({
            type: "POST",
            url: "post/OrderPictures.ashx",
            contentType: false,
            processData: false,
            data: formData,
            success: function (json) { 
                $(".Files").html(PicturesView(JSON.parse(json)));  
                CheckImg()
            },
            error: function () {
                Error();
            }
        });
    }
    function TransferData(fdata, OrderId) {
        
        $.ajax({
            type: "POST",
            url: "post/AddWayBill.ashx",
            contentType: false,
            processData: false,
            data: fdata,
            success: function (transferid) {
                $(".Transfer[data-orderid='" + OrderId + "']").attr("data-transferid", transferid);
                $(".Transfer[data-orderid='" + OrderId + "']").addClass("btnwarning");
                $(".transfersavetext[data-orderid='" + OrderId + "']").html("Kaydedildi")
                $('.ico' + OrderId).hide();                
            },
            error: function () {
                
            },            
            statusCode: {

                404: function () {
                    console.log("-1-1-1-1 WE GOT 404!");
                },
                200: function () {
                    $(".AjaxError").show();
                    $(".AjaxError").addClass("alert-success");
                    $(".AjaxError").removeClass("alert-danger");
                    $(".AjaxError").html("İşlem Başarılı");
                },
                413: function () {
                    $(".AjaxError").show();
                    $(".AjaxError").html("Servis Hatası");
                },
                500: function () {
                    $(".AjaxError").show();
                    $(".AjaxError").html("Servis Hatası");
                    $(".AjaxError").addClass("alert-danger");
                    $(".AjaxError").removeClass("alert-success");

                }
            }
        })
    }    
    $('#NewSellCorpList').change(function () {
        $("#NewSellOrderList").html("");
        var ArticelId = $(this).val();
        OrderToInputForOutPut(ArticelId);
    });
    $(document).on('focusout', '.Weight', function () {
        var OrderId = $(this).attr("data-id");
        var Weight = parseInt($(this).val());
        var Piece = $(".Piece[data-id=" + OrderId + "]").val();
        var Gramaj = (Weight / Piece).toFixed(3)
        if (Gramaj == "NaN") {
            $(".Gramaj" + OrderId).html("");
        } else {
            $(".Gramaj" + OrderId).html(Gramaj+" GR");
        }
    })
   



    $(document).on('dblclick', '.SiparisAdet', function () {
       
        var FireYuzdesi = $(".FireYuzdesi").attr("data-id")
        var GercekAdet = $(".SiparisAdet").val();
        var sayi = parseFloat(FireYuzdesi) * parseFloat( GercekAdet);
        sayi = (GercekAdet * 1) + (GercekAdet * FireYuzdesi / 100);
        $(".SiparisAdet").val(sayi.toString())
      
    })
});


function ArticelListTable() {
    var List = "";
    var CallOutStart = "<div class='ms-CalloutExample'> <div class='ms-Callout ms-Callout--arrowLeft ms-Callout--OOBE is-hidden'> <div class='ms-Callout-main'> <div class='ms-Callout-header'> <p class='ms-Callout-title'> </p> </div> <div class='ms-Callout-inner'> <div class='ms-Callout-content'> <p class='ms-Callout-subText'>";
    var CallOutBtn = "</p> </div> </div> </div> </div> <div class='ms-CalloutExample-button'><button class='ms-Button info'>";
    var CallOutEnd = "</button></div><br /> </div>";


    $("body").append(CallOutStart + CallOutBtn + CallOutEnd);
    $.each(ArticelList, function (i, z) {
        var NewCorpName = z.CorpName;
        var NewName = NewCorpName.split(" ");
        var CorpName = NewName[0] + " " + NewName[1];
        var Articel = z.Name;
        var ArticelId = z.Id;
        var Detail = "data-Articelname='" + Articel + "' data-saletype='" + z.SaleType + "' data-corpid='" + z.CorpId +
            "' data-CorpName='" + CorpName + "' title='" + NewCorpName + "'  data-articelid='" + ArticelId + "'";
        var DetailButton = "<i   " + Detail + "  class='DetailsOrder pointer DetailFind Icon SearchIcon css-43'></i>";
        List += "<tr class='ArticelObj' data-articelid='" + ArticelId + "' title='" + CorpName + "'><td onclick='GetPopupCorpDetail(" + z.CorpId + ")'>" +
            "<span class='LongName'>" + CallOutStart + CallOutBtn + NewCorpName + CallOutEnd + "</span><span class='ShortName hide'>" +
            CorpName + "</span></td><td>" +
            "<span class='OurArt'>AT-" + ArticelId + " </span>" + Articel + "</td><td>" +
            z.CreatedDate + "</td><td>" +
            DetailButton + "</td></tr>";
    });

    $("#OrderTable").html(List);
    $("body").append("<script class='CallOutScript' type='text/javascript'> var CalloutExamples = document.querySelectorAll('.ms-CalloutExample'); for (var i = 0; i < CalloutExamples.length; i++) { var Example = CalloutExamples[i]; var ExampleButtonElement = Example.querySelector('.ms-CalloutExample-button .ms-Button'); var CalloutElement = Example.querySelector('.ms-Callout'); new fabric['Callout']( CalloutElement, ExampleButtonElement, 'right' ); } </script>")

}
setTimeout(ArticelListTable, 10)
$(document).on('click', '.NewArt', function () {

    $("body").addClass("notoverflow");
    $("#ProductModal").removeClass("hide");
    $(".ProductOut").hide();
    $(".ProductCreate").show();
  
})
function Layout(Type, Head) {

    $(".TopBarObject").hide();
    $(".TopBarObject:last-child").show();
    $(".LayoutType").hide();
    $(".popover").remove();
    $("#" + Type + "").show();
    $("body").attr("data-activewizard", Type);
    $("#LayoutRight").css("top", "85px");
    document.getElementById("LayoutRight").style.width = "100%";
    $(".LayoutHead").html(Head);
    if (Type == "Pictures") {
        $("#FirstScreen").addClass("col-md-4", 300).removeClass("col-md-6", 300);

    }

    if (Type == "ShareNow") {
        document.getElementById("LayoutRight").style.width = "300px";
        var link = "";
        var b = $("body");
        if (b.attr("data-platform") == "desktop") {
            link = "https://api.whatsapp.com/send?text=http://";
            $(".ShareWhatsapp").attr("target", "_blank");
        } else {
            link = "whatsapp://send?text=http://";
        }
        var ArticelName = $(".ArticelNameHead >.text-capitalize").html();
        $(".ShareWhatsapp").attr("href", link + window.location.hostname + "/D.aspx?id=" + b.attr("data-articelid"));
        $(".ShareMail").attr("href", "mailto:mailadresi?subject=" + ArticelName + ";&body=http://" + window.location.hostname + "/D.aspx?id=" + b.attr("data-articelid"));
    }
   
    if (Type == "OrderRepair") {
        $(".ns-box-inner").html("Lütfen Adet/Ölçü bilgilerini eksiksiz giriniz.");
    }


}
function ProductModal(Type) {
    $(".ProductModalSub").hide();
    $("#ProductModal").removeClass("hide");
    if (Type == "ProductOut") {
        $("body").addClass("notoverflow");      
        $(".ProductName").html($(".ActiveOrder").attr("data-articelname"));
        var ArticelId = $("body").attr("data-articelid");
        var formData = new FormData();
        formData.append("ArticelId", ArticelId)
        $.ajax({
            type: "POST",
            url: "post/OrderDetail.ashx",
            contentType: false,
            processData: false,
            data: formData,
            success: function (json) { 
                $(".ProductOutList").html(PruductOutView(json, ArticelId));
            },
            error: function () {
                Error();
            }
        })

    }
    
    $("." + Type).show();
}

function OneOrderEdit(OrderId,Dimensions,Color,Piece,ProductTypeName) {
    ProductModal("OneProductEdit");
    $(".OneOrderEditPiece").val(Piece)
    $(".OneOrderEditDimensions").val( Dimensions)
    $(".OneOrderEditColor").val(Color)
    $("#OneOrderEditPiece").attr("data-orderid", OrderId)  

}
function NewOrder() {
    $(".ArticelCreateSuccess").html("");
    var formData = new FormData();
    formData.append('CorpId', $(".CorpList").attr("data-id"));
    formData.append('Piece', $(".SiparisAdet").val());
    formData.append('ProductType', $(".Order.ProductType").attr("data-id"));
    formData.append('SaleType', $(".SalesType").attr("data-id"));
    formData.append('Dimensions', $(".SiparisOlcu").val());
    formData.append('Color', $(".SiparisRenk").val());
    formData.append('Articel', $(".ArticelName").val());
    formData.append('ArticelId', $("body").attr("data-newarticelid"));
    var NewOrder = "0";
   
     $.ajax({
        type: "POST",
        url: "post/AddOrder.ashx",
        contentType: false,
        processData: false,
        data: formData,
         success: function (result) {
             
             NewOrder = result;
             $("#OrderList").append("<tr data-OrderId='order" + NewOrder + "' class='Order'><td>" +
                 $(".SiparisAdet").val() + " Ad</td><td>" +
                 $(".SiparisOlcu").val() + " </td><td>" +
                 $(".Order.ProductType").attr("data-value") + "</td><td>" +
                 $(".SiparisRenk").val() + "</td><td class='RemoveOrder' data-orderid='" + NewOrder + "'>" +
                 "<i title='Kaldır' class='pointer ms-Button-icon icon-73'></i></td></tr>");
        },
        error: function () {
            Error();
        }
     });

   
   
     
}
function ArticelAdd() {
    $(".ArticelCreate").hide();
    $(".ArticelLoading").show();
    var CorpId = $(".CorpList").attr("data-id");
    var SalesType = $(".SalesType").attr("data-id");
    var ArticelName = $(".ArticelName").val();
    $(".SalesType").attr("data-id", SalesType)      
    var formData = new FormData();
    formData.append('CorpId', CorpId);
    formData.append('SaleType', SalesType);
    formData.append('Articel', ArticelName);
    $.ajax({
        type: "POST",
        url: "post/AddArticel.ashx",
        contentType: false,
        processData: false,
        data: formData,
        success: function (NewArticelId) {
            $(".ArticelLoading").hide();
            $("body").attr("data-newarticelid", NewArticelId);
            $(".CorpList").attr("data-value")              
            $(".ArticelCreateSuccess").html( ArticelName + " - "+ $(".CorpList").attr("data-value"));
            $(".FirstArticelStep").slideUp();
            $(".SecondArticelStep").slideDown();
            $(".Order.CorpList").val(CorpId);
            $(".SiparisNo").val(ArticelName);
            $(".Order.CorpList").attr("disabled", "disabled")
            $(".SiparisNo").attr("disabled", "disabled")
            $(".Order.SalesType").attr("disabled", "disabled")
            $("body").attr("data-articelid", NewArticelId);
            $(".Order.SalesType").val(SalesType);
            //Layout('NewOrder', 'Yeni Ürün Çıkışı');
        },
        error: function () {
            Error();
        }
    });
}

$(document).on('click', '.MotionData', function () {
    $(".dialog__body").html("");
    $(".popover").remove();
    var OrderPiece = $(this).attr("data-piece")
    var product=$(this).attr("data-product")
    var OrderId = $(this).attr("data-orderid")
    var formData = new FormData();
    formData.append("Type", "One")
    formData.append("Id", OrderId)
    $.ajax({
        type: "POST",
        url: "post/WayBillMotion.ashx",
        contentType: false,
        processData: false,
        data: formData,
        success: function (json) {
            var Result = "";
            var count = 0;
            var SentProduct = 0;
            if (json != "") {
                $.each(JSON.parse(json), function (i, z) {
                    SentProduct += parseInt(z.Piece);
                    Result += "<tr><td><b> </b> " + z.Piece + "</td> " +
                        "<td> " + z.Weight + " KG </td> " +
                        "<td> " + z.CreatedDate + "</td>  " +
                        "<td><span onclick='OpenWayBill(" + z.WayBillId + ");'>  " + z.WayBillId + " </span></td></tr> ";
                    count++;
                });
                var DiffPiece = parseInt(OrderPiece) - parseInt(SentProduct);

                SentProduct =SentProduct + " Adet. "+ count + " Kez Sevk Edildi. <br> Kalan " + DiffPiece + " Adet";
                
            }
          
            if (SentProduct == 0) {
                Result = "<b>Hiç irsaliye bilgisi yok</b>";
                SentProduct = "Çıkış Yapılmamış";
                
             
                $(".ms-Callout-subText").html("");
                 
            } 


      
            

            $(".ms-Callout-title").html(SentProduct + "<br>"+product )
            $(".ms-Callout-subText").html("<table class='table  table-hover alert alert-primary'>" + MotionWayBillTableHead + Result + "</table>");

        },
        error: function (err) {
            Error();
        }
    })
})
function RotatePicture() {
    var Path = "dosyalar/" + $("#FullScreen").attr("data-url");
    var PictureName = $("#FullScreen").attr("data-url");
    var PictureId = $("#FullScreen").attr("data-id");
    $(".ma5-imgbox").css("background-color", "white")
    $("#PictureControllers").html("<span class='fa fa-refresh fa-spin fa-2x fa-fw'></span>");
    $("#" + PictureId).css('background-image', 'url("css/img/bekle.gif")');
    $("#FullScreen").attr('src', 'url("css/img/bekle.gif")');
    $.ajax({
        url: "post/DosyaSistem/ResimDondur.ashx",
        type: "POST",
        data: { "Rotate": "Left", "Path": Path, "PictureName": PictureName, "PictureId": PictureId },
        success: function (id) {
            var RandomNumber = +(new Date).getTime();
            $(".ma5-imgbox").append(OkeyGif + RandomNumber + "'/>");
            $(".ma5-active").removeClass("Processing");
            setTimeout(
                function dondurmetamam() {
                    $("#PictureControllers").html(DondurHTML);
                    $("#FullScreen").attr("src", Path + "?" + RandomNumber);
                    $(".okey").remove();
                    $("#" + id).css('background-image', 'url("css/img/bekle.gif")');
                    $("#" + id).css('background-image', 'url(thumbs/' + PictureName + '?' + RandomNumber + ')');
                    $(".ma5-imgbox").css("background-color", "black");
                }, 500);
        },
        error: function (err) {
            Error();
        }
    });

}

function SearchNow() {
   
    var SearchType = $(".SearchType").attr("data-id");
    if (SearchType == "1") {
        var formData = new FormData();
        formData.append('SearchWord', $(".SearchWord").val());
        $.ajax({
            type: "POST",
            url: "post/WayBillNumberSearch.ashx",
            contentType: false,
            processData: false,
            data: formData,
            success: function (result) {
                var Result = "";
                $.each(JSON.parse(result), function (i, z) {
                    Result += "<tr><td>" + z.ArticelName + "   </td><td>" + z.CorpName + " </td><td>" + z.Piece + " Adet </td> " +
                        "<td> " + z.Weight + " KG </td><td> " + z.CreatedDate + "</td> " +
                        "<td> <i onclick=\"OpenPhoto('" + z.Path + "')\" class='fa fa-photo fontsize14px'></i></td></tr> ";
                });
                $(".SearchResult").html(tablesuccess + SearchResultTableHead + Result + "</table>")
            },
            error: function () {
                Error();
            }
        });
    }
}
function OpenWayBill(WBID) {
    $("#FullScreen").attr("src", 'css/img/not-available.png');
    var formData = new FormData();
    formData.append('WayBillId', WBID);
    $.ajax({
        type: "POST",
        url: "post/WayBillPhoto.ashx",
        contentType: false,
        processData: false,
        data: formData,
        success: function (json) {
            if (json != "") {
                json = 'dosyalar/' + json
                $("img#FullScreen").attr("src", json);
            }
            OpenFullScreenModal();
        },
        error: function (err) {
            Error();
        }
    })
} 
function AllMotion() {
    $(".AllActivities").html("");
    var formData = new FormData();
    formData.append("Type", "All")
    formData.append("Id", $("body").attr("data-articelid"))
    $.ajax({
        type: "POST",
        url: "post/WayBillMotion.ashx",
        contentType: false,
        processData: false,
        data: formData,
        success: function (json) {
            var Result = "";
          
            if (json != "") {
                var Piece = 0;
                var Weight = 0;
                $.each(JSON.parse(json), function (i, z) {
                    Piece += parseInt(z.Piece);
                    Weight += parseInt(z.Weight);
                    Result += "<tr><td><b> </b> " + z.Piece + " Ad</td> " +
                        "<td onclick='OpenWayBill(" + z.WayBillId + ");'> " + z.Weight + " KG </td> " +
                        "<td> " + z.Dimensions + "</td>  " +
                        "<td> " + z.Color + "</td>  " +
                        "<td> " + z.CreatedDate + "</td>  " +
                        "<td class='pointer'><span onclick='OpenWayBill(" + z.WayBillId + ");'>  " + z.WayBillId + " </span></td></tr> ";
                });
                $(".AllActivities").html("<h5 class='PartHead MotionHead'>Tüm Çıkışlar</h5><table class='MotionDetails table table-hover '>" +
                    WayBillTableHead + Result + "<tr><td>" + Piece + " Ad</td><td>" + Weight + " KG</td></tr></table>");
                $('.MotionDetails').tablesorter();
            }
        }
    })
} 


function GetPopupCorpDetail(CorpId) {
    $(".ms-Callout-title").html(LoadingHTML)
    $(".ms-Callout-subText").html(LoadingHTML);
    var formData = new FormData();
    formData.append("CorpId", CorpId);
  
    $.ajax({
        type: "POST",
        url: "post/CorpList.ashx",
        contentType: false,
        processData: false,
        data: formData,
        success: function (json) {
            var R = "";
            json = JSON.parse(json);
            $.each(json, function (i, z) {
                
                $(".ms-Callout-title").html(z.Name)
                $(".ms-Callout-subText").html(z.Adress +"<br><br>"+ z.VergiDairesi +" - " +z.VergiNo);
            });

            
            //$(".ProductCorpDetail").html(R);
            //$(".ProductCorpDetail").removeClass("WaitDiv")
           
        },
        error: function () {
            Error();
        }
    });
}