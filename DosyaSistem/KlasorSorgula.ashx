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
        int FolderCount = 0;
        string tamamla = "";
        try
        {
            try
            {

                 
                DirectoryInfo di = new DirectoryInfo(context.Request.PhysicalApplicationPath + Folder);
                DirectoryInfo[] alt_klasorler = di.GetDirectories();
                FileList NewFiles = new FileList();
                foreach (DirectoryInfo item in alt_klasorler)
                {


                    FolderCount++;

                    NewFiles.Id = FolderCount;
                    NewFiles.Name = item.Name;
                    NewFiles.FolderCount = FolderCount.ToString();


                    Result += JsonConvert.SerializeObject(NewFiles) + ",";


                }


                if (Result != "")
                {


                    Result = Result.TrimEnd(',');
                }

                context.Response.Write("[" + Result + "]");



            }
            catch (Exception ex)
            {
                context.Response.Write("Hata oluştu,Sayfayı yenileyin" + ex.ToString());
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


    public class FileList
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string FolderCount { get; set; }
    }
}