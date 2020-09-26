function OpenSettings() {

    $("body").addClass("notoverflow ");
    $("#Settings").removeClass("Settings").addClass("SettingsActive").addClass("effect");
}
function MuneToggle() {
    var Status = $("body").attr("data-status");
    if (Status == "0") {
        $("#Contents").addClass("m300");
        $("#Navigator").addClass("l300");
        $("body").attr("data-status", "1");
    } else {

        $("#Contents").removeClass("m300");
        $("#Navigator").removeClass("l300");
        $("body").attr("data-status", "0");
    }
}



function CloseSettings() {

    $("body").removeClass("notoverflow ");


    $("#Settings").addClass("Settings").removeClass("SettingsActive").removeClass("effect");

}

function SearchInputDelete() {

    $(".SearchInput").val("");
    $(".DetailsOrder").css("display", "table-row")
    $(".od-BasePage-search").removeClass("w100");
    $(".ChangeView").show();
    $(".SearchInput").css("padding", "8px 8px 8px 41px");
    $(".SearchIcon").fadeIn();
    $(".od-SearchBox-iconClearWrapper").fadeOut();
}



$(document).ready(function () {
    $("#Settings").attr("src", "https://statu.space/abi/ExtendedModalOneDrive.html");
    $(document).on('click', '#FullScreen', function () {
        $("#PictureCanvas").fadeToggle();
        $(".resources-action-bar").fadeToggle();
        $(".PictureShare").fadeOut();
    });


    //$(".Settings").load("../.ExtendedModalOneDrive.html", function (response, status, xhr) {
    //    if (status == "error") {
    //        var msg = "Sorry but there was an error: ";
    //        $("#error").html(msg + xhr.status + " " + xhr.statusText);
    //    }
    //});
    $(".form-control").addClass("OneDriveInput");
    $('.OpenedOrdersList').tablesorter();

    $("body").attr("data-menustatus", "Closed");
    $("h3").addClass("text-center");
    $('select').change(function () {
        var Obj = $(this);
        Obj.attr("data-id", Obj.val())
        Obj.attr("data-value", Obj.children("option[value=" + Obj.val() + "]").text())
    });


    $(document).on('click', '.CloseMobileCommandOptions', function () {
        $(".MobileCommandOptions").addClass("hide");
        $(".MobileMenuMore").fadeIn();
        $(this).hide();

    });

    $(document).on('click', '.MobileMenuMore', function () {
        $(".MobileCommandOptions").removeClass("hide");
        $(this).hide();
        $(".CloseMobileCommandOptions").show();
    });
    $(document).on('click', '.SlideClose', function () {
        $(".SlideRight").removeClass("UnPVyeerpyWke92PSgEQ-").removeClass("ThemeBase");
    });
    $(document).on('click', '.IconGlobalNavButton', function () {
        if ($(".BasePage-leftNav-Container").css("display") == "block") {
            $(".BasePage-leftNav-Container").css({ "display": "none", "z-index": "0" });
        } else {
            $(".BasePage-leftNav-Container").css({ "display": "block", "z-index": "99999" });
        }
    });
    $(document).on('click', '.o365sx-waffle', function () {
        if ($(".BasePage-leftNav-Container").css("display") == "block") {
            $(".BasePage-leftNav-Container").css({ "display": "none", "z-index": "0" });
        } else {
            $(".BasePage-leftNav-Container").css({ "display": "block", "z-index": "99999" });
        }
    });
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

 
    $('.pops').on('hidden.bs.popover', function () {
        var nesne = $(".pops").attr("aria-describedby");
        $("#" + nesne).fadeOut();
    })
    $(document).on('click', '.CloseMiniMenu', function () {
        $("#OtherMenu").css({ "position": "fixed", "z-index": "-9999" });
    });
    $(document).on('click', '.IconMore', function () {
        $("#OtherMenu").css({ "position": "fixed", "z-index": "9" });
    });

})



