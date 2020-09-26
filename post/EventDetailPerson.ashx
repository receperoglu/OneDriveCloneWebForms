<%@ WebHandler Language="C#" Class="PersonelRandevuDetayi" %>

using System;
using System.Web;
 
using System.Data.SqlClient;


public class PersonelRandevuDetayi : IHttpHandler
{

    public void ProcessRequest(HttpContext context)
    {
        fonk baglanti = new fonk();
        context.Response.ContentType = "text/plain";
        context.Response.Expires = -1;
        string olaylar = "";

        try
        {



            int personel = Convert.ToInt32( context.Request["personel"].ToString());




            try
            {

                string randevular = "Select firmalar.Ad as firma,firmalar.id as firmaid, kull.adi as personel,kull.renk as renk,kull.id as personelid, randevu.tarih as tarih,randevu.id as id, randevu.saat as saat from Randevu as randevu, Users as kull, Firmalar as firmalar where randevu.firma = firmalar.id and kull.id = randevu.personel and randevu.id=@personel";
                SqlCommand RandevuListesi = new SqlCommand(randevular, baglanti.baglanti());
                RandevuListesi.Parameters.AddWithValue("@personel",personel);
                SqlDataReader ok;
                ok = RandevuListesi.ExecuteReader();
                
                while (ok.Read())
                {

                    string saat = "";

                    saat = ok["saat"].ToString().Substring(0, 5);

                    olaylar += "<div class='col-md-12 col-xs-12 col-sm-12 personeldetail' style='background:" + ok["renk"].ToString() + "'>  <div class='col-md-10  col-xs-10 col-sm-10'> <span data-pk='" + ok["personelid"].ToString() + "' class='PersDetail'> <span title='Yetkili' alt='Yetkili' class='fa fa-user'></span> " + ok["personel"].ToString() + "</span><br> <span title='Firma' alt='Firma' data-pk='" + ok["firmaid"].ToString() + "' class='CorpDetail'><span class='fa fa-building'></span>    " + ok["firma"].ToString() + "</span><br><span title='Tarih - Saat' alt='Tarih - Saat' class='fa fa-calendar'></span> " + ok["tarih"].ToString() + " - " + saat + "</div><div  class='col-md-2  col-xs-2 col-sm-2 randevuiptal'>  <span data-pk='" + ok["id"].ToString() + "' class='randevuiptalislem fa fa-eject'></span>    </div> </div>";
              
                
                
                
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