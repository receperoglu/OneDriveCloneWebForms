<%@ WebHandler Language="C#" Class="Upload" %>

using System;
using System.Web;
using System.IO;

using System.Data.SqlClient;


public class Upload : IHttpHandler
{

    public void ProcessRequest(HttpContext context)
    {
        fonk baglanti = new fonk();
        context.Response.ContentType = "text/plain";
        context.Response.Expires = -1;
        try
        {



            string personel = context.Request["personel"];
            string firma = context.Request["firma"];
            string tarih = context.Request["tarih"];
            string saat = context.Request["saat"];
            string baslik = context.Request["baslik"];
            string durum = context.Request["durum"];



            try
            {

                SqlCommand sor = new SqlCommand("INSERT INTO Randevu (firma,personel,tarih,saat,baslik,durum) VALUES (@firma,@personel,@tarih,@saat,@baslik,@durum)", baglanti.baglanti());
                sor.Parameters.AddWithValue("@firma", firma);
                sor.Parameters.AddWithValue("@personel", personel);
                sor.Parameters.AddWithValue("@tarih", tarih);
                sor.Parameters.AddWithValue("@saat", saat);
                sor.Parameters.AddWithValue("@baslik", baslik);
                sor.Parameters.AddWithValue("@durum", durum);
                sor.ExecuteNonQuery();
                baglanti.son();


            }
            catch (Exception ex)
            {
                context.Response.Write(ex.ToString());
            }
            finally
            {

                context.Response.Write(personel + firma+tarih+saat+durum+baslik+personel);
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