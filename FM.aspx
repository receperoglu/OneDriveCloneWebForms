<%@ Page Title="" Language="C#" MasterPageFile="Template.master" AutoEventWireup="true" CodeFile="FM.aspx.cs" Inherits="Default2" %>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" ClientIDMode="Static" runat="Server">
    <div class="DataStandart hide hidden">
        <input id="inputReGallery" />
        <input value="0" id="resimid" />
        <input   id="inputPath" />
        <div id="klasorhatasi"></div>
        <div class="ogesayi">0</div>
        <input style="display: none" value="" />
        <input id="SelectedObjectList" value="" />
    </div>


    <script src="Library/js/JsonToFile.js"></script>
    <script src="Library/js/JsonToFolder.js"></script>
    <script src="Library/js/slayt.js"></script>



    <div id="DragDropUploadArea" class="contentpanel">
        <div id="dosyagenislik" class="col-sm-12 col-md-12">
            <div class="panel panel-dark-head">
                <div style="background-color: #428bca;">
                    <div class="panel-heading visible-sm visible-xs">
                        <h4 style="color: white !important;" class="panel-title style3">
                            <span id="menukontrol">
                                <span class="pull-right hide">
                                    <asp:Label runat="server" ID="vergino"></asp:Label>/<asp:Label runat="server" ID="adi"></asp:Label>
                                </span>
                                <div class="clearfix"></div>
                            </span>
                        </h4>
                    </div>
                    <div class="clearfix"></div>
                    <ul style="margin: 0; padding: 0;" id="yollaar" class="menu2">
                    </ul>
                    <div class="LoadingData col-md-12"></div>
                </div>
                <div class="temporary col-md-12"></div>
            </div>
        </div>
    </div>

       <div class="FabricModal ms-Layer hide ms-Layer--fixed layer-351" data-portal-element="true">
        <div class="ms-Fabric ms-Layer-content content-120">
            <div role="dialog" style="outline: none;">
                <div class="ms-Modal is-open root-345">
                    <div class="ms-Overlay ms-Overlay--dark root-414"></div>
                    <div class="ms-Dialog-main HudldIlvnIFz-AVg_Bopj main-412">
                        <div tabindex="0" data-is-visible="true" style="pointer-events: none; position: fixed;"></div>
                        <div style="text-align: right; float: right;">
                            <i data-icon-name="Cancel" onclick="CloseModal();" role="presentation" aria-hidden="true" class="pointer ms-Button-icon icon-73"></i>
                        </div>
                        <div class="ModalSubject MultiDelete">
                            <div id="Dosyasayisi"></div>
                            Silmek istediğinize emin misiniz ?<br />
                            <br />
                            <br />
                            <input id="btnMultiDelete" class="pad10 l10 ms-Button ms-Button--primary" type="submit" value="Evet">
                        </div>
                        <div class="ModalSubject PictureDelete">
                            <div class="UserContent">Resmi silmek üzeresiniz.</div>
                            <input id="btnDeletePicture" class="pad10 l10 ms-Button ms-Button--primary" type="submit" value="Evet">
                        </div>
                        <div class="ModalSubject PictureInfo">
                            Resim Bilgisi
                     <div id="InfoPicture"></div>
                        </div>
                        <div class="ModalSubject FileUploadArea">
                            <div class="row padd0">
                                <div class="col-xs-12 padd0">
                                    <div id="kapsar" class="kapsar">
                                        <br />
                                        <br />
                                        <br />
                                        <br />
                                        <br />
                                        <div id="multi_file_uploader">
                                            <div class="imageSelectorContainer">
                                                <br />
                                                <br />
                                                <div id="ResimSec" style="width: 150px;">
                                                    Dosya Seç
                                                </div>
                                                <input style="display: none;" type="file" name="yuklemealani[]" value="" onchange="degis();" id="cokluyukle" class="btn btn-info" multiple="">
                                                <br />
                                            </div>
                                        </div>
                                        <br />
                                        <br />
                                        <br />
                                        <br />
                                        <br />
                                        <img src="Library/css/img/bekle.gif" id="bekleorta" style="display: none;" />
                                        <div id="basarili" style="display: none; text-align: center; color: #0094ff !important;">
                                            Kaydedildi
                                        </div>
                                        <br />
                                        <br />
                                        <br />
                                        <br />
                                        <br />
                                        <br />
                                        <br />
                                        <br />
                                        <br />
                                        <br />
                                        <br />
                                    </div>
                                </div>
                            </div>
                            <div style="background-color: #fff;" class="modal-footer">
                                <input style="display: none;" id="yuklemedugmesi" class="btn btn-success" type="submit" value="Yükle">
                                <button type="button" class="btn btn-default" data-dismiss="modal">Kapat</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>


    <script type="text/javascript">
        var selectedFiles;
        $(document).ready(function () {
            if (!Modernizr.draganddrop) {
                alert("Html 5 Hatası");
                return;
            }
            $('form').submit(function (ev) {
                $(window).scrollTop(0);
                return upload_images_selected(ev, ev.target);
            })
            setTimeout(
                function () {
                    $(".SubTools").show();
                    $.each($("[class*='col-']"), function () {
                        $(this).addClass("padd0")
                    })
                }
                , 100);

            var box;
            box = document.getElementById("DragDropUploadArea");
            box.addEventListener("dragenter", OnDragEnter, false);
            box.addEventListener("dragover", OnDragOver, false);
            box.addEventListener("drop", OnDrop, false);

            $('#ResimSec').click(function () {
                $('input[type=file]#cokluyukle').trigger('click');
                $("#basarili").html("");
            });
        });

        var Offline = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMTEuODcgMTA2LjY2Ij48ZGVmcz48c3R5bGU+LmF7ZmlsbDojZmZlMDM3O30uYntmaWxsOiNmZmM0MGI7fS5je2ZpbGw6IzNiNzdlNzt9LmR7ZmlsbDojM2I2ODMxO30uZXtmaWxsOiNmZjkwYmQ7fS5me2ZpbGw6I2ZmN2UyODt9PC9zdHlsZT48L2RlZnM+PHRpdGxlPkFzc2V0IDEyPC90aXRsZT48cGF0aCBjbGFzcz0iYSIgZD0iTTk1Ljc2LDkwbC03LjUzLTIuNzdhMS4wOSwxLjA5LDAsMCwxLS42NS0xLjMybDMuNzQtMTIuNjItMjgtNzJjLS42LTEuNTQtMS45LTEuNzMtMi45LS40MUwyMC45NCw1Mi44MmE0LjgzLDQuODMsMCwwLDEtMy42OCw0Ljg0TC41MSw3OS42OUMtLjQ5LDgxLDAsODIuMjcsMS42Nyw4Mi41TDk3LjMyLDk1Ljk0YzEuNjUuMjQsMi40OC0uODMsMS44OC0yLjM4bC0xLjg1LTQuNzUtLjI2LjYxQTEuMDYsMS4wNiwwLDAsMSw5NS43Niw5MFpNNTYuNiw2NmgwYTQuNjEsNC42MSwwLDAsMS05LjEzLTEuMjloMEE0LjYxLDQuNjEsMCwxLDEsNTYuNiw2NlptNi43NC0zNi4yOC02LDI1LjQyYTEuMDcsMS4wNywwLDAsMS0xLjIxLjhsLTQuNy0uODJhMS4wOSwxLjA5LDAsMCwxLS44OS0xLjE3bDIuMzYtMjYuMTdBLjg5Ljg5LDAsMCwxLDU0LDI2LjkzbDguNTUsMS41OUExLDEsMCwwLDEsNjMuMzQsMjkuNjhaIi8+PHBhdGggY2xhc3M9ImIiIGQ9Ik02Mi41NywyOC41Miw1NCwyNi45M2EuODkuODksMCwwLDAtMS4wOC44MUw1MC41OCw1My45MWExLjA5LDEuMDksMCwwLDAsLjg5LDEuMTdsNC43LjgyYTEuMDcsMS4wNywwLDAsMCwxLjIxLS44bDYtMjUuNDJBMSwxLDAsMCwwLDYyLjU3LDI4LjUyWiIvPjxwYXRoIGNsYXNzPSJiIiBkPSJNNTIuNjcsNjAuNzVhNC42LDQuNiwwLDAsMC01LjIsMy45M2gwQTQuNjEsNC42MSwwLDAsMCw1Ni41OSw2NmgwQTQuNjMsNC42MywwLDAsMCw1Mi42Nyw2MC43NVoiLz48cGF0aCBjbGFzcz0iYyIgZD0iTTExMS4yNiw1My42OSw5OS41OCw0OC45YS44OS44OSwwLDAsMC0xLjIxLjU4bC03LjA1LDIzLjgsNiwxNS41M0wxMTEuOCw1NUExLDEsMCwwLDAsMTExLjI2LDUzLjY5WiIvPjxwYXRoIGNsYXNzPSJkIiBkPSJNODcuNTgsODUuOWExLjA5LDEuMDksMCwwLDAsLjY1LDEuMzJMOTUuNzYsOTBhMS4wNiwxLjA2LDAsMCwwLDEuMzMtLjU3bC4yNi0uNjEtNi0xNS41M1oiLz48cGF0aCBjbGFzcz0iYyIgZD0iTTg4LjY5LDk1LjU5QTUuNjksNS42OSwwLDAsMCw4MS4zOSw5OWgwYTUuNyw1LjcsMCwxLDAsMTAuNzEsMy45aDBBNS43LDUuNywwLDAsMCw4OC42OSw5NS41OVoiLz48cGF0aCBjbGFzcz0iZSIgZD0iTTksNDIuNzZhMS4wOCwxLjA4LDAsMCwwLDEuMjcuNzJsNy40Ny0xLjcyYTEuMDksMS4wOSwwLDAsMCwuODItMS4yMUwxNC4xOCwxMS4zNmEuOS45LDAsMCwwLTEuMTItLjc2TC44OSwxMy40MWEuOTEuOTEsMCwwLDAtLjY4LDEuMTdaIi8+PHBhdGggY2xhc3M9ImUiIGQ9Ik0yMC44Miw1MS44OWgwYTQuODMsNC44MywwLDEsMC05LjQxLDIuMTdoMGE0LjgzLDQuODMsMCwwLDAsNS43OSwzLjYybC4wNiwwLDMuNjgtNC44NEE0Ljk0LDQuOTQsMCwwLDAsMjAuODIsNTEuODlaIi8+PHBhdGggY2xhc3M9ImYiIGQ9Ik0yMC45NCw1Mi44MmwtMy42OCw0Ljg0QTQuODMsNC44MywwLDAsMCwyMC45NCw1Mi44MloiLz48L3N2Zz4='


        var LoadingHTML = '<div class="ProgressSpinnerFlat" role="progressbar"> ' +
            '<div aria-hidden="true">•</div> <div aria-hidden="true">•</div>' +
            ' <div aria-hidden="true">•</div> <div aria-hidden="true">•</div>' +
            ' <div aria-hidden="true">•</div> </div>';
        var googleadres = "https://docs.google.com/gview?url=";
        var popop = "width=800,height=600,scrollbars=no,resizable=yes,status=yes,toolbar=no,location=no,menubar=no";
        var domain = "http://sadeceosgb.com/";
        $('input:checkbox').removeAttr('checked');
        $("#secilisayi").removeClass("SelectedObjectCount");
        $("#secilisayi").attr("data-id", "0");
        $("#firmmenu").addClass("active");
        $("#firmmenu ul").css("display", "none");
        $('input:checkbox').hide();
        $('.NewFileUpload').click(function () {
            OpenModal("Add", "Files");
        });
        $('.secme').click(function () {
            $('input:checkbox').fadeToggle();
            $('.silresim').fadeToggle();
            $('.dosyabilgisi').fadeToggle();
        });
        $("#btnMultiDelete").click(function () {
            var fileswilldeletenow = $("#SelectedObjectList").val();
            var waysfiles = $("#inputPath").val();
            cmdFolderDeleteProcess(fileswilldeletenow, waysfiles);
            cmdFoldersDeleteProcess(fileswilldeletenow, waysfiles);
            $("#toplusilme").modal("hide");
            $("#SelectedObjectList").val("");
        });
        $(document).on('click', '#resimindir', function () {
            var Address = $('.CurrentPictureName').attr('data-fileurl');
            var FileName = $('.CurrentPictureName ').attr('data-name');
            var a = document.createElement('a');
            a.href = Address;
            a.download = FileName;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        });
        $(document).on('dblclick', '.PreviewFile', function () {
            var FileType = $(this).attr("data-type");
            var FileName = $(this).attr("data-name");
            var FileUrl = $("#inputPath").val() + "/" + FileName;
            if (FileType == "Picture") {
                $('.OneUp-content').html("<img data-name='" + FileName + "'  data-fileurl='" + FileUrl + "' class='CurrentPictureName img-responsive' src='" + FileUrl + "'/><br><br><span>" + FileName + "</span>");
                $(".ShowPicture").fadeIn();
                $(".od-TopBar").fadeOut()

            }
            else if (FileType == "File") {
                var google = googleadres + domain + $(this).attr("data-name");
                popup = window.open(google, 'my_popup', popop);
                OpenModal("Picture", "Preview");
            }
            else if (FileType == "pdf") {
                var PDFURL = $("#inputPath").val() + "/" + $(this).attr("data-filename");
                $('.OneUp-content').html("<iframe src='" + PDFURL + "' style='width:100%;height:100%'></iframe>");
                $(".ShowPicture").fadeToggle();
                $(".od-TopBar").fadeOut()
            }
        });
        $(document).on('click', '#buresmisil', function () {
            var resimid = $("#resimdonder").attr("data-id");
            $("#inputReGallery").attr("value", "ok");
            $("#Notif").modal("show");
            $("#resimid").val(resimid);
            $("#silinecekdosya").val($("#resimdonder").attr("src"));

        });
        $(document).on('click', '#sag', function () {
            $(".ma5-active").addClass("isleniyor");
            $(".LoadingData").html(LoadingHTML)
            dondur('sag');

        });
        $(document).on('click', 'ul.menu2#yollaar li', function () {
            var FullPath = $(this).attr("id");
            FolderCall(FullPath);
            FileCall(FullPath);
            var sira = $(this).index() + 1;
            var temp = new Array();
            temp = FullPath.split('/');
            var uzunluk = temp.length;
            $('ul.menu2#yollaar li:eq(' + sira + ')').remove();
            for (var i = sira; i < uzunluk; i++) {
                $('ul.menu2#yollaar li:eq(' + i + ')').remove();
            }
            var dosyaadi = $(this).attr("id");
            $("#inputPath").val(dosyaadi);
        });
        $(document).on('click', '.silbtn', function () {
            var FullPath = $(this).attr("id");
            FolderCall(FullPath);
        });
        $(document).on('click', '#sil', function () {
            var favorite = [];
            var sayac = 0;
            $.each($("input[name='ObjectSelectorCheckBox']:checked"), function () {
                favorite.push($(this).attr("data-id"));
                sayac++;

            });
            if (favorite.length == 0) {
                alert("Klasör Seçmediniz");
            }
            else {
                var SelectedObject = favorite.join("*")
            }
            $("#SelectedObjectList").val(SelectedObject);
            OpenModal("Delete", "Files");
            document.getElementById("Dosyasayisi").innerHTML = sayac + " Öğe Silinecek,";
        });
        $(document).on('click', '#secilisayi', function () {
            $("input:checkbox").prop('checked', false);
            $("#secilisayi").html("");
            $("#sil").css("display", "none");
            $("#secilisayi").removeClass("SelectedObjectCount");
            $("#secilisayi").attr("data-id", "0");
            $(".CheckerDiv").removeClass("VisibleCheckBox");
            $(".ms-Tile").removeClass("SelectedObject");
            $('.dosyabilgisi').toggle();
        });
        $(document).on('click', 'input[name="ObjectSelectorCheckBox"]', function () {
            var ClickedCheckboxId = $(this).attr("id");
            if ($(this).prop('checked')) {
                $(".ms-Tile[data-id=" + ClickedCheckboxId + "]").addClass("SelectedObject");
                $(".CheckerDiv[data-id='" + ClickedCheckboxId + "']").addClass("VisibleCheckBox")
                var toplam = $("#secilisayi").attr("data-id");
                toplam++;
                if (toplam == "0") {
                    $("#secilisayi").html("");
                    $("#secilisayi").removeClass("SelectedObjectCount");
                    $("#sil").css("display", "none");
                    $(".yenigrup").css("display", "block");
                }
                else {
                    $("#secilisayi").html(toplam + " Öğe Seçildi ");
                    $("#sil").css("display", "block");
                    $("#secilisayi").addClass("SelectedObjectCount");
                    $(".yenigrup").css("display", "none");
                }
                $("#secilisayi").attr("data-id", toplam);
                if (toplam == '0') {
                    $(".silresim").css("display", "block");
                }
                else {
                    $(".silresim").css("display", "none");
                }

            }
            else {
                $(".ms-Tile[data-id=" + ClickedCheckboxId + "]").removeClass("SelectedObject");
                $(".CheckerDiv[data-id='" + ClickedCheckboxId + "']").removeClass("VisibleCheckBox");
                var toplam = $("#secilisayi").attr("data-id");
                toplam--;
                if (toplam == "0") {
                    $("#secilisayi").html("");
                    $("#secilisayi").removeClass("SelectedObjectCount");
                    $('.dosyabilgisi').toggle();

                    $(".yenigrup").css("display", "block");
                    $("#sil").css("display", "none");
                }
                else {
                    $("#secilisayi").html(toplam + " Öğe Seçildi ");
                    $("#secilisayi").addClass("SelectedObjectCount");
                    $(".yenigrup").css("display", "none");
                    $("#sil").css("display", "block");
                }
                $("#secilisayi").attr("data-id", toplam);
            }
        });
        $(document).on('click', '#tumunusec', function () {
            if ($(this).prop("checked")) {
                $(".sildosyasec").prop('checked', true);
                $(".silsec").prop('checked', true);
                $("#sil").show();
                $(".yenigrup").hide();
            }
            else {

                $(".sildosyasec").prop('checked', false);
                $(".silsec").prop('checked', false);
                $("#sil").hide();
                $(".yenigrup").show();
            }
        });
        $(document).on('click', '.NewFolder', function () { ///YENİKLASÖR OLUŞTURMADAN GÖRSEL KLASÖR OLUŞTURMA SCRİPT
            //isleme();
            var durum = $("#klasorhatasi").html();
            if (durum == 1) {
                $("#dikkatklasor").css("background", " white");
                $("#yeniklasoradi").focus();
            }
            else {
                var NewFolderHtml = "<div id='dikkatklasor'  class='col-xs-6 col-sm-4 col-md-3 col-lg-2'>" +
                    "<div class='fakeklasor'></div><br>" +
                    "<span class='klasoradi2' style='text-align:center;'>" +
                    "<input id='yeniklasoradi' type='text'" +
                    " value='' placeholder='Klasör ismi.'><br><br> " +
                    "<div id='yeniklasorcreate' class='pad10 l10 ms-Button ms-Button--primary'>Oluştur</div>" +
                    "<div id='klasorvazgec'" +
                    " class='fright pad10 l10 ms-Button ms-Button--secondary'>Vazgeç</div></br></br>  </span></div>";
                $(".temporary").append(NewFolderHtml);
                $("#klasorhatasi").html("1");
                $("#yeniklasoradi").focus();
            }
        });
        $(document).on('click', '#klasorvazgec', function () { ///YENİKLASÖR VAZGEÇ
            var FullPath = $("#inputPath").val();
            FolderCall(FullPath);
            FileCall(FullPath);
        });
        $(document).on('click', '#yeniklasorcreate', function () {
            var yol = $("#inputPath").val() + "/" + $("#yeniklasoradi").val();
            var varsayilankonum = $("#inputPath").val();
            $.ajax({
                url: "DosyaSistem/KlasorOlustur.ashx",
                type: "POST",
                data: {
                    "Folder": yol,
                },
                success: function (result) {
                    FolderCall(varsayilankonum);

                },
                error: function (err) {
                    alert(err.statusText);
                }
            });
        });
        $(document).bind('keypress', function (e) { ///ENTER'A BASINCA YENİ KLASOR OLUŞTURMA SCRİPTİNİ TETİKLEME SCRİPTİ
            if (e.which === 13) { // return
            }
        });
        $(document).on('dblclick', 'div.klasor', function () { ///TIKLANAN KLASÖRÜN KOPYASINI NAVİGASYON OLUŞTURMA SCRİPT
            var dosyayolu = $(this).attr("data-id");
            var dosyaadi = $(this).attr("id");
            var FullPath = $("#inputPath").val() + "/" + dosyaadi;
            $("#inputPath").val(FullPath);
            FolderCall(FullPath);
            FileCall(FullPath);
            var kelime = "<li data-id='" + dosyaadi + "' id='" + FullPath + "'>" + dosyaadi + "</li>";
            $('#yollaar').append(kelime);
        });
        $(document).on('click', 'span.klasoradi', function () { ///TIKLANAN KLASÖRÜN KOPYASINI NAVİGASYON OLUŞTURMA SCRİPT
            var dosyaadi = $(this).attr("data-id");
            var FullPath = $("#inputPath").val() + "/" + dosyaadi;
            $("#inputPath").val(FullPath);
            FolderCall(FullPath);
            FileCall(FullPath);
            var kelime = "<li data-id='" + dosyaadi + "' id='" + FullPath + "'>" + dosyaadi + "</li>";
            $('#yollaar').append(kelime);
        });
        $(document).on('click', 'img.download', function () { ///İNDİRME SCRİPT
            var dosya = $(this).attr("data-id");
            var yol = $(this).attr("data-value");
            var a = document.createElement('a');
            a.href = yol;
            a.download = dosya;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        });
        $(document).on('click', 'div#resimbilgisiiste', function () {  ///SİLME SOrusu
            var FullPath = $(".CurrentPictureName").attr("data-fileurl");
            $.ajax({
                url: "DosyaSistem/ResimBilgiIste.ashx",
                type: "POST",
                data: {
                    "Folder": FullPath
                },
                success: function (result) {
                    OpenModal("Info", "Picture")
                    $("#InfoPicture").html(result);
                },
                error: function (err) {
                    alert(err.statusText);

                }
            });
        });
        $('html').keyup(function (e) {
            if (event.keyCode == 46) {

                if ($('#resimdonder').length > 0) {
                    var resimid = $("#resimdonder").attr("data-id");
                    $("#inputReGallery").attr("value", "ok");
                    $("#resimid").val(resimid);
                    $("#silinecekdosya").val($("#resimdonder").attr("src"));
                }
            }

            if (event.keyCode == 73) {
                if ($('#resimdonder').length > 0) {
                    var FullPath = $(".CurrentPictureName").attr("data-fileurl");
                    $.ajax({
                        url: "DosyaSistem/ResimBilgiIste.ashx",
                        type: "POST",
                        data: {
                            "Folder": FullPath
                        },
                        success: function (result) {
                            OpenModal("Info", "Picture")
                            $("#InfoPicture").html(result);
                        },
                        error: function (err) {
                            alert(err.statusText);

                        }
                    });
                }
            }
        });
        $("#btnDeletePicture").click(function () {
            $.ajax({
                url: "DosyaSistem/DosyaSil.ashx",
                type: "POST",
                data: {
                    "dosya": $("#silinecekdosya").val()
                },
                success: function (result) {
                    FolderCall($("#inputPath").val());
                    FileCall($("#inputPath").val());
                    $("#silmesorusu").modal("hide");
                },
                error: function (err) {
                    alert(err.statusText);
                }
            });
        });
        $("#silevet").click(function () {
            $.ajax({
                url: "DosyaSistem/DosyaSil.ashx",
                type: "POST",
                data: {
                    "dosya": $("#silinecekdosya").val()
                },
                success: function (result) {
                    FolderCall($("#inputPath").val());
                    FileCall($("#inputPath").val());
                    $("#silmesorusu").modal("hide");


                },
                error: function (err) {
                    alert(err.statusText);
                }
            });
        });
        function Layout(Type, Head) {
            $(".TopBarObject:last-child").show().addClass("fright");
            $("#LayoutRight").css("top", "85px");
            $(".LayoutRight").css("width", "100%")
            if (Type == "ShareNow") {
                document.getElementById("LayoutRight").style.width = "300px";

            }
        }


        function OpenPhoto(Path) {
            $("img#FullScreen").attr("src", "dosyalar/" + Path);
            $('#PictureCanvas').fadeIn();
            $('video').addClass("hide");
            $('.PicturePreview').fadeIn();
        }

        $(document).on('click', '.FileType', function () {
            $("body").attr("data-filetype", $(this).attr("data-type"));
            $("#FileNew").click();
        })
        function Download() {
            var Object = "http://localhost/" + $("#FullScreen").attr("src")
            var link = document.createElement('a');
            link.setAttribute('href', Object);
            link.setAttribute('download', $(".ActivePicture").attr("data-filename"));
            link.setAttribute('target', '_blank');
            link.style.display = 'none';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
        function SharePicture() {
            console.log("asdsad")
            $(".PictureShare").show();
            var link = "";
            var b = $("body");
            if (b.attr("data-platform") == "desktop") {
                link = "https://api.whatsapp.com/send?text=http://";
                $(".ShareWhatsapp").attr("target", "_blank");
            } else {
                link = "whatsapp://send?text=http://";
            }
            var ArticelName = $(".ArticelNameHead >.text-capitalize").html();
            $(".ShareWhatsapp").attr("href", link + window.location.hostname + "/" + $("#FullScreen").attr("src"));
            $(".ShareMail").attr("href", "mailto:mailadresi?subject=" + ArticelName + ";&body=http://" + window.location.hostname + "/" + $("#FullScreen").attr("src"));

        }
        function CheckImg() {

            $('img').on('error', function (e) {
                $(this).attr('src', Offline);
                $(this).attr('title', "Resim Bulunamadı");
            });
        }
        function NewWindow() {
            window.open(thisurl + "d.aspx?ArticelId=" + $("body").attr("data-articelid"));

        }


        FolderCall("dosyalar/8754482755445");
        $("#inputPath").val("dosyalar/8754482755445");
        $("#vergino").val("8754482755445");
        //Klasör Sorgulama
        function FolderCall(FullPath) {
            isleme();
            $.ajax({
                url: "DosyaSistem/KlasorSorgula.ashx",
                type: "POST",
                data: {
                    "Folder": FullPath,
                },
                success: function (result) {
                    $(".temporary").append(JsonToFolder(result, "Folder"))
                    var CheckBoxElements = document.querySelectorAll(".ms-CheckBox");
                    for (var i = 0; i < CheckBoxElements.length; i++) {
                        new fabric['CheckBox'](CheckBoxElements[i]);
                    }
                    $("#klasorhatasi").html("");
                    $("#secilisayi").html("");
                    $("#secilisayi").removeClass("SelectedObjectCount");
                    $("#tumunusec").prop('checked', false);
                    $("#secilisayi").attr("data-id", "0");
                    $(".yenigrup").css("display", "block");
                    $("#sil").css("display", "none");
                    FileCall(FullPath);
                    BilgiAl(FullPath);
                },
                error: function (err) {
                    alert(err.statusText);

                }
            });
        }  ///KLASÖR İSTEME AJAX
        function FileCall(FullPath) {
            $.ajax({
                url: "DosyaSistem/DosyaSorgula.ashx",
                type: "POST",
                data: {
                    "Folder": FullPath,
                },
                success: function (result) {
                    $("#dosyalarpanel").html("");
                    $(".temporary").append(JsonToFile(result));
                    $("#secilisayi").html("");
                    $("#secilisayi").attr("data-id", "0");
                    $("#secilisayi").removeClass("SelectedObjectCount");
                    $("#tumunusec").prop('checked', false);
                    $(".yenigrup").css("display", "block");
                    $("#sil").css("display", "none");
                },
                error: function (err) {
                    alert(err.statusText);
                }
            })

            $.ajax({
                url: "DosyaSistem/ResimSorgula.ashx",
                type: "POST",
                data: {
                    "Folder": FullPath,
                },
                success: function (result) {
                    $(".temporary").append(JsonToFolder(result, "Picture"))

                    $("#secilisayi").html("");
                    $("#secilisayi").attr("data-id", "0");
                    $("#secilisayi").removeClass("SelectedObjectCount");
                    $("#tumunusec").prop('checked', false);
                    $(".yenigrup").css("display", "block");
                    $("#sil").css("display", "none");
                    var sum = 0;
                    $('.ogesayi').each(function () {
                        sum += parseFloat($(this).text());
                    });
                    if (sum == 0) {
                        $("#dosyalarpanel").html("<div class='col-md-12 bos' ></div><div class='bosyazi'>Bu klasör Boş yukarıdaki Dosya Ekle ile başla veya buraya dosya sürükle bırak</div>");
                    }


                },
                error: function (err) {
                    alert(err.statusText);

                }
            })
        }  // DOSYA İSTEME AJAX
        function BilgiAl(Path) {
            $.ajax({
                url: "DosyaSistem/BilgiAl.ashx",
                type: "POST",
                data: {
                    "Folder": Path
                },
                success: function (result) {
                    $("#ozet").html(result)
                },
                error: function (err) {
                    alert(err.statusText);
                }
            });

        }
        function isleme() {
            setTimeout(islembitti, 1500);
            $(".LoadingData").html(LoadingHTML)
        }
        function islembitti() {
            $("#icerikler").css("opacity", "1");
            $(".LoadingData").html("")
        }
        function dondur(yon) { //RotatePicture
            var yol = $(".CurrentPictureName").attr("data-fileurl");
            var resimadi = $(".CurrentPictureName").html();
            $.ajax({
                url: "DosyaSistem/ResimDondur.ashx",
                type: "POST",
                data: {
                    "yon": yon,
                    "yol": yol,
                    "resimadi": resimadi,
                    "resimid": "id"
                },
                success: function (id) {
                    $(".CurrentPictureName").attr("src", yol + "?random=" + Math.random());
                    setTimeout(islembitti, 1500);
                },
                error: function (err) {
                    alert(err.statusText);
                }
            });

        }
        function cmdFolderDeleteProcess(FullPath, Placement) {   /// KLASÖR SİLME AJAX SCRİPTİ
            $.ajax({
                url: "DosyaSistem/cmdFolderDeleteProcess.ashx",
                type: "POST",
                data: {
                    "Folder": FullPath,
                    "Placement": Placement,
                },
                success: function (result) {
                    ThumbSil(FullPath)
                    FolderCall(Placement);
                    FileCall(Placement);
                },
                error: function (err) {
                    alert(err.statusText);

                }
            });

        }
        function cmdFoldersDeleteProcess(FullPath, Placement) {   /// KLASÖR SİLME AJAX SCRİPTİ                 
            $.ajax({
                url: "DosyaSistem/TopluDosyaSilme.ashx",
                type: "POST",
                data: {
                    "Folder": FullPath,
                    "Placement": Placement,
                },
                success: function (result) {
                    ThumbSil(FullPath);
                    FolderCall(Placement);
                    FileCall(Placement);
                },
                error: function (err) {
                    alert(err.statusText);

                }
            });
        }
        function OpenModal(ProcessType, Object) {
            $(".FabricModal").removeClass("hide");
            $(".FabricModal").modal("show");

            if (ProcessType == "Delete") {

                if (Object == "Picture") { //One Picture For Delete Process

                }
                else if (Object == "Pictures") { //Multi Picture Delete Process

                }
                else if (Object == "Folder") { //One Folder For Delete Process

                }
                else if (Object == "Folders") {//Multi Folder Delete Process

                }
                else if (Object == "File") { //One File For Delete Process

                }
                else if (Object == "Files") {//Multi File Delete Process

                }
            }

        }
        function ThumbSil(FullPath) {
            $.ajax({
                url: "DosyaSistem/ThumbSil.ashx",
                type: "POST",
                data: {
                    "dosya": FullPath
                },
                success: function (result) {
                    FolderCall(FullPath);
                    FileCall(FullPath);
                },
                error: function (err) {
                    alert(err.statusText);
                }
            });

        }
        function resimdoldur() {
            $.each($(".PicturePreview"), function () {
                $(this).css("background-image", 'url(' + $(this).attr("data-value") + ')');
            });
        }
        function basarili() {
            $("#basarili").html("<img width='100px' src='okey.gif' />");
        }
        function OnDragEnter(e) {
            e.stopPropagation();
            e.preventDefault();
        }
        function OnDragOver(e) {
            e.stopPropagation();
            e.preventDefault();
        }
        function OnDrop(e) {
            e.stopPropagation();
            e.preventDefault();
            selectedFiles = e.dataTransfer.files;
            var data = new FormData();
            for (var i = 0; i < selectedFiles.length; i++) {
                data.append(selectedFiles[i].name, selectedFiles[i], selectedFiles[i].Date);
            }
            if (i == 0) {
            }
            else {
                $('#bekle').show();
                $('#bekleorta').show();
                $('#beklebas').show();
                $('#box').html("Dosyalar Seçildi");
            }

            data.append("veri", $("#inputPath").val());
            $.ajax({
                type: "POST",
                url: "Upload.ashx",
                contentType: false,
                processData: false,
                data: data,
                success: function (result) {
                    $("#basarili").show();
                    basarili();
                    setTimeout(sonlandir, 1500);
                    $('#bekle').hide();
                    $('#bekleorta').hide();
                    $('#beklebas').hide();
                    $.ajax({
                        url: "DosyaSistem/DosyaSorgula.ashx",
                        type: "POST",
                        data: {
                            "Folder": $("#inputPath").val(),
                        },
                        success: function (result) {
                            $("#dosyalarpanel").html(result);
                            $("#secilisayi").html("");
                            $.ajax({
                                url: "DosyaSistem/ResimSorgula.ashx",
                                type: "POST",
                                data: {
                                    "Folder": $("#inputPath").val(),
                                },
                                success: function (result) {
                                    $(".temporary").append(JsonToFolder(result, "Picture"))
                                    $("#secilisayi").html("");
                                    $("#secilisayi").attr("data-id", "0");
                                    $("#secilisayi").removeClass("SelectedObjectCount");
                                    $("#tumunusec").prop('checked', false);
                                    $(".yenigrup").css("display", "block");
                                    $("#sil").css("display", "none");
                                    resimdoldur();
                                },
                                error: function (err) {
                                    alert(err.statusText);

                                }
                            })

                        },
                        error: function (err) {
                        }
                    })
                },
                error: function () {
                    //$(".menu").append("<li style='border:1px solid red !important;color:red !important;'>Yükleme Hatası</li>");
                }
            });




        }
        function ClosePreview() {
            $(".ShowPicture").fadeToggle();
            $(".od-TopBar").fadeIn()
        }
        function degis() {
            $('#yuklemedugmesi').show();
            $('#ResimSec').html("Dosyalar Seçildi");
        }
        function upload_images_selected(event, formObj) {
            $('#box').hide();
            $('#yuklemedugmesi').hide();
            $('#bekle').show();
            $('#bekleorta').show();
            event.preventDefault();
            var fileInputs = document.querySelectorAll('#cokluyukle');
            var girissayisi = 0;
            $(fileInputs).each(function (index, input) {
                fileList = input.files;
                var formData = new FormData();
                formData.append('veri', $("#inputPath").val());
                for (var i = 0; i < fileList.length; i++) {
                    var file = fileList[i];
                    formData.append('yuklemealani[' + (girissayisi++) + ']', file, file.name);
                    $.ajax({
                        type: "POST",
                        url: "Upload.ashx",
                        contentType: false,
                        processData: false,
                        data: formData,
                        success: function (result) {
                            $("#basarili").show();
                            basarili();
                            setTimeout(sonlandir, 1500);
                            $('#bekle').hide();
                            $('#bekleorta').hide();
                            $.ajax({
                                url: "DosyaSistem/DosyaSorgula.ashx",
                                type: "POST",
                                data: {
                                    "Folder": $("#inputPath").val(),
                                },
                                success: function (result) {
                                    $("#dosyalarpanel").html(result);
                                    $("#secilisayi").html("");
                                    $.ajax({
                                        url: "DosyaSistem/ResimSorgula.ashx",
                                        type: "POST",
                                        data: {
                                            "Folder": $("#inputPath").val(),
                                        },
                                        success: function (result) {
                                            $(".temporary").append(JsonToFolder(result, "Picture"))
                                            $("#secilisayi").html("");
                                            $("#secilisayi").attr("data-id", "0");
                                            $("#secilisayi").removeClass("SelectedObjectCount");
                                            $("#tumunusec").prop('checked', false);
                                            $(".yenigrup").css("display", "block");
                                            $("#sil").css("display", "none");
                                            resimdoldur();
                                            sonlandir();
                                        },
                                        error: function (err) {
                                            alert(err.statusText);
                                        }
                                    })
                                },
                                error: function (err) {
                                    $(".menu").append("<li style='border:1px solid red !important;color:red !important;'>Yükleme Hatası</li>");
                                }
                            })
                        },
                        error: function () {
                            $(".menu").append("<li style='border:1px solid red !important;color:red !important;'>Yükleme Hatası</li>");
                        }
                    });


                }
            })


        }
        function basarili() {
            $("#basarili").html("<img width='100px' src='okey.gif' />");
            $(".imagePreviewTable").html("");
        }
        function sonlandir() {
            $("#basarili").html("");
            $("#basarili").hide();
            $('#ResimSec').html("Dosya Seç"); $('#box').show();
            $('#box').html("Dosyaları sürükleyip bırakın");
            document.getElementById('cokluyukle').value = "";

        }
    </script>
</asp:Content>
