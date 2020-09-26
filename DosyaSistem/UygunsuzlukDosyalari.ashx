<%@ WebHandler Language="C#" Class="Tarih" %>

using System;
using System.Web;
using System.IO;






public class Tarih : IHttpHandler
{

    public void ProcessRequest(HttpContext context)
    {

        context.Response.ContentType = "text/plain";
        context.Response.Expires = -1;
        string klasor = context.Request["klasor"];
        string sonuc = "";
        string tamamla = "";
        int sayac = 0;
        int dosyasayac = 0;
                            string resimler = "";

        try
        {
            try
            {

                string okunacakklasor = klasor;
                string domain = "http://www.sadeceosgb.com/";

                string klasoryolu = context.Request.PhysicalApplicationPath + okunacakklasor;


                int dosyaid = 0;
                     int resimid = 200;

                DirectoryInfo oDirInfo = new DirectoryInfo(klasoryolu);

                if (oDirInfo.Exists)
                {
                    FileInfo[] Files = oDirInfo.GetFiles();
                    foreach (object FileName in Files)
                    {


                        string son = FileName.ToString().Substring(FileName.ToString().Length - 3);
                        string uzanti = FileName.ToString().Substring(FileName.ToString().Length - 3);
            

 

                        if (uzanti == "png" || uzanti == "PNG" || uzanti == "jpg" || uzanti == "gif" || uzanti == "peg" || uzanti == "JPG" || uzanti == "PEG")
                        {

 string resimisim = FileName.ToString();
                            string hesaplanmis = "";
                            if (resimisim.Length > 15)
                            {

                                hesaplanmis = resimisim.Substring(0, 15) + "...";

                            }
                            else
                            {
                                hesaplanmis = resimisim;

                            }

                    resimler += "<div  id='resimid" + resimid + "' data-id='" + resimid + "' data-info='" + uzanti + "' class='col-xs-6 col-sm-4 col-md-2 col-lg-2 resimdiv'><div id='resim"+sayac+"' data-value='/thumbs/" + FileName.ToString() + "'  data-id='resimdat"+sayac+ "' data-info='" + okunacakklasor + "/" + FileName.ToString() + "'  data-name='" + FileName.ToString() + "'   class='resimolcusu'><span class='resimadidikey'>"+hesaplanmis+"</span>  </div><div class='resimislem'><div class='pull-left'> "+
                                    "<i data-icon-name='Delete'  class='silresim ms-Button-icon icon-65'   data-info='resimid" + resimid + "' data-value='" + okunacakklasor + "/" + FileName.ToString() + "' data-id='" + FileName.ToString() + "'   ></i>  <input type='checkbox' name='klasorsecici' data-id='" + FileName.ToString() + "' class='' id='input" + resimid + "' /> </div> </div>  </div>";





                            sayac++;
                            resimid++;


                        }
                        else
                        {


                            string tamurl = "~/" + okunacakklasor + "/" + FileName.ToString();


                            string  tarih = System.IO.File.GetLastWriteTime(context.Server.MapPath(tamurl)).ToString("dd-MM-yyyy");
                            string saat = System.IO.File.GetLastWriteTime(context.Server.MapPath(tamurl)).ToString("HH:mm");
                            FileInfo bilgi = new FileInfo(context.Server.MapPath(tamurl));

                            string[] suffixes = { "B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB" };
                            int s = 0;
                            long size = bilgi.Length;

                            while (size >= 1024)
                            {
                                s++;
                                size /= 1024;
                            }

                            string boyut = String.Format("{0} {1}", size, suffixes[s]);


                            string    aktifdurum = "<div id='dosyaid" + dosyaid + "' data-pk='" + sayac + "' data-id='" + dosyaid + "' data-info='"+FileName.ToString().Substring(0, 2)+"' class='col-md-12 dosyalist'> <div class='col-md-9 col-xs-7'> <input type='checkbox'  name='klasorsecici' data-id='" +FileName + "'  class='sildosyasec' id='input" + dosyaid + "'   /> <img class='dosya' data-info='" + son + "' data-id='" + FileName + "'  id='" +   okunacakklasor + "/" + FileName.ToString() + "'   style='width:40px;' src='ico/" + son + ".png' /> <span style='text-align:left;'>" + FileName.ToString() +  "</span> </div><div class='col-md-3 col-xs-5 dosyabilgisi'><span   id='dtarih"+sayac+"' class='dtarih'>"+ tarih +" " +saat+  " "+boyut.ToString()+ "</span><span class='islemgrup' id='islemgrup"+sayac+"'> <img  data-info='" + son + "' data-id='" + FileName + "'  id='" + okunacakklasor + "' src='ico/download.png'   data-value='" + okunacakklasor + "/" + FileName.ToString() + "' class='download'/> <img  data-info='" + son + "' data-id='" + FileName + "'  id='" + domain + okunacakklasor + "/" + FileName.ToString() + "'  data-value='"  + okunacakklasor + "/" + FileName.ToString() + "' src='ico/eye.png'  class='eye'/>   <img width='25px' data-info='dosyaid" + dosyaid + "'   data-id='" + FileName + "'  id='" + domain + okunacakklasor + "/" + FileName.ToString() + "' src='ico/sil.png'  class='sildosya'/></span> <img class='info' data-pk='"+sayac+"' width='25px' id='info"+sayac+"' src='ico/info.png'/> </div>   </div>";
                            sonuc = sonuc + aktifdurum;
                            dosyaid++;
                            sayac++;
                            dosyasayac++;
                        }



                    }
                }


                if (dosyasayac > 0)
                {

                    tamamla =   sonuc;

                }
                else
                {
                    tamamla = "";
                }




            }
            catch (Exception ex)
            {
                context.Response.Write(ex.ToString());
            }
            finally
            {

                context.Response.Write(resimler+"<div class='clearfix'></div>"+tamamla);
                context.Response.StatusCode = 200;
            }
        }
        catch
        {
            context.Response.Write("Hata Oldu Kapat Hemen");
        }
    }

    public bool IsReusable
    {
        get
        {
            return false;
        }
    }

    static string tarihogren(string dosya)
    {


        FileInfo dosyabilgisi = new FileInfo(dosya);
        string boyut = dosyabilgisi.Extension.ToString();
        string cleanAmount = boyut.Replace(".", string.Empty);
        return cleanAmount;

    }


}