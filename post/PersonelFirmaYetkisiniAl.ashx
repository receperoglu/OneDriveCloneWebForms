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
            string cid = context.Request["datdottr"];
            try
            {



                SqlDataReader ok;
                SqlCommand yetkisialinanlar = new SqlCommand("SELECT * FROM UzmanListesi where durum='1' and yetkili_id=@id", baglanti.baglanti());
                yetkisialinanlar.Parameters.AddWithValue("@id", cid);
                ok = yetkisialinanlar.ExecuteReader();
                while (ok.Read())
                {
                    SqlCommand Kaydet = new SqlCommand("INSERT INTO bildirim (firmaid,kategori) Values (@firmaid,'Yetkilikaldirma')", baglanti.baglanti());
                    Kaydet.Parameters.AddWithValue("@firmaid", ok["firma_id"].ToString());
                    Kaydet.ExecuteNonQuery();
                    baglanti.son();

                }
                baglanti.son();

                SqlCommand guncelle = new SqlCommand("UPDATE UzmanListesi SET durum='0' where yetkili_id=@id", baglanti.baglanti());
                guncelle.Parameters.AddWithValue("@id", Convert.ToInt32(cid));
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

