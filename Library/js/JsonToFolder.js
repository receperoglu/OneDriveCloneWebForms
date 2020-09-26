function JsonToFolder(json, Type) {
    var Result = "";
    var HoverClass = "ms-Tile  od-ItemTile2 od--hasContextMenu fluent-folder-icon od-ItemTile2--isLarge tile_ba4e71c8 ms-Tile--isLarge isLarge_ba4e71c8 ms-Tile--hasForegroundFrame hasForegroundFrame_ba4e71c8 ms-Tile--isSelectable selectable_ba4e71c8 ms-Tile--showBackground showBackground_ba4e71c8 ms-Tile--invokable invokable_ba4e71c8";

    if (Type == "Folder") {
        var FolderCount = 0;
        $.each(JSON.parse(json), function (i, item) {
            var Name = item.Name;

            Result += '  <div data-id="Folder' + FolderCount + '"   data-type="Folder"  class="PreviewFile ms-List-cell listCell_09efe3dd col-xs-6 col-sm-4 col-md-2 col-lg-2" >' +
                '<div  class="cell_09efe3dd" style="padding-top: 97.16%;">' +
                ' ' +
                '<div data-id="Folder' + FolderCount + '" class="' + HoverClass+'">' +
                '<div class="ms-Tile-link link_ba4e71c8">' +
                '<span style="background-repeat:no-repeat;background-size:70% 70%;background-position:center center" class="FolderBackground ms-Tile-aboveNameplate aboveNameplate_ba4e71c8">' +
                '<span role="presentation" class="ms-Tile-content content_ba4e71c8"> ' +
                ' <span class="od-ImageFrame2-image" style="width: 144px; height: 96px; left: -38.1176px; top: 0px;">' +                
                '</span></span></span></span></span></span></span>' +
                '</span></span></span></span><span class="ms-Tile-nameplate nameplate_ba4e71c8"><span id="Tile-name338" class="ms-Tile-name name_ba4e71c8">' +
                '<span class="signalField_05013969 compact_05013969 od-ItemTile2-signalField">' +
                '<span class="signalFieldValue_05013969"><span>' + Name + '</span></span>' +
                '</span></span><span id="Tile-activity339" class="ms-Tile-activity activity_ba4e71c8">' +
                '<span class="signalField_05013969 compact_05013969 od-ItemTile2-signalField">' +
                '<span class="signalFieldValue_05013969"> ' + Name + '</span>' +
                '</span></span></span></div>' +
                '<span role="checkbox" data-id="Folder' + FolderCount + '" class="CheckerDiv ms-Tile-check check_ba4e71c8 checkHost_637efddd">' +
                '<input type="checkbox" name="ObjectSelectorCheckBox" class="FolderChoose" data-id="' + Name + '" id="Folder' + FolderCount + '">' +
                '</span> </div></div></div>';
            FolderCount++;
        })
        return Result + "<span style='display:none;' class='ogesayi'>" + FolderCount + "</span>";

    } else if (Type = "Picture") {



        var PictureCount =0;

        $.each(JSON.parse(json), function (i, item) {
            var Name = item.Name;
            var ShortPictureName = Name;
            var FileId = item.Id;
            var Ext = item.Ext;
            var CreatedDate = item.CreatedDate;

            if (Name.length > 15) {
                ShortPictureName = Name.substring(0, 15);
                ShortPictureName += "..";
            }
            Result += '  <div data-type="Picture" data-id="Picture' + PictureCount + '" data-name="' + Name + '" data-type="' + Ext + '"  class="PreviewFile ms-List-cell listCell_09efe3dd col-xs-6 col-sm-4 col-md-2 col-lg-2" >' +
                '<div  class="cell_09efe3dd" style="padding-top: 97.16%;">' +
                ' ' +
                '<div data-id="Picture' + PictureCount + '" class="' + HoverClass + '">' +
                '<div class="ms-Tile-link link_ba4e71c8">' +
                '<span style="background:url(/thumbs/' + Name + ') no-repeat;background-size:70% 70%;background-position:center center" class="FilePreview  ms-Tile-aboveNameplate aboveNameplate_ba4e71c8">' +
                '<span role="presentation" class="ms-Tile-content content_ba4e71c8"> ' +
                ' <span class="od-ImageFrame2-image" style="width: 144px; height: 96px; left: -38.1176px; top: 0px;">' +
                '</span></span></span></span></span></span></span>' +
                '</span></span></span></span><span class="ms-Tile-nameplate nameplate_ba4e71c8"><span id="Tile-name338" class="ms-Tile-name name_ba4e71c8">' +
                '<span class="signalField_05013969 compact_05013969 od-ItemTile2-signalField">' +
                '<span class="signalFieldValue_05013969"><span>' + ShortPictureName  + '</span></span>' +
                '</span></span><span id="Tile-activity339" class="ms-Tile-activity activity_ba4e71c8">' +
                '<span class="signalField_05013969 compact_05013969 od-ItemTile2-signalField">' +
                '<span class="signalFieldValue_05013969"> ' + ShortPictureName  + '</span>' +
                '</span></span></span></div>' +
                '<span role="checkbox" data-id="Picture' + PictureCount + '" class="CheckerDiv ms-Tile-check check_ba4e71c8 checkHost_637efddd">' +
                '<input type="checkbox" name="ObjectSelectorCheckBox" class="PictureChoose" data-id="' + Name + '" id="Picture' + PictureCount + '">' +
                '</span> </div></div></div>';

            PictureCount++;
        })


    }
    return Result;

}