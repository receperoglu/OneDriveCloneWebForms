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


            //HttpPostedFile postedFile = context.Request.Files["Filedata"];
            //string id = context.Request["id"];
            string nace = context.Request["nace"];
            string sinif = context.Request["sinif"];
            string ad = context.Request["ad"];
            string adres = context.Request["adres"];
            string vd = context.Request["vd"];
            string vn = context.Request["vn"];
            string sgk = context.Request["sgk"];
            string telefon = context.Request["telefon"];
            string fax = context.Request["fax"];
            string mail = context.Request["mail"];
            string kad = context.Request["kad"];
            string ks = context.Request["ks"];
            string il = context.Request["il"];
            string ilce = context.Request["ilce"];


            try
            {

                SqlCommand sor = new SqlCommand("INSERT INTO Firmalar (Ad,Adres,Nace,Telefon,Fax,Mail,Vergi_No,Vergi_Dairesi,sgk,durum,seviye,il,ilce) VALUES (@Ad,@Adres,@Nace,@Telefon,@Fax,@Mail,@Vergi_No,@Vergi_Dairesi,@sgk,@durum,@seviye,@il,@ilce)", baglanti.baglanti());
                sor.Parameters.AddWithValue("@Ad", ad);
                sor.Parameters.AddWithValue("@Adres", adres);
                sor.Parameters.AddWithValue("@Nace", nace);
                sor.Parameters.AddWithValue("@Telefon", telefon);
                sor.Parameters.AddWithValue("@fax", fax);
                sor.Parameters.AddWithValue("@Mail", mail);
                sor.Parameters.AddWithValue("@Vergi_No", vn);
                sor.Parameters.AddWithValue("@Vergi_Dairesi", vn);
                sor.Parameters.AddWithValue("@sgk", sgk);
                sor.Parameters.AddWithValue("@durum", 1);
                sor.Parameters.AddWithValue("@seviye", sinif);
                sor.Parameters.AddWithValue("@il", il);
                sor.Parameters.AddWithValue("@ilce", ilce);
                sor.ExecuteNonQuery();
                baglanti.son();

                Directory.CreateDirectory(HttpContext.Current.Server.MapPath("~/dosyalar/" + vn));

            }
            catch (Exception ex)
            {
                context.Response.Write(ex.ToString());
            }
            finally
            {

                context.Response.Write("asd");
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