<%@ WebHandler Language="C#" Class="Tarih" %>

using System;
using System.Web;
using System.Data.OleDb;
using System.IO;




public class Tarih : IHttpHandler
{

    public void ProcessRequest(HttpContext context)
    {

        context.Response.ContentType = "text/plain";
        context.Response.Expires = -1;
        string klasor = context.Request["Folder"];
        string sonuc = "";
       
        try
        {
            try
            { if (!Directory.Exists(HttpContext.Current.Server.MapPath("~/"+klasor)))
            Directory.CreateDirectory(HttpContext.Current.Server.MapPath("~/"+klasor)); 
            }
            catch (Exception ex)
            {
                context.Response.Write(ex.ToString());
            }
            finally
            {

                context.Response.Write(sonuc);
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