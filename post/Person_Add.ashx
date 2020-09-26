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
        string sonuc = "";
        context.Response.ContentType = "text/plain";
        context.Response.Expires = -1;
        try
        {


            HttpPostedFile postedFile = context.Request.Files["Filedata"];
            string sinif = context.Request["seviye"];
            string adi = context.Request["adi"];
            string adres = context.Request["adres"];
            string tcno = context.Request["tcno"];
            string telefon = context.Request["telefon"];
            string mail = context.Request["mail"];
            string kullaniciadi = context.Request["kullaniciadi"];
            string il = context.Request["il"];
            string ilce = context.Request["ilce"];
            string sifre = context.Request["sifre"];
            string rol = context.Request["rol"];


            try
            {

                SqlCommand sor = new SqlCommand("INSERT INTO SadeceOsgb.dbo.Users(Adi,Adres,Telefon,rol,Mail,tcno,durum,seviye,il,ilce,sifre) VALUES (@Adi,@Adres,@Telefon,@rol,@Mail,@tcno,@durum,@seviye,@il,@ilce,@sifre)", baglanti.baglanti());
                sor.Parameters.AddWithValue("@Adi", adi);
                sor.Parameters.AddWithValue("@Adres", adres);
                sor.Parameters.AddWithValue("@Telefon", telefon);
                sor.Parameters.AddWithValue("@Mail", mail);
                sor.Parameters.AddWithValue("@tcno", tcno);
                sor.Parameters.AddWithValue("@durum",1);
                sor.Parameters.AddWithValue("@seviye", sinif);
                sor.Parameters.AddWithValue("@il",il);
                sor.Parameters.AddWithValue("@ilce",ilce);
                sor.Parameters.AddWithValue("@sifre", sifre);
                sor.Parameters.AddWithValue("@rol", rol);
                sor.ExecuteNonQuery();
                baglanti.son();

                string savepath = "dosyalar";
                string tempPath = "dosyalar";
                 savepath = context.Server.MapPath(tempPath);
                string filename = postedFile.FileName;
                if (!Directory.Exists(savepath))
                    Directory.CreateDirectory(savepath);
                string ext = System.IO.Path.GetExtension(filename);
                string resimGuid = Guid.NewGuid().ToString();
                postedFile.SaveAs(savepath + @"\" + resimGuid + ext);
                string url = context.Request.Path;
                     

            }
            catch (Exception ex)
            {
                context.Response.Write(ex.ToString());
                sonuc = ex.ToString();
            }
            finally
            {

                context.Response.Write(postedFile.FileName);
                context.Response.StatusCode = 200;
            }
        }
        catch(Exception ex)
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