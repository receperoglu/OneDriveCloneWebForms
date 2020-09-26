function UploadNow(Which) {
    
    $(".prog").html(LoadingHTML)
    $(this).html("<i class='fa fa-circle-o-notch fa-spin'></i>");
    Which = "Multiple" + Which;
    var fileInputs = document.getElementsByClassName(Which);
    var FileCount = 0;
    $(fileInputs).each(function (index, input) {
        fileList = input.files;
        var formData = new FormData();
        formData.append('ArticelId', $("body").attr("data-articelid"));
        formData.append('FileType', $("body").attr("data-filetype"));
 
        for (var i = 0; i < fileList.length; i++) {
            var file = fileList[i];
            FileCount++
            formData.append('UploadArea[' + (FileCount) + ']', file, file.name);
        }
        $.ajax({
            type: "POST",
            url: "post/UploadWayBillOrder.ashx",
            contentType: false,
            processData: false,
            data: formData,
            success: function (result) {
                $("i.DetailsOrder[data-articelid=" + $("body").attr("data-articelid") + "]").click();
                $(this).html("Resim Seç");
                $(".prog").html("")
            },
            error: function () {

            },
            statusCode: {
                404: function () {
                    console.log("-1-1-1-1 WE GOT 404!");
                },
                200: function () {
                    console.log("-1-1-1-1 WE GOT 200!");
                },
                413: function () {
                    FileSizeError();
                }
            },
        });

    })
} 
