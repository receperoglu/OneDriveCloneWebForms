<%@ WebHandler Language="C#" Class="Upload" %>

using System;
using System.Web;

using System.Data.SqlClient;


public class Upload : IHttpHandler
{

    public void ProcessRequest(HttpContext context)
    {
        fonk baglanti = new fonk();
        context.Response.ContentType = "application/json";
        context.Response.Expires = -1;
        string olaylar = "";
        string olaylarsonuc = "";
        string sonuc = "";
        string tarihturkce="s";
        try
        {


            try
            {
                string randevular = "SELECT CAST(tarih as varchar(10)) as tarih, COUNT(id) as adet FROM  Randevu GROUP BY CAST(tarih as varchar(10)) HAVING COUNT(CAST(tarih as varchar(10))) > 1";

                SqlCommand RandevuListesi = new SqlCommand(randevular, baglanti.baglanti());

                SqlDataReader ok;
                ok = RandevuListesi.ExecuteReader();

                while (ok.Read())
                {
                    olaylar += "{\"tarih\":\""+ ok["tarih"].ToString()+"\",\"adet\": \"" + ok["adet"].ToString()+"\"},";
                }

                int karaktersayisi = olaylar.Length-1;

                olaylarsonuc = olaylar.Substring(0, karaktersayisi);

                sonuc=   olaylarsonuc.Replace(@"'""", "&dquo;");
                baglanti.son();
 





            }
            catch (Exception ex)
            {
                context.Response.Write(ex.ToString());
            }
            finally
            {

                context.Response.Write("{\"items\":[" + sonuc + "],\"tarih\":[{\"turkcetarih\":\" "+tarihturkce+" \"}]}");
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