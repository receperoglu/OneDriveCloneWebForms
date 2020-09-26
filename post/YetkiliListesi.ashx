<%@ WebHandler Language="C#" Class="YetkiliListesi" %>

using System;
using System.Web;
using System.Data.SqlClient;


public class YetkiliListesi : IHttpHandler {
    fonk baglanti = new fonk();
     string    sonuc="";

    public void ProcessRequest (HttpContext context) {
        SqlDataReader ok;
        SqlCommand yetkililer = new SqlCommand("Select CAST( y.seviye AS nvarchar) as seviye , CAST( y.adi AS nvarchar) as adi, CAST(r.rol AS NVARCHAR) as RolAdi, CAST( y.tcno AS nvarchar) as tcno , CAST( y.id AS nvarchar) as kullid , CAST( y.durum AS nvarchar) as userdurum, COUNT(a.yetkili_id) as adet from Roller as r inner join Users as y on y.rol= r.id inner join UzmanListesi as a on a.yetkili_id = y.id and a.durum=1 Group By CAST( y.seviye AS nvarchar) ,CAST( y.adi AS nvarchar) , CAST(r.rol AS NVARCHAR) , CAST( y.tcno AS nvarchar) , CAST( y.id AS nvarchar) , CAST( y.durum AS nvarchar)", baglanti.baglanti());

        ok = yetkililer.ExecuteReader();
        string durum = "";
        string sonuc = "";
        string ilkid = "";
        while (ok.Read())
        {
            ilkid = ok["kullid"].ToString();
            durum = ok["userdurum"].ToString();


            sonuc += "<div id='yonet" + ok["kullid"].ToString() + "' class='uzman col-md-12 '><div class='col-md-1'><span> <span   id ='DC" + ilkid + "' class='switch'><label><input data-info='bir' data-id='" + ok["adi"].ToString() + "' data-value='" + ilkid + "' type='checkbox' checked='checked'  id='C" + ilkid + "'><span class='lever'></label></span>    <img   id ='RC" + ilkid + "'  style='display:none;'  src='yukleme.gif' /></span></div>   <div class='col-md-4'>     <div id='" + ok["kullid"].ToString() + "' data-id='" + ok["RolAdi"].ToString() + "' data-info='" + ok["adi"].ToString() + "' data-value='yonet" + ok["kullid"].ToString() + "' class='uzmanadi'>" + ok["adi"].ToString() + "</div></div> <div class='tcno col-md-2'>" + ok["RolAdi"].ToString() + " </div> <div class='col-md-1'>" + ok["tcno"].ToString() + "</div> <div class='yetki col-md-2 text-center'><span id='" + ok["kullid"].ToString() + "' data-id='" + ok["RolAdi"].ToString() + "' data-info='" + ok["adi"].ToString() + "' data-value='yonet" + ok["kullid"].ToString() + "' class='uzmanadi'><i style='color: #428bca' class='fa fa-search'></i></span><span id='" + ok["kullid"].ToString() + "' data-id='" + ok["RolAdi"].ToString() + "' data-info='" + ok["adi"].ToString() + "' data-value='yonet" + ok["kullid"].ToString() + "' class='bilgiduzenle'><i style='color: #428bca' class='fa fa-pencil-square-o'></i></div><div class='col-md-2 text-center>'<span class='adet'> " + ok["adet"].ToString() + "</span><span> Firma</span> </div> </div>";



        }

        baglanti.son();




        SqlCommand yetkisizler = new SqlCommand("select CAST( userim.seviye AS nvarchar) as seviye, CAST( userim.adi AS nvarchar) as Uzmanadi,CAST( y.rol AS nvarchar) as roladi ,CAST( userim.id AS nvarchar) as kullid , CAST(userim.tcno AS nvarchar) as uzmantcno,CAST(userim.durum AS nvarchar) as userdurum ,CAST(y.rol AS nvarchar) as UzmanRol from Users as userim inner join Roller as y on y.id=userim.rol where not exists ( Select CAST( y.id AS nvarchar) as kullid , COUNT(a.yetkili_id) as adet from Roller as r inner join Users as y on y.rol= r.id inner join UzmanListesi as a on a.durum=1 and a.yetkili_id=userim.id Group By CAST( y.id AS nvarchar) ) Group By CAST( userim.seviye AS nvarchar) ,CAST( userim.adi AS nvarchar) ,CAST( y.rol AS nvarchar) ,CAST( userim.id AS nvarchar) , CAST(userim.tcno AS nvarchar),CAST(userim.durum AS nvarchar)", baglanti.baglanti());
        ok = yetkisizler.ExecuteReader();


        string yetkisiz = "";

        while (ok.Read())
        {
            ilkid = ok["kullid"].ToString();
            durum = ok["userdurum"].ToString();


            if (durum == "0")
            {

                yetkisiz += "<div id='yonet" + ok["kullid"].ToString() + "' class='uzman col-md-12 '><div class='col-md-1'><span><span id ='DC" + ilkid + "' class='switch'><label ><input data-info='pasif' type='checkbox' id='C" + ilkid + "'><span class='lever'></label></span> <img id ='RC" + ilkid + "' style='display:none;' src='yukleme.gif' /></span></span></div>   <div class='col-md-4'>      <div id='" + ok["kullid"].ToString() + "' data-id='" + ok["UzmanRol"].ToString() + "' data-info='" + ok["Uzmanadi"].ToString() + "' data-value='yonet" + ok["kullid"].ToString() + "' class='uzmanadi'>" + ok["Uzmanadi"].ToString() + "</div></div> <div class='tcno col-md-2'>" + ok["UzmanRol"].ToString() + " </div> <div class='col-md-1'>" + ok["UzmanTCNO"].ToString() + "</div> <div class='yetki col-md-2 text-center'><span id='" + ok["kullid"].ToString() + "' data-id='" + ok["UzmanRol"].ToString() + "' data-info='" + ok["Uzmanadi"].ToString() + "' data-value='yonet" + ok["kullid"].ToString() + "' class='uzmanadi'><i style='color: #428bca' class='fa fa-search'></i></span> <span id='" + ok["kullid"].ToString() + "' data-id='" + ok["UzmanRol"].ToString() + "' data-info='" + ok["Uzmanadi"].ToString() + "' data-value='yonet" + ok["kullid"].ToString() + "' class='bilgiduzenle'><i style='color: #428bca' class='fa fa-pencil-square-o'></i></div><div class='col-md-1'><span>Pasif</span> </div> </div>";


            }

            else
            {


                yetkisiz += "<div id='yonet" + ok["kullid"].ToString() + "' class='uzman col-md-12 '><div class='col-md-1'><span> <span   id ='DC" + ilkid + "' class='switch'><label><input data-info='aktif' type='checkbox' checked='checked'  id='C" + ilkid + "'><span class='lever'></label></span>    <img   id ='RC" + ilkid + "'  style='display:none;'  src='yukleme.gif' /></span></div>   <div class='col-md-4'>     <div id='" + ok["kullid"].ToString() + "' data-id='" + ok["RolAdi"].ToString() + "' data-info='" + ok["uzmanadi"].ToString() + "' data-value='yonet" + ok["kullid"].ToString() + "' class='uzmanadi'>" + ok["uzmanadi"].ToString() + "</div></div> <div class='tcno col-md-2'>" + ok["RolAdi"].ToString() + " </div> <div class='col-md-1'>" + ok["uzmantcno"].ToString() + "</div> <div class='yetki col-md-2 text-center'><span id='" + ok["kullid"].ToString() + "' data-id='" + ok["RolAdi"].ToString() + "' data-info='" + ok["uzmanadi"].ToString() + "' data-value='yonet" + ok["kullid"].ToString() + "' class='uzmanadi'><i style='color: #428bca' class='fa fa-search'></i></span><span id='" + ok["kullid"].ToString() + "' data-id='" + ok["RolAdi"].ToString() + "' data-info='" + ok["uzmanadi"].ToString() + "' data-value='yonet" + ok["kullid"].ToString() + "' class='bilgiduzenle'><i style='color: #428bca' class='fa fa-pencil-square-o'></i></div><div class='col-md-2 text-center>'<span class='adet'> </span><span>Aktif</span> </div> </div>";
            }



        }

        sonuc += yetkisiz;
         


         context.Response.Write(sonuc);
    }

    public bool IsReusable {
        get {
            return false;
        }
    }

}