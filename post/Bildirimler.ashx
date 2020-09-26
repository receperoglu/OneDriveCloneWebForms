<%@ WebHandler Language="C#" Class="YetkiliListesi" %>

using System;
using System.Web;
using System.Data.SqlClient;


public class YetkiliListesi : IHttpHandler {
    fonk baglanti = new fonk();
     string    sonuc="";

    public void ProcessRequest (HttpContext context) {
        SqlDataReader ok;
        SqlCommand yetkililer = new SqlCommand("SELECT CAST( firm.Ad AS nvarchar) as Firma FROM Bildirim as notif inner join Firmalar as firm on firm.id=notif.firmaid Group By CAST( firm.Ad as nvarchar)", baglanti.baglanti());

        ok = yetkililer.ExecuteReader();
        string sonuc = "";

      
        while (ok.Read())
        {
            


            sonuc += "<li class='list-group-item'> <a href='javascript:;'> <span class='pull-left media-icon'> <span class='circle-icon sm bg-danger'><i class='fa fa-bell-o'></i></span> </span> <div class='media-body'> <span class='block'> "+ ok["Firma"].ToString()+ " </span> <span class='text-muted'> Yetkilisi Alındı</span> </div> </a> </li>";
 
        }

        baglanti.son();




         

      


         context.Response.Write(sonuc);
    }

    public bool IsReusable {
        get {
            return false;
        }
    }

}