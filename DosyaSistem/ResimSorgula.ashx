<%@ WebHandler Language="C#" Class="Tarih" %>

using System;
using System.Web;
using System.IO;

using Newtonsoft.Json;




public class Tarih : IHttpHandler
{

    public void ProcessRequest(HttpContext context)
    {

        context.Response.ContentType = "text/plain";
        context.Response.Expires = -1;
        string Folder = context.Request["Folder"];
        string Result = "";
        string tamamla = "";
        try
        {
            try
            {

                string CurrentFolder = Folder;
 
                string klasoryolu = context.Request.PhysicalApplicationPath + Folder;


                int PictureId = 112;

                int sayac = 0;

                DirectoryInfo oDirInfo = new DirectoryInfo(klasoryolu);

                if (oDirInfo.Exists)
                {
                    FileInfo[] Files = oDirInfo.GetFiles();
                    FileList NewFiles = new FileList();

                    foreach (object FileName in Files)
                    {


                        string son = FileName.ToString().Substring(FileName.ToString().Length - 3);

                        string uzanti = FileName.ToString().Substring(FileName.ToString().Length - 3);



                        if (uzanti == "png" || uzanti == "PNG" || uzanti == "jpg" || uzanti == "gif" || uzanti == "peg" || uzanti == "JPG" || uzanti == "PEG")
                        {
                                 

                            NewFiles.Id = PictureId;
                            NewFiles.Name = FileName.ToString();
                            NewFiles.Ext = uzanti;
                            NewFiles.CurrentFolder = Folder;
                            Result += JsonConvert.SerializeObject(NewFiles) + ",";







                            sayac++;
                            PictureId++;


                        }



                    }
                }





                if (Result != "")
                {


                    Result = Result.TrimEnd(',');
                }

                context.Response.Write("[" + Result + "]");

            }
            catch (Exception ex)
            {
                context.Response.Write(ex.ToString());
            }
            finally
            {

                context.Response.Write(tamamla);
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


    public class FileList
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string FolderCount { get; set; }
        public string Ext { get; set; }
        public string CurrentFolder { get; set; }

    }


}