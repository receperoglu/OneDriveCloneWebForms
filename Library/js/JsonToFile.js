

function JsonToFile(json) {
    var Result = "";


    var Domain = "http://localhost";
    var FileId = 0;
    $.each(JSON.parse(json), function (i, item) {
        var Name = item.Name;
        var Ext = item.Ext;
          var CreatedDate = item.CreatedDate;
         Result += '  <div data-filename="'+Name+'" data-id="File' + FileId + '"  data-type="' + Ext + '" class="PreviewFile ms-List-cell listCell_09efe3dd col-xs-6 col-sm-4 col-md-2 col-lg-2" >' +
            '<div  class="cell_09efe3dd" style="padding-top: 97.16%;"><div  class="cellContent_09efe3dd">' +
            '<div data-id="File' + FileId +
            '"  class="ms-Tile od-ItemTile2 od--hasContextMenu fluent-folder-icon od-ItemTile2--isLarge tile_ba4e71c8' +
            ' ms-Tile--isLarge isLarge_ba4e71c8 ms-Tile--hasForegroundFrame hasForegroundFrame_ba4e71c8 ms-Tile--isSelectable selectable_ba4e71c8' +
            ' ms-Tile--showBackground showBackground_ba4e71c8 ms-Tile--invokable invokable_ba4e71c8">' +
            '<div class="ms-Tile-link link_ba4e71c8 text-center"><span role="presentation" class="ms-Tile-aboveNameplate aboveNameplate_ba4e71c8">' +
            '</span>' +
            '<span class="od-ItemTile2-smallIcon"><div class="FileTypeIcon" >' +
            '<img class="FileTypeIcon-icon" ' +
            ' src="https://spoprod-a.akamaihd.net/files/odsp-next-prod-amd_2020-09-11_20200916.001/odsp-media/images/appsfluent/word_16x1.svg" style="width: 32px; height: 32px;">' +
            '</div></span></span></span></span><span class="ms-Tile-nameplate nameplate_ba4e71c8"><span id="Tile-name338" class="ms-Tile-name name_ba4e71c8">' +
            '<span class="signalField_05013969 compact_05013969 od-ItemTile2-signalField"><span class="signalFieldValue_05013969"><span>' + Name + '</span></span>' +
            '</span></span><span id="Tile-activity339" class="ms-Tile-activity activity_ba4e71c8"><span class="signalField_05013969 compact_05013969 od-ItemTile2-signalField">' +
            '<span class="signalFieldValue_05013969"> ' + CreatedDate + '</span></span></span></span></div>' +
            '<span role="checkbox" data-id="File'+FileId+'" class="ms-Tile-check CheckerDiv  check_ba4e71c8 checkHost_637efddd"  > ' +
             '<input type="checkbox" name="ObjectSelectorCheckBox" class="FolderChoose" data-id="' + Name + '" id="File' + FileId + '"></span></div></div></div></div>';
        FileId++;
    })
    return Result;
}