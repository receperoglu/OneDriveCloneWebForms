<%@ WebHandler Language="C#" Class="Tarih" %>

using System;
using System.Web;
using System.IO;
using Newtonsoft.Json;






public class Tarih : IHttpHandler
{

    public void ProcessRequest(HttpContext context)
    {

        context.Response.ContentType = "text/plain";
        context.Response.Expires = -1;
        string Folder = context.Request["Folder"];
        int FolderCount = 0;

        try
        {
            try
            {

                string CurrentFolder = Folder;

                string klasoryolu = context.Request.PhysicalApplicationPath + CurrentFolder;
                string Result = "";
                DirectoryInfo oDirInfo = new DirectoryInfo(klasoryolu);

                if (oDirInfo.Exists)
                {
                    FileInfo[] Files = oDirInfo.GetFiles();
                    FileList NewFiles = new FileList();

                    foreach (object FileName in Files)
                    {


                        string uzanti = FileName.ToString().Substring(FileName.ToString().Length - 3);



                        if (uzanti == "png" || uzanti == "PNG" || uzanti == "jpg" || uzanti == "gif" || uzanti == "peg" || uzanti == "JPG" || uzanti == "PEG")
                        {
                        }
                        else
                        {


                            string tamurl = "~/" + CurrentFolder + "/" + FileName.ToString();



                            FileInfo bilgi = new FileInfo(context.Server.MapPath(tamurl));

                            string[] suffixes = { "B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB" };
                            int s = 0;
                            long size = bilgi.Length;

                            while (size >= 1024)
                            {
                                s++;
                                size /= 1024;
                            }


                            FolderCount++;
                            NewFiles.CreatedDate = System.IO.File.GetLastWriteTime(context.Server.MapPath(tamurl)).ToString("dd-MM-yyyy");
                            NewFiles.CreatedTime = System.IO.File.GetLastWriteTime(context.Server.MapPath(tamurl)).ToString("HH:mm");
                            NewFiles.FileSize = String.Format("{0} {1}", size, suffixes[s]);
                            NewFiles.Id = FolderCount;
                            NewFiles.Ext = uzanti;
                            NewFiles.Name = FileName.ToString();
                            NewFiles.FolderCount = FolderCount.ToString();
                            Result += JsonConvert.SerializeObject(NewFiles) + ",";

                        }



                    }
                }



                if (Result != "")
                {


                    Result = Result.TrimEnd(',');
                }

                context.Response.Write("[" + Result + "]");


            }
            catch (Exception ex)
            {
                context.Response.Write(ex.ToString());
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

    public class FileList
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string FolderCount { get; set; }
        public string Ext { get; set; }
        public string CreatedDate { get; set; }
        public string CreatedTime { get; set; }
        public string FileSize { get; set; }

    }

}