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
        string olaylarsonuc = "";
        string personel = "";
        try
        {


            try
            {




                personel =  context.Request.Cookies["bilgi"].Value ;

                SqlCommand enbuyuid = new SqlCommand("select CAST( chatlist.chatmain as nvarchar) as idchat , CAST( kullanici.adi as nvarchar) as adipers from ChatMain as chatana, Users as kullanici ,  ChatSub as chatlist left join ChatMain as chatana2 on chatana2.id =chatlist.chatmain where chatlist.pers=kullanici.id   and chatana2.id = chatlist.chatmain and   chatlist.pers <>     " + personel + "   group by CAST( kullanici.adi AS nvarchar) ,CAST( chatlist.chatmain as nvarchar)", baglanti.baglanti());
                SqlDataReader okur;
                okur = enbuyuid.ExecuteReader();

                while (okur.Read())
                {

                    olaylarsonuc += "<div class='speakerstitle' id='speakers" + okur["idchat"].ToString() + "' data-id='" + okur["idchat"].ToString() + "' class='col-md-12'> " + okur["adipers"].ToString() + "</div> ";

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