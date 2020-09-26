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
        string konusmaid = context.Request["konusma"];
        string icerik = context.Request["mesaj"];

        try
        {


            try
            {




                personel =  context.Request.Cookies["bilgi"].Value ;

                SqlCommand konusmaekle = new SqlCommand("Insert Into ChatSub(chatmain,icerik,pers) Values('"+konusmaid+"','"+icerik+"','"+personel+"')", baglanti.baglanti());
                
                konusmaekle.ExecuteNonQuery(); 









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