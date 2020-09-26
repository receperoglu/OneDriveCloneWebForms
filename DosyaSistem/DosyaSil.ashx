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
        string dosya = context.Request["dosya"];

        try
        {

            try
            {

                int soruisareti = dosya.IndexOf('?');
                int dosyadiuzunlugu = dosya.Length;
                string dosyaadi = dosya.Substring(0, soruisareti);

                System.IO.File.Delete(HttpContext.Current.Server.MapPath("~/" +dosyaadi));
                context.Response.Write(dosyaadi);
            }
            catch
            {
                System.IO.File.Delete(HttpContext.Current.Server.MapPath("~/" +dosya));

context.Response.Write(dosya);

            }








        }
        catch (Exception ex)
        {
            context.Response.Write(ex.ToString());
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