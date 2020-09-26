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

        string tarih = context.Request["tarih"].ToString();
        string gercektarih = "";
        string ay = context.Request["ay"].ToString();
        string turkcetarih = "";
        try
        {








            try
            {
                if (tarih == "bugub")
                {


                    gercektarih = DateTime.Now.ToString("yyyy-MM-dd");
                    turkcetarih="Bugün";

                }

                else
                {
                    gercektarih = tarih;

                    string[]   aylar =  {"Ocak","Şubat","Mart","Nisan","Mayıs","Haziran","Temmuz","Ağustos","Eylül","Ekim","Kasım","Aralık" };

                    int aysirasi = Convert.ToInt32(ay);
                    turkcetarih = tarih.Substring(8, 2) +" "+ aylar[aysirasi-1] +" "+ tarih.Substring(0, 4);

                }


                string randevular = "Select firmalar.Ad as firma,kull.adi as personel,kull.id as personelid,firmalar.id as firmaid, kull.renk as renk,randevu.tarih as tarih, randevu.id as id, randevu.saat as saat from Randevu as randevu, Users as kull, Firmalar as firmalar where randevu.firma = firmalar.id and kull.id = randevu.personel and randevu.tarih like @tarih";
                SqlCommand RandevuListesi = new SqlCommand(randevular, baglanti.baglanti());
                RandevuListesi.Parameters.AddWithValue("@tarih", gercektarih);
                SqlDataReader ok;
                ok = RandevuListesi.ExecuteReader();

                while (ok.Read())
                {
                    string saat = "";

                    saat = ok["saat"].ToString().Substring(0, 5);

                    olaylar += "<div class='col-xs-12 personeldetail' style='background:" + ok["renk"].ToString() + "'>  <div class='col-xs-10'> <span data-pk='" + ok["personelid"].ToString() + "' class='PersDetail'> <span title='Yetkili' alt='Yetkili' class='fa fa-user'></span> " + ok["personel"].ToString() + "</span><br> <span title='Firma' alt='Firma' data-pk='" + ok["firmaid"].ToString() + "' class='CorpDetail'><span class='fa fa-building'></span>    " + ok["firma"].ToString() + "</span><br><span title='Tarih - Saat' alt='Tarih - Saat' class='fa fa-calendar'></span> " + saat + "</div><div  class='col-xs-2 randevuiptal'>  <span data-pk='" + ok["id"].ToString() + "' class='randevuiptalislem fa fa-eject'></span>    </div> </div>";
                }

                baglanti.son();



            }
            catch (Exception ex)
            {
                context.Response.Write(ex.ToString());
            }
            finally
            {

                context.Response.Write(olaylar+"<span id='vttarih' style='display:none;'>"+turkcetarih+"</span>");
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