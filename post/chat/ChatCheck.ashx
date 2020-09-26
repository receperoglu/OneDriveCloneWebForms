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
        string konusmaid = context.Request["konusmaid"];

        string olaylarsonuc = "";
        string personel = "";
        try
        {


            try
            {




                personel =  context.Request.Cookies["bilgi"].Value ;

                SqlCommand enbuyuid = new SqlCommand("Select kullanici.adi as kisi,kullanici.renk as renk,chatlist.icerik as konusma,kullanici.id as kisiid from  ChatSub as chatlist left join Users as kullanici on chatlist.pers = kullanici.id where chatlist.chatmain ="+konusmaid+" order by chatlist.id asc", baglanti.baglanti());
                SqlDataReader okur;
                okur = enbuyuid.ExecuteReader();

                while (okur.Read())
                {
                    if (personel == okur["kisiid"].ToString())
                    {

                    olaylarsonuc +="<div class='pull-right baslikspeakers'>"+  "Ben <div class='speakerspadding'   style='background-color:"+ okur["renk"].ToString()+";' id='speakers" + okur["kisi"].ToString() + "' data-id='" + okur["kisi"].ToString() + "' >"+okur["konusma"].ToString()+ "</div> </div><div class='clearfix'></div> ";


                    }
                    else
                    {

                    olaylarsonuc += "<div class='pull-left baslikspeakers'>"+okur["kisi"].ToString() + "<div class='speakerspadding' style='background-color:"+ okur["renk"].ToString()+";' id='speakers" + okur["kisi"].ToString() + "' data-id='" + okur["kisi"].ToString() + "'> " + "   "+okur["konusma"].ToString()+ "</div></div><div class='clearfix'></div> ";


                    }






                }

                baglanti.son();









                //string randevular = "Select firmalar.Ad as firma,kull.adi as personel,kull.renk as renk,randevu.tarih as tarih,randevu.id as id, randevu.saat as saat from Randevu as randevu, Users as kull, Firmalar as firmalar where randevu.firma = firmalar.id and kull.id = randevu.personel and randevu.id=@randevuid";


                //SqlCommand RandevuListesi = new SqlCommand(randevular, baglanti.baglanti());
                //    RandevuListesi.Parameters.AddWithValue("@randevuid",olaylarsonuc);

                //SqlDataReader ok;
                //ok = RandevuListesi.ExecuteReader();

                //while (ok.Read())
                //{
                //    olaylar += ok["id"].ToString() +ok["renk"].ToString();
                //}

                //baglanti.son();




                //olaylarsonuc = "Giriş Yapmadınız";













            }
            catch (Exception ex)
            {
                context.Response.Write(ex.ToString());
            }
            finally
            {

                context.Response.Write(olaylarsonuc );
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