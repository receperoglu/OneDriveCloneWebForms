function ToggleNotificationDiv() {
    if ($("#NotificationDiv").css("width") == "380px") {
        $("#NotificationDiv").css("width", "0px");
      
        $("#NotificationDiv").removeClass("effect")
        

    } else {
        $("#NotificationDiv").css("width", "380px");
        $("#NotificationDiv").addClass("effect")
        
       
    }
}
$(".BasePage-leftNav-Container").css({ "display": "none", "z-index": "0" });
$(document).on('click', '.IconGlobalNavButton', function () {
    if ($(".BasePage-leftNav-Container").css("display") == "block") {
        $(".BasePage-leftNav-Container").css({ "display": "none", "z-index": "0" });
    } else {
        $(".BasePage-leftNav-Container").css({ "display": "block", "z-index": "99999" });
    }
});


$(document).on('click', '#MainMenuToggle', function () {
    if ($("#MainMenu").css("display") == "block") {
        $.cookie("MenuStatus","0")
        $("#MainMenu").css({ "display": "none" }).removeClass("col-md-2");
        //$("#MainSection").removeClass("col-md-10").addClass("col-md-12")
    } else {
        $("#MainMenu").css({ "display": "block" }).addClass("col-md-2");
        $.cookie("MenuStatus", "1")
        //$("#MainSection").addClass("col-md-10").removeClass("col-md-12")

    }
});
        $("#MainSection").addClass("col-md-12")

$(document).on('click', '.SearchIcon', function () {
    $(".od-BasePage-search").addClass("w100");
    $(".ChangeView").hide();

})
$(document).on('focus', '.SearchInput', function () {
    $(".od-BasePage-search").addClass("w100");
    $(".ChangeView").hide();
    $(".SearchInput").css("padding-left", "30px !important");
    //$(".SearchIcon").hide();
    $(".od-SearchBox-iconClearWrapper").fadeIn();
});

