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

                SqlCommand enbuyuid = new SqlCommand("SELECT count(*)  FROM Randevu where durum like '0' and personel like @personel",baglanti.baglanti());

                enbuyuid.Parameters.AddWithValue("@personel",context.Request.Cookies["bilgi"].Value);


                SqlDataReader okur;
                okur = enbuyuid.ExecuteReader();
                int id=0;
                while (okur.Read())
                {

                    olaylarsonuc = okur[0].ToString();

                }

                baglanti.son();



                    Guncelle(context.Request.Cookies["bilgi"].Value);





            }
            catch (Exception ex)
            {
                context.Response.Write(ex.ToString());
            }
            finally
            {

                context.Response.Write(olaylarsonuc);
                context.Response.StatusCode = 200;
            }
        }
        catch(Exception ex)
        {
            context.Response.Write("Hata Oldu Kapat Hemen"+ ex.ToString());
        }
    }


    public   void Guncelle(string personel)
    {
        fonk baglanti = new fonk();
        SqlCommand enbuyuid = new SqlCommand("Update Randevu set durum='1' where personel like @personel",baglanti.baglanti());

        enbuyuid.Parameters.AddWithValue("@personel",personel);

            enbuyuid.ExecuteNonQuery();


    }

    public bool IsReusable
    {
        get
        {
            return false;
        }
    }
}