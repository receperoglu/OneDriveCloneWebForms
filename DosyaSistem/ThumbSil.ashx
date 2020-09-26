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
         string konum = context.Request["dosya"];




        string[] parcalar;

        parcalar = konum.Split('*');

        foreach (string i in parcalar)

        { 

            try
            {

                Directory.Delete(HttpContext.Current.Server.MapPath("~/thumbs/" + i), true);

            }
            catch (Exception ex)
            {
                context.Response.Write(ex.ToString());
            }


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