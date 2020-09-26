<%@ WebHandler Language="C#" Class="Upload" %>

using System;
using System.Web;
using System.IO;

using System.Data.SqlClient;



public class Upload : IHttpHandler
{

    string uzanti = "";
    string uzantikirp = "";
    string dosya = "";
    public void ProcessRequest(HttpContext context)
    {

        try
        {




            string id = context.Request["veri"];


            if (context.Request.Files.Count > 0)
            {
                HttpFileCollection files = context.Request.Files;
                foreach (string key in files)
                {
                    HttpPostedFile file = files[key];
                    string fileName = file.FileName;
                    uzanti = file.ContentType.ToString();
                    uzantikirp = uzanti.Substring(0, 4).ToString();

                    if (uzantikirp == "imag") //uzantısı resim ise buraya thumb eklemesi için gerekli kod yazılacak
                    {

                        string i1, i2, i3, i4, i5, i6, i7, i8,dosyaadi;
                        string isims = fileName;
                        i1= isims.Replace(" ", "");
                        i2= i1.Replace("_", "");
                        i3= i2.Replace(")", "");
                        i4=  i3.Replace("/", "");
                        i5= i4.Replace("?", "");
                        i6=  i5.Replace("!", "");
                        i7=  i6.Replace(",", "");
                        i8= i7.Replace("(", "");
                        dosyaadi = i8.Replace(")", "");


                        dosya = context.Server.MapPath("~/" + id + "/" + dosyaadi);

                        file.SaveAs(dosya);
                        File.SetCreationTime(dosya, DateTime.Now);
                         

                        System.Drawing.Image img = System.Drawing.Image.FromFile(dosya);
                        System.Drawing.Image thumb = img.GetThumbnailImage(156, 200, null, IntPtr.Zero);
                        img.Dispose();
                        thumb.Save(context.Server.MapPath("~/thumbs/") + dosyaadi);

                    }
                    else
                    {

                        fileName = context.Server.MapPath("~/" + id + "/" + fileName);
                        file.SaveAs(fileName);

                    }



                }
            }
            else
            {



            }
        }

        catch
        {



        }
        finally
        {

            context.Response.Write(uzantikirp);
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