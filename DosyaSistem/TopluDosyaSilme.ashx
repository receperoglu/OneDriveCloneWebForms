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
        string konum = context.Request["konum"];




        string[] parcalar;

        parcalar = klasor.Split('*');

        foreach (string i in parcalar)

        { 

            try
            {

 
               System.IO.File.Delete(HttpContext.Current.Server.MapPath("~/"+konum+"/"+i));

                                    context.Response.Write(konum+i);


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