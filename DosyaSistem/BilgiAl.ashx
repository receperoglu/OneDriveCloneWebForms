<%@ WebHandler Language="C#" Class="Tarih" %>

using System;
using System.Web;
using System.IO;






public class Tarih : IHttpHandler
{

    public void ProcessRequest(HttpContext context)
    {

        context.Response.ContentType = "text/plain";
        context.Response.Expires = -1;
        string klasor = context.Request["klasor"];
        string tamamla = "";
        string tamurl = "";
        string boyut = "";
        string path = "";
        try
        {
            try
            {


                tamurl = "~/" +klasor;
                path = tamurl;
                int dosyaadet = 0;

                DirectoryInfo info = new DirectoryInfo(context.Server.MapPath(path));
                long size = 0;
                foreach (string file in Directory.GetFiles(context.Server.MapPath(path), "*.*", SearchOption.AllDirectories))
                {
                    size += new FileInfo(file).Length;
                    dosyaadet++;
                }

                string[] suffixes = { "B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB" };
                int s = 0;


                while (size >= 1024)
                {
                    s++;
                    size /= 1024;
                }

                int klasoradet=0;
                DirectoryInfo info2 = new DirectoryInfo(context.Server.MapPath(path));
                foreach (string directory in Directory.GetDirectories(context.Server.MapPath(path), "*.*", SearchOption.AllDirectories))
                {
                    klasoradet++;
                }

                string klasorozet = "";
                string dosyaozet = "";

                if (klasoradet > 0)
                {

                    klasorozet=    klasoradet + " Adet Klasör ";

                }
                else
                {

                    klasorozet = "";
                }

                if (dosyaadet>0)
                {

                    dosyaozet = dosyaadet + " Adet Dosya " + String.Format("{0} {1}", size, suffixes[s]);

                }
                else
                {

                    dosyaozet = "";

                }

                tamamla = klasorozet +dosyaozet ;





            }
            catch (Exception ex)
            {
                context.Response.Write(ex.ToString() +tamurl);
            }
            finally
            {

                context.Response.Write(tamamla);
                context.Response.StatusCode = 200;
            }
        }
        catch
        {
            context.Response.Write("Hata Oldu Kapat Hemen");
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