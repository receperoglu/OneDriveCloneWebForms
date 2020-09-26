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
        string klasor = context.Request["Folder"];
        string tamamla = "";
        string tamurl = "";
        try
        {
            try
            {


                tamurl = "~/" +klasor;


                string tarih = System.IO.File.GetLastWriteTime(context.Server.MapPath(tamurl)).ToString("dd-MM-yyyy");
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
                tamamla = "Oluşturma Tarihi : " + tarih+ "<br> Saati : "+saat +"<br>Boyutu : " +boyut  ;


            }
            catch (Exception ex)
            {
                context.Response.Write(ex.ToString() +tamurl+"deneme");
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




}