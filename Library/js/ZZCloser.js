function CloseModal() {
     $(".FabricModal").modal("hide");
}
 
function LeftSideClose() {
    document.getElementById("BaseClass").style.width = "0px";
};
function CloseLayoutRight() {
    document.getElementById("LayoutRight").style.width = "0px";
    $("body").removeAttr("data-activewizard");
    $(".TopBarObject").show();
    $(".TopBarObject:last-child").hide();
    $(".MainContainer").css("top", "45px");
    $(".od-Search").fadeIn();
    $(".LayoutRight").css("top", "85px");
}
function closeNav() {
    document.getElementById("LayoutRight").style.width = "0";
}
function CloseOutProductLayer() {
    $("body").removeClass("notoverflow");
    $("#ProductModal").addClass("hide");
    $(".OrderList").html("");
}

function BackFirstArea() {
    $(".ArticelObj ").removeClass("ActiveArticelRow");
    $(".DetailsOrder").removeClass("ActiveOrder");
    $("body").removeAttr("data-activewizard");
    $(".od-BasePage-search").removeClass("w100");
    $(".LongName").show();
    $(".ShortName").addClass("hide");
    $(".ms-FocusZone").css("float", "left");
    $(".SubTools").hide();
    document.getElementById("LayoutRight").style.width = "0px";
    $(".od-Search").fadeIn();
    $("#FirstScreen").addClass("col-md-12").removeClass("col-md-4");
    $("#SecondScreen").addClass("hide").removeClass("col-md-8");
    PlatformControl($("body").attr("data-platform"));

    $(".od-BasePage-search").addClass("w100")
}
function kapatslayt() {
    $("#resimdondur").hide();
    $('.ma5-imgbox').hide();
    $('#PictureCanvas').hide();
}


function ToggleOrderPictureDiv() {
    $(".OrderDetailsPictures").slideToggle();
}