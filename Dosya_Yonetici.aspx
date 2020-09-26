<%@ Page Title="" Language="C#" MasterPageFile="Template.master" AutoEventWireup="true" CodeFile="Dosya_Yonetici.aspx.cs" Inherits="Default2" %>

<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" ClientIDMode="Static" runat="Server">
    <script>
        function Layout(Type, Head) {
            $(".TopBarObject").hide();
            $(".TopBarObject:last-child").show().addClass("fright");
            $("#LayoutRight").css("top", "85px");
            // document.getElementById("LayoutRight").style.width = "100%";
            $(".LayoutRight").css("width", "100%")
            if (Type == "ShareNow") {
                document.getElementById("LayoutRight").style.width = "300px";

            }
        }



    </script>

    <div id="DragDropUploadArea" class="contentpanel">
        <div id="dosyagenislik" class="col-sm-12 col-md-12">
            <div class="panel panel-dark-head">
                <div style="background-color: #428bca;">
                    <div class="panel-heading visible-sm visible-xs">
                        <h4 style="color: white !important;" class="panel-title style3">
                            <span id="menukontrol">
                                <span class="pull-right hide">
                                    <asp:Label runat="server" ID="vergino"></asp:Label>
                                    /
                           <asp:Label runat="server" ID="adi"></asp:Label>
                                </span>
                                <div class="clearfix"></div>
                            </span>
                        </h4>
                    </div>
                    <div class="clearfix"></div>
                    <ul style="margin: 0; padding: 0;" id="yollaar" class="menu2">
                    </ul>
                </div>
                <div class="LoadingData col-md-12"></div>
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
    <div class="od-OneUpOverlay ShowPicture" style="background: white; display: none;" data-overlay-parent="true" role="presentation" tabindex="-1">
        <div class="od-Files-oneUp" style="background: white">
            <div class="OneUp OneUp--hasCommandBar OneUp--hasItems OneUp--panningEnabled" role="presentation" style="background: white">
                <div class="OneUp-commandBar">
                    <div>
                        <div style="display: flex;">
                            <div style="display: block; width: 100%; background: #fff">
                                <div role="presentation">
                                    <div>
                                        <div style="position: relative;">
                                            <div data-automation-id="visibleContent" style="background: #fff">
                                                <div role="menubar" aria-label="Komut çubuğu, menü öğeleri arasında gezinmek için sol ve sağ ok tuşlarını kullanın" data-focuszone-id="FocusZone213">
                                                    <div role="group" style="float: left;" class="ms-OverflowSet ms-CommandBar-primaryCommand primarySet-53">
                                                        <div class="ms-OverflowSet-item item-54">
                                                            <button type="button" role="menuitem" name="Paylaş" title="Paylaş" class="ms-Button ms-Button--commandBar ms-CommandBarItem-link root-57" data-is-focusable="true" aria-label="Paylaş" tabindex="0"><span class="ms-Button-flexContainer flexContainer-58" data-automationid="splitbuttonprimary"><i data-icon-name="Share" aria-hidden="true" class="ms-Button-icon icon-69"></i><span class="ms-Button-textContainer textContainer-59"><span class="ms-Button-label label-61" id="id__214">Paylaş</span></span></span></button>
                                                        </div>
                                                        <div class="hide ms-OverflowSet-item item-54">
                                                            <button type="button" role="menuitem" name="Albüme ekle" title="Albüme ekle" class="ms-Button ms-Button--commandBar ms-CommandBarItem-link root-57" data-is-focusable="true" aria-label="Albüme ekle"><span class="ms-Button-flexContainer flexContainer-58" data-automationid="splitbuttonprimary"><i data-icon-name="Photo2Add" aria-hidden="true" class="ms-Button-icon icon-140"></i><span class="ms-Button-textContainer textContainer-59"><span class="ms-Button-label label-61" id="id__293">Albüme ekle</span></span></span></button>
                                                        </div>
                                                        <div class="hide ms-OverflowSet-item item-54">
                                                            <button type="button" role="menuitem" name="Slayt gösterisi oynat" title="Slayt gösterisi oynat" class="ms-Button ms-Button--commandBar ms-CommandBarItem-link root-57" data-is-focusable="true" aria-label="Slayt gösterisi oynat"><span class="ms-Button-flexContainer flexContainer-58" data-automationid="splitbuttonprimary"><i data-icon-name="Play" aria-hidden="true" class="ms-Button-icon icon-142"></i><span class="ms-Button-textContainer textContainer-59"><span class="ms-Button-label label-61" id="id__296">Slayt gösterisi oynat</span></span></span></button>
                                                        </div>
                                                        <div class="ms-OverflowSet-item item-54">
                                                            <button id="sag" type="button" role="menuitem" name="Döndür" title="Döndür" class="ms-Button ms-Button--commandBar ms-CommandBarItem-link root-57" data-is-focusable="true" aria-label="Döndür"><span class="ms-Button-flexContainer flexContainer-58" data-automationid="splitbuttonprimary"><i data-icon-name="rotate" aria-hidden="true" class="ms-Button-icon icon-142"></i><span class="ms-Button-textContainer textContainer-59"><span class="ms-Button-label label-61" id="id__299">Döndür</span></span></span></button>
                                                        </div>
                                                        <div class="hide ms-OverflowSet-item item-54">
                                                            <button type="button" role="menuitem" name="Office Lens" title="Office Lens" class="ms-Button ms-Button--commandBar ms-CommandBarItem-link root-57" data-is-focusable="true" aria-label="Office Lens"><span class="ms-Button-flexContainer flexContainer-58" data-automationid="splitbuttonprimary"><i data-icon-name="LightningBolt" aria-hidden="true" class="ms-Button-icon icon-154"></i><span class="ms-Button-textContainer textContainer-59"><span class="ms-Button-label label-61" id="id__302">Office Lens</span></span></span></button>
                                                        </div>
                                                        <div class="ms-OverflowSet-item item-54">
                                                            <button id="resimindir" type="button" role="menuitem" name="İndir" title="İndir" class="ms-Button ms-Button--commandBar ms-CommandBarItem-link root-57" data-is-focusable="true" data-automationid="download" aria-label="İndir" tabindex="-1"><span class="ms-Button-flexContainer flexContainer-58" data-automationid="splitbuttonprimary"><i data-icon-name="Download" aria-hidden="true" class="ms-Button-icon icon-69"></i><span class="ms-Button-textContainer textContainer-59"><span class="ms-Button-label label-61" id="id__217">İndir</span></span></span></button>
                                                        </div>
                                                        <div id="buresmisil" class="ms-OverflowSet-item item-54">
                                                            <button type="button" role="menuitem" name="Sil" title="Sil" class="ms-Button ms-Button--commandBar ms-CommandBarItem-link root-57" data-is-focusable="true" aria-label="Sil"><span class="ms-Button-flexContainer flexContainer-58" data-automationid="splitbuttonprimary"><i data-icon-name="Delete" aria-hidden="true" class="ms-Button-icon icon-69"></i><span class="ms-Button-textContainer textContainer-59"><span class="ms-Button-label label-61" id="id__305">Sil</span></span></span></button>
                                                        </div>
                                                        <div class="hide ms-OverflowSet-item item-54">
                                                            <button type="button" role="menuitem" name="Orijinali görüntüle" title="Orijinali görüntüle" class="ms-Button ms-Button--commandBar ms-CommandBarItem-link root-57" data-is-focusable="true" aria-label="Orijinali görüntüle"><span class="ms-Button-flexContainer flexContainer-58" data-automationid="splitbuttonprimary"><i data-icon-name="Picture" aria-hidden="true" class="ms-Button-icon icon-66"></i><span class="ms-Button-textContainer textContainer-59"><span class="ms-Button-label label-61" id="id__308">Orijinali görüntüle</span></span></span></button>
                                                        </div>
                                                        <div class="hide ms-OverflowSet-item item-54">
                                                            <button type="button" role="menuitem" name="Ekle" title="Ekle" class="ms-Button ms-Button--commandBar ms-CommandBarItem-link root-57" data-is-focusable="true" aria-label="Ekle" tabindex="-1"><span class="ms-Button-flexContainer flexContainer-58" data-automationid="splitbuttonprimary"><i data-icon-name="Embed" aria-hidden="true" class="ms-Button-icon icon-69"></i><span class="ms-Button-textContainer textContainer-59"><span class="ms-Button-label label-61" id="id__220">Ekle</span></span></span></button>
                                                        </div>
                                                        <div class="hide ms-OverflowSet-item item-54">
                                                            <button type="button" role="menuitem" name="Kopyala" title="Kopyala" class="ms-Button ms-Button--commandBar ms-CommandBarItem-link root-57" data-is-focusable="true" data-automationid="copy" aria-label="Kopyala" tabindex="-1"><span class="ms-Button-flexContainer flexContainer-58" data-automationid="splitbuttonprimary"><i data-icon-name="Copy" aria-hidden="true" class="ms-Button-icon icon-134"></i><span class="ms-Button-textContainer textContainer-59"><span class="ms-Button-label label-61" id="id__223">Kopyala</span></span></span></button>
                                                        </div>
                                                        <div class="hide ms-OverflowSet-overflowButton overflowButton-55">
                                                            <button type="button" role="menuitem" title="Seçili öğelerle yapabileceğiniz diğer işlemler" class="ms-Button ms-Button--commandBar ms-Button--hasMenu ms-CommandBar-overflowButton root-129" aria-label="Seçili öğelerle yapabileceğiniz diğer işlemler" data-is-focusable="true" aria-expanded="false" aria-haspopup="true"><span class="ms-Button-flexContainer flexContainer-58" data-automationid="splitbuttonprimary"><i data-icon-name="More" role="presentation" aria-hidden="true" class="ms-Icon root-41 css-33 ms-Button-menuIcon menuIcon-136" style="font-family: FabricMDL2Icons;"></i></span></button>
                                                        </div>
                                                    </div>
                                                    <div role="group" style="float: right" class="ms-OverflowSet ms-CommandBar-secondaryCommand secondarySet-56">
                                                        <div class="ms-OverflowSet-item item-54">
                                                            <button type="button" role="menuitem" name="Önceki" title="Önceki" class="ms-Button ms-Button--commandBar ms-CommandBarItem-link root-57" data-is-focusable="true" data-automationid="previousButton" aria-label="Önceki"><span class="ms-Button-flexContainer flexContainer-58" data-automationid="splitbuttonprimary"><i data-icon-name="ChevronLeft" aria-hidden="true" class="ms-Button-icon icon-69"></i><span class="ms-Button-textContainer textContainer-59"><span class="ms-Button-label label-61" id="id__235">Önceki</span></span></span></button>
                                                        </div>
                                                        <div class="hide ms-OverflowSet-item item-54">
                                                            <button type="button" role="menuitem" name="4 / 4" title="4 / 4" class="ms-Button ms-Button--commandBar ms-CommandBarItem-link is-disabled root-57" data-is-focusable="false" data-automationid="oneUpPageCount" tabindex="-1" aria-label="4 / 4"><span class="ms-Button-flexContainer flexContainer-58" data-automationid="splitbuttonprimary"><i aria-hidden="true" class="ms-Button-icon icon-152"></i><span class="ms-Button-textContainer textContainer-59"><span class="ms-Button-label label-61" id="id__226">4 / 4</span></span></span></button>
                                                        </div>
                                                        <div class="ms-OverflowSet-item item-54">
                                                            <button type="button" role="menuitem" name="Sonraki" title="Sonraki" class="ms-Button ms-Button--commandBar ms-CommandBarItem-link is-invisible root-57" data-is-focusable="false" data-automationid="nextButton" aria-label="Sonraki"><span class="ms-Button-flexContainer flexContainer-143" data-automationid="splitbuttonprimary"><i data-icon-name="ChevronRight" aria-hidden="true" class="ms-Button-icon icon-69"></i><span class="ms-Button-textContainer textContainer-59"><span class="ms-Button-label label-61" id="id__238">Sonraki</span></span></span></button>
                                                        </div>
                                                        <div class="ms-OverflowSet-item item-54">
                                                            <button onclick="ClosePreview()" type="button" role="menuitem" name="Kapat" title="Kapat" class="ms-Button ms-Button--commandBar ms-CommandBarItem-link hide-label root-57" data-is-focusable="true" data-automationid="close" aria-label="Kapat" tabindex="-1"><span class="ms-Button-flexContainer flexContainer-58" data-automationid="splitbuttonprimary"><i data-icon-name="Cancel" aria-hidden="true" class="ms-Button-icon icon-69"></i><span class="ms-Button-textContainer textContainer-59"><span class="ms-Button-label label-61" id="id__229">Kapat</span></span></span></button>
                                                        </div>
                                                        <div id="resimbilgisiiste" class=" ms-OverflowSet-item item-54">
                                                            <button type="button" role="menuitem" name="" title="Ayrıntılar bölmesini açın" class="ms-Button ms-Button--commandBar ms-CommandBarItem-link hide-label root-57" aria-controls="DetailsPane-212" aria-expanded="false" data-is-focusable="true" data-automationid="showProperties" tabindex="-1"><span class="ms-Button-flexContainer flexContainer-58" data-automationid="splitbuttonprimary"><i data-icon-name="Info" aria-hidden="true" class="ms-Button-icon icon-69"></i><span class="ms-Button-label label-61" id="id__232"></span></span></button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="OneUp-content" style="background: #fff; text-align: center;" role="presentation">
                </div>
            </div>
        </div>
    </div>
    <input style="display: none;" id="inputReGallery" />
    <input value="0" style="display: none;" id="resimid" />
    <input runat="server" style="display: none;" id="inputPath" />
    <div style="display: none;" id="klasorhatasi"></div>
    <div style="display: none" class="ogesayi">0</div>
    <input id="silinecekdosya" style="display: none" value="" />
    <input id="SelectedObjectList" style="display: none;" value="" />
    <input id="BoolPicture" style="display: none;" value="" />
    <script src="Library/js/JsonToFile.js"></script>
    <script src="Library/js/JsonToFolder.js"></script>
    <script src="Library/js/slayt.js"></script>
    <script type="text/javascript">
        $(document).ready(function () {
            setTimeout(

                function () {

                    $(".SubTools").show()
                }
                , 2000);


            $.each($("[class*='col-']"), function () {

                $(this).addClass("padd0")


            });


            var googleadres = "https://docs.google.com/gview?url=";
            var popop = "width=800,height=600,scrollbars=no,resizable=yes,status=yes,toolbar=no,location=no,menubar=no";
            var domain = "http://sadeceosgb.com/";

            setTimeout(resimdoldur, 1);

            function resimdoldur() {

                $.each($(".PicturePreview"), function () {

                    $(this).css("background-image", 'url(' + $(this).attr("data-value") + ')');


                });




                ma5gallery('.PictureDiv .PicturePreview');




            }





            $('input:checkbox').removeAttr('checked');
            $("#secilisayi").removeClass("SelectedObjectCount");
            $("#secilisayi").attr("data-id", "0");


            $("#firmmenu").addClass("active");
            $("#firmmenu ul").css("display", "none");

            function ilkdizinokuma() {

                var verginumarasi = $('#vergino').html();

                var kelime = "<li data-id='" + verginumarasi + "' id='dosyalar/" + verginumarasi + "'>Ana Dizin</li>";
                $('#yollaar').append(kelime);
            }



            setTimeout(ilkdizinokuma, 1);

            $('input:checkbox').hide();


            $('.NewFileUpload').click(function () {
                OpenModal("Add", "Files");
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




            $('.secme').click(function () {

                $('input:checkbox').fadeToggle();
                $('.silresim').fadeToggle();
                $('.dosyabilgisi').fadeToggle();

            });

            $(document).on('click', '.ma5-imgbox', function () {


                $('#resimisim').fadeToggle();
                $('.ma5-bg').fadeToggle();


            });

 




            $(document).on('dblclick', '.PreviewFile', function () {
                var FileType = $(this).attr("data-type");
                var FileName = $(this).attr("data-name");
                var FileUrl = $("#inputPath").val() + "/" + FileName;
                if (FileType == "Picture") {
                    $('.OneUp-content').html("<img data-name='" + FileName + "'  data-fileurl='" + FileUrl + "' class='CurrentPictureName img-responsive' src='" + FileUrl + "'/><br><br><span>" + FileName + "</span>");
                    $(".ShowPicture").fadeToggle();
                }
                else if (FileType == "File") {

                    var google = googleadres + domain + $(this).attr("data-name");
                    popup = window.open(google, 'my_popup', popop);
                    OpenModal("Picture", "Preview")

                }
                else if (FileType == "pdf") {

                    var PDFURL = $("#inputPath").val() + "/" +$(this).attr("data-filename");
                    $('.OneUp-content').html("<iframe src='" + PDFURL + "' style='width:100%;height:100%'></iframe>");
                    $(".ShowPicture").fadeToggle();

                }

            });




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


            var LoadingHTML = '<div class="ProgressSpinnerFlat" role="progressbar"> <div aria-hidden="true">•</div> <div aria-hidden="true">•</div> <div aria-hidden="true">•</div> <div aria-hidden="true">•</div> <div aria-hidden="true">•</div> </div>';


            function isleme() {
                //$("#icerikler").css("opacity", "0.10");
                //$("#loading").show();
                setTimeout(islembitti, 1500);
                $(".LoadingData").html(LoadingHTML)

            }
            function islembitti() {
                $("#icerikler").css("opacity", "1");
                $(".LoadingData").html("")

            }



            $(document).on('click', '#buresmisil', function () {
                var resimid = $("#resimdonder").attr("data-id");

                $("#inputReGallery").attr("value", "ok");
                $("#Notif").modal("show");

                $("#resimid").val(resimid);

                $("#silinecekdosya").val($("#resimdonder").attr("src"));
                $('#resimpanel').html();
                $('#BoolPicture').val("evet");

            });



            $(document).on('click', '#sol', function () {


                $(".ma5-active").addClass("isleniyor");




                $(".ma5-imgbox").css("background-color", "white")

                dondur('sol');

            });

            $(document).on('click', '#sag', function () {
                $(".ma5-active").addClass("isleniyor");

                dondur('sag');

            });

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


                    },
                    error: function (err) {
                        alert(err.statusText);
                    }
                });

            }



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





            $("#btnMultiDelete").click(function () {

                var fileswilldeletenow = $("#SelectedObjectList").val();
                var waysfiles = $("#inputPath").val();

                cmdFolderDeleteProcess(fileswilldeletenow, waysfiles);
                cmdFoldersDeleteProcess(fileswilldeletenow, waysfiles);
                $("#toplusilme").modal("hide");
                $("#SelectedObjectList").val("");
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

            $('html').keyup(function (e) {
                if (event.keyCode == 46) {

                    if ($('#resimdonder').length > 0) {

                        var resimid = $("#resimdonder").attr("data-id");

                        $("#inputReGallery").attr("value", "ok");
                        $("#Notif").modal("show");

                        $("#resimid").val(resimid);

                        $("#silinecekdosya").val($("#resimdonder").attr("src"));
                        $('#resimpanel').html();
                        $('#BoolPicture').val("evet");
                    }
                    else {



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
                    else {



                    }





                }

            });

            $("#btnDeletePicture").click(function () {
                $("#Notif").modal("hide");
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


            function ThumbSil(FullPath) {

                $.ajax({
                    url: "DosyaSistem/ThumbSil.ashx",
                    type: "POST",
                    data: {
                        "dosya": FullPath,

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
                        $("#paneller").html("");
                        // $("#paneller").html(JsonToFolder(result));

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


                        // $("#ResimPanel").html(JsonToPicture(result));
                        $(".temporary").append(JsonToFolder(result, "Picture"))

                        if ($(".PictureCount").html() == "0") {
                            $("#ResimPanel").hide()
                        } else {
                            $("#ResimPanel").show()

                        }

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
                        resimdoldur();

                        if ($("#inputReGallery").val() == "ok") {
                            $('#Resimpanel').removeClass("ma5-control");
                            $('.PicturePreview').css("height", "100px");
                            $('.resimislem').css("display", "none");
                            $('.resimbaslik').css("display", "none");
                            $('#resimisim').css("display", "block");
                            $('.PictureDiv').removeClass("col-xs-6 col-sm-4 col-md-2 col-lg-2");
                            $('#BoolPicture').val("");
                            $("#ResimPanel").find('.PictureDiv').wrapAll('<div class="ma5-bg" />');
                            var resimidmiz = $("#resimid").val().substring(5, 10);

                            var resimsayisi = $(".resimbaslik .ogesayi").html();

                            if (resimsayisi > resimidmiz) {
                                ilkresim = "#" + $("#resimid").val();
                            }
                            else {

                                ilkresim = "#" + $(".PicturePreview:first").attr("id");
                            }
                            $(".ma5-imgbox").remove();
                            var url = $(ilkresim).attr('data-info');
                            var name = $(ilkresim).attr('data-name');
                            var id = $(ilkresim).attr('id');
                            ma5showActive(url, name, id);
                            setTimeout(function deneme() {
                                if ($("#resimdonder").attr("src") == "undefined") {
                                    $(".ma5-imgbox").remove();
                                    $('.PicturePreview').css("height", "200px");
                                    $('.resimislem').css("display", "block");
                                    $('.resimbaslik').css("display", "block");
                                    $('#resimisim').css("display", "none");
                                    $('.PictureDiv').addClass("col-xs-6 col-sm-4 col-md-2 col-lg-2");
                                    $('#resimisim').css("display", "none");
                                    $('body').removeClass("ma5-gallery-active");
                                    $('#ResimPanel').removeClass("ma5-control");
                                    $(".ma5-bg").remove();

                                }
                            }
                                , 200);


                        }

                    },
                    error: function (err) {
                        alert(err.statusText);

                    }
                })
            }  // DOSYA İSTEME AJAX



        });
    </script>
    <script type="text/javascript">
        var selectedFiles;

        $(document).ready(function () {




            if (!Modernizr.draganddrop) {
                alert("Html 5 Hatası");
                return;
            }

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

        function resimdoldur() {





            $.each($(".PicturePreview"), function () {

                $(this).css("background-image", 'url(' + $(this).attr("data-value") + ')');


            });



            ma5gallery('.PictureDiv .PicturePreview');

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
                                    ma5gallery('.PictureDiv .PicturePreview');

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
    </script>
    <script type='text/javascript'>
        $(document).ready(function () {


            $('form').submit(function (ev) {
                $(window).scrollTop(0);
                return upload_images_selected(ev, ev.target);

            })


            function resimdoldur() {
                $.each($(".PicturePreview"), function () {

                    $(this).css("background-image", 'url(' + $(this).attr("data-value") + ')');


                });



                ma5gallery('.PictureDiv .PicturePreview');

            }

        })
        function ClosePreview() {
            $(".ShowPicture").fadeToggle();

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
                                            ma5gallery('.PictureDiv .PicturePreview');

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

  <div class="ms-PanelExample">
  <button class="ms-Button">
    <span class="ms-Button-label">Open Panel</span> 
  </button>
  <div class="ms-Panel">
    <button class="ms-Panel-closeButton ms-PanelAction-close">
      <i class="ms-Panel-closeIcon ms-Icon ms-Icon--Cancel"></i>
    </button>
    <div class="ms-Panel-contentInner">
      <p class="ms-Panel-headerText">Panel</p>
      <div class="ms-Panel-content">
        <span class="ms-font-m">Content goes here</span> 
      </div>
    </div>
  </div>
</div>
<script type="text/javascript">
    var PanelExamples = document.getElementsByClassName("ms-PanelExample");
    for (var i = 0; i < PanelExamples.length; i++) {
        (function () {
            var PanelExampleButton = PanelExamples[i].querySelector(".ms-Button");
            var PanelExamplePanel = PanelExamples[i].querySelector(".ms-Panel");
            PanelExampleButton.addEventListener("click", function (i) {
                new fabric['Panel'](PanelExamplePanel);
            });
        }());
    }
</script>
</asp:Content>
