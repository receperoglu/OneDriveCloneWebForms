<%@ WebHandler Language="C#" Class="Z_Arac_Dondu" %>
using System;
using System.Web;
using System.Data.SqlClient;
public class Z_Arac_Dondu : IHttpHandler
{
    string yazi = "";
    fonk baglanti = new fonk();
    public void ProcessRequest(HttpContext context)
    {

        context.Response.ContentType = "text/plain";
        context.Response.Expires = -1;
        try
        {
            HttpPostedFile postedFile = context.Request.Files["Filedata"];
            string cid = context.Request["veri"];
            try
            {

                SqlDataReader okuyucu;

                SqlCommand sor = new SqlCommand("SELECT durum FROM Firmalar where id=@id", baglanti.baglanti());
                sor.Parameters.AddWithValue("@id",Convert.ToInt32(cid));
                okuyucu = sor.ExecuteReader();
                string durumoku = "";
                string sonuc = "";
                while (okuyucu.Read()) 
                {
                    durumoku = okuyucu["durum"].ToString();

                }

                if (durumoku == "1")
                {

                    sonuc = "0";
                    yazi = "NO";

                }
                else {

                    sonuc = "1";
                    yazi = "OK";
                }

                SqlCommand guncelle = new SqlCommand("UPDATE Firmalar SET durum=@status where id=@id",baglanti.baglanti());
                guncelle.Parameters.AddWithValue("@status",Convert.ToInt32(sonuc));
                guncelle.Parameters.AddWithValue("@id",Convert.ToInt32(cid));
                guncelle.ExecuteNonQuery();
                     baglanti.son();
            }
            catch (Exception ex)
            {
                context.Response.Write(ex.ToString());
            }
            finally
            {

                context.Response.Write(yazi);
                context.Response.StatusCode = 200;
            }
        }
        catch
        {
            context.Response.Write(yazi);
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

