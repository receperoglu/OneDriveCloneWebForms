function PicturesView(json) {
    var Result = "";
    var PictureResult = "";
    var FileResult = "";
    $.each(json, function (i, z) {
        var FileExt = z.ext;
        if (FileExt == ".png" || FileExt == ".PNG" || FileExt == ".jpg" || FileExt == ".gif" || FileExt == ".peg" || FileExt == ".JPG"|| FileExt == ".jpeg") {
            PictureResult += "<img data-id='" + z.Id + "' data-filename='" + z.FileName + z.ext + "' data-url='" + z.Path + "'  data-ext='" + z.ext + "'" + "src='thumbs/" + z.Path + "'  class='col-md-4 Picture'></div>";
        } else {
            FileExt = z.ext.substr(1, z.ext.length)
            FileResult += "<div style='' data-id='" + z.Id + "' data-url='" + z.Path + "'  data-ext='" + z.ext + "'   class='col-md-12 " + FileExt + " padd0 File'>" +
                "<div style='background-image:url(css/img/" + FileExt + ".png)' class='col-md-1 padd0 FileIco filepreview col-xs-2'> </div>" +
                "<div class='col-md-6 col-xs-10 text-left'>" +
                "<a data-type='" + FileExt + "' class='FileLink' data-link='/dosyalar/" + z.Path + "'>" + z.FileName + "</a></div> </div>";
        }
    });

    Result = FileResult +"<hr>" +PictureResult;
    return Result;    

      
  
  
}
 