using System;
using System.Collections.Generic;
using System.Web;
using System.Data;
using System.Data.SqlClient;
using System.Web.Configuration;
using System.Globalization;
using System.Net;
using System.Security;
using System.Net.Mail;


public class fonk
{
    public fonk()
    {

    }

    public SqlConnection baglanti()
    {



        //  SqlConnection Sqlbaglantisi = new SqlConnection("Data Source=localhost;Initial Catalog=SadeceOSGB;User ID=sadecekullanici;Password=Kod65**;Connect Timeout=15;Encrypt=False;Packet Size=4096");
        SqlConnection Sqlbaglantisi = new SqlConnection("Data Source=.;Initial Catalog=SadeceOSGB;Integrated Security=True;pooling=false;");


        Sqlbaglantisi.Open();
        if (Sqlbaglantisi.State == ConnectionState.Closed)
        {
            Sqlbaglantisi.Open();
        }

        return (Sqlbaglantisi);
    }

    public void DosyaSil(string dosyaadi)
    {
        string dizinli = "~/Admin/" + dosyaadi;
        if (System.IO.File.Exists(HttpContext.Current.Server.MapPath(dizinli)))
        {
            System.IO.File.Delete(HttpContext.Current.Server.MapPath(dizinli));

        }

    }

    public Array mailayar(Array arr)
    {
        string[] array = new string[5];
        array[0] = "C#";
        array[1] = ".Net";
        array[2] = "Asp.Net";
        array[3] = "Linq";
        array[4] = "SQL";
        arr = array;
        return arr;
    }



    public string[] StandartMail = new string[]
         {
            "Sayda'dan Mail Geldi",
            "587",
        "is@sayda.com.tr",
       "mail.sayda.com.tr",
        "Kod65**",
        "Sayda'dan Mail Geldi"
          };







    public void mailgonder(string name, string mailadres, string konu, string mesaj)
    { //İletişim Modülü

        string adres = "is@sayda.com.tr";
        string sifre = "Kod65**";
        SmtpClient sc = new SmtpClient();
        sc.Port = 587;
        sc.Host = "mail.sayda.com.tr";
        sc.EnableSsl = true;
        sc.Timeout = 50000;

        sc.Credentials = new NetworkCredential(adres, sifre);
        MailMessage mail = new MailMessage();
        mail.From = new MailAddress(adres, "Sayda Siteden Mail Geldi");
        mail.To.Add(adres);
        mail.Subject = "Sayda Siteden Mail Geldi";
        mail.IsBodyHtml = true;
        mail.Body = "Ad Soyad : " + name + "<br><br>Mail Adresi : " + mailadres + "<br><br> Konu : " + konu + "<br><br> Mesaj : " + mesaj;
        mail.Priority = MailPriority.High;
        sc.Send(mail);

    }




    public void son()
    {

        baglanti().Close();
        baglanti().Dispose();
        SqlConnection.ClearPool(baglanti());

    }






    public DataTable TabloGetir(string sql)
    {
        SqlConnection baglan = baglanti();
        SqlDataAdapter adapter = new SqlDataAdapter(sql, baglan);
        DataTable dt = new DataTable();
        try
        {
            adapter.Fill(dt);
        }
        catch (SqlException ex)
        {

            throw new Exception(ex.Message);
        }
        adapter.Dispose();
        baglan.Close();
        baglan.Dispose();
        SqlConnection.ClearPool(baglanti());

        return dt;

    }

    public DataRow SatirGetir(string sql)
    {
        DataTable tablo = TabloGetir(sql);
        if (tablo.Rows.Count == 0) return null;
        return tablo.Rows[0];
    }
    //public int KacinciHafta(DateTime tarih)
    //{
    //    CultureInfo ciCurr = CultureInfo.CurrentCulture;
    //    int haftabul = ciCurr.Calendar.GetWeekOfYear(tarih, CalendarWeekRule.FirstFourDayWeek, DayOfWeek.Friday);
    //    return haftabul;

    //}
    //public void DurumGetir()
    //{
    //    SqlCommand BilgiGetir = new SqlCommand("SELECT * FROM Araclar", baglanti());

    //    try
    //    {

    //        BilgiGetir.ExecuteNonQuery();
    //        SqlConnection.ClearPool(baglanti());
    //    }
    //    catch
    //    {

    //    }


    //}
    //public void KasaKaydet(string tur, string tutar, string aciklama, string kategori)
    //{

    //    SqlCommand kasaekle = new SqlCommand("Insert Into Kasa (tur,tutar,tarih,aciklama,kategori) Values (@tur,@tutar,@tarih,@aciklama,@kategori)", baglanti());
    //    kasaekle.Parameters.AddWithValue("@tur", tur);
    //    kasaekle.Parameters.AddWithValue("@tutar", tutar);
    //    kasaekle.Parameters.AddWithValue("@tarih", DateTime.Now);
    //    kasaekle.Parameters.AddWithValue("@aciklama", aciklama);
    //    kasaekle.Parameters.AddWithValue("@kategori", kategori);

    //    try
    //    {
    //        kasaekle.ExecuteNonQuery();
    //        son();
    //    }
    //    catch
    //    {

    //    }


    //}


}