

 

  /***** SHOW / HIDE LEFT MENU *****/
setTimeout(
    function () {
        $.cookie("xassax", "True", { expires: 2 });

        $("#ouibounce-modal").show();
        $("#bilgimodal").show();
    },500

    )


function notInterested() {
    $("#ouibounce-modal").hide();
    $("#bilgimodal").hide();

}


 