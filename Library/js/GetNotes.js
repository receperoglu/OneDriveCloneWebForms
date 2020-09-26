function ArticelNotes() {
    var formData = new FormData();
    formData.append("ArticelId", $("body").attr("data-articelid"));
    $.ajax({
        type: "POST",
        url: "post/ArticelNotes.ashx",
        contentType: false,
        processData: false,
        data: formData,
        success: function (result) {
            $(".NotesArea").val(result)
        }
    })
}
function SaveNotes() {
    var formData = new FormData();
    formData.append("ArticelId", $("body").attr("data-articelid"));
    formData.append("Notes", $(".NotesArea").val());
    $.ajax({
        type: "POST",
        url: "post/AddNotes.ashx",
        contentType: false,
        processData: false,
        data: formData,
        success: function (json) {
        }
    })
}