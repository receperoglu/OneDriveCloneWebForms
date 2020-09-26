<%@ WebHandler Language="C#" Class="Z_Arac_Dondu" %>
using System;
using System.Web;
using System.Data.SqlClient;
public class Z_Arac_Dondu : IHttpHandler
{
    string yazi = "";
    fonk baglanti = new fonk();
    public void ProcessRequest(HttpContext context)
    {

        context.Response.ContentType = "text/plain";
        context.Response.Expires = -1;
        try
        {
            HttpPostedFile postedFile = context.Request.Files["Filedata"];
            string cid = context.Request["datdottr"];
            string durum = context.Request["start"];

            try
            {
                SqlCommand guncelle = new SqlCommand("UPDATE Users SET durum=@durum where id=@id", baglanti.baglanti());
                guncelle.Parameters.AddWithValue("@id", Convert.ToInt32(cid));
                guncelle.Parameters.AddWithValue("@durum", Convert.ToInt32(durum)); 
                guncelle.ExecuteNonQuery();
                baglanti.son();
            }
            catch (Exception ex)
            {
                context.Response.Write(ex.ToString());
            }
            finally
            {

                context.Response.Write(yazi);
                context.Response.StatusCode = 200;
            }
        }
        catch (Exception ex)
        {
            context.Response.Write(ex.ToString());
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

