<%@ WebHandler Language="C#" Class="Upload" %>

using System;
using System.Web;
using System.IO;

using System.Data.SqlClient;



public class Upload : IHttpHandler
{
    string resimid = "";

    public void ProcessRequest(HttpContext context)
    {
        string yon = context.Request["yon"].ToString();
        string yol = context.Request["yol"].ToString();
        string resimadi = context.Request["resimadi"].ToString();
         try
        {


            string resimadres = yol;
            string resimYolu = context.Server.MapPath("~/" + resimadres); //sayfadaki resmin yolunu alıyoruz
            System.Drawing.Image i = System.Drawing.Image.FromFile(resimYolu);  //resmi images türünden kaydediyoruz


            if (yon == "sol")
            {

                i.RotateFlip(System.Drawing.RotateFlipType.Rotate90FlipXY); //90 derece döndürüyoruz


            }
            else
            {

                i.RotateFlip(System.Drawing.RotateFlipType.Rotate270FlipXY); //90 derece döndürüyoruz

            }







            i.Save(resimYolu); //dönmüş halini
            i.Dispose();
            string dosya = context.Server.MapPath("~/" + resimadres);


            System.Drawing.Image img = System.Drawing.Image.FromFile(dosya);
            System.Drawing.Image thumb = img.GetThumbnailImage(156, 200, null, IntPtr.Zero);
            img.Dispose();
            thumb.Save(context.Server.MapPath("~/thumbs/") + resimadi);

        }

        catch
        {



        }
        finally
        {

            context.Response.Write(resimid);
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