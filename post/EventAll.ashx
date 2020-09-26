<%@ WebHandler Language="C#" Class="Upload" %>

using System;
using System.Web;

using System.Data.SqlClient;


public class Upload : IHttpHandler
{

    public void ProcessRequest(HttpContext context)
    {
        fonk baglanti = new fonk();
        context.Response.ContentType = "text/plain";
        context.Response.Expires = -1;
        string olaylar = "";
        string olaylarsonuc = "";

        try
        {


            try
            {

                 SqlCommand enbuyuid = new SqlCommand("SELECT top(1) id  FROM Randevu order by id desc",baglanti.baglanti());
                SqlDataReader okur;
                okur = enbuyuid.ExecuteReader();
                int id=0;
                while (okur.Read())
                {

                    olaylarsonuc = okur["id"].ToString();

                }

                baglanti.son();


                string randevular = "Select firmalar.Ad as firma,kull.adi as personel,kull.renk as renk,randevu.tarih as tarih,randevu.id as id, randevu.saat as saat from Randevu as randevu, Users as kull, Firmalar as firmalar where randevu.firma = firmalar.id and kull.id = randevu.personel and randevu.id=@randevuid";


                SqlCommand RandevuListesi = new SqlCommand(randevular, baglanti.baglanti());
                    RandevuListesi.Parameters.AddWithValue("@randevuid",olaylarsonuc);

                SqlDataReader ok;
                ok = RandevuListesi.ExecuteReader();

                while (ok.Read())
                {
                    olaylar += ok["id"].ToString() +ok["renk"].ToString();
                }

                baglanti.son();






            }
            catch (Exception ex)
            {
                context.Response.Write(ex.ToString());
            }
            finally
            {

                context.Response.Write(olaylar);
                context.Response.StatusCode = 200;
            }
        }
        catch(Exception ex)
        {
            context.Response.Write("Hata Oldu Kapat Hemen"+ ex.ToString());
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