using ChinaBM.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Security;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Tools
{
    public partial class phonetest : System.Web.UI.Page
    {
        private string host = "https://api.kaxin.com";
        protected void Page_Load(object sender, EventArgs e)
        {
            ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;
            ServicePointManager.ServerCertificateValidationCallback = new RemoteCertificateValidationCallback((object ts, X509Certificate certificate, X509Chain chain, SslPolicyErrors errors) =>
            {
                return true;
            });
            var str = "";
            var key = EncryptKit.ToLowerMd5("api_key_id=ox6i909cal&api_key_secret=f62eb16b68e705412ec6096770f61c86&password=123456&username=17352806618");
            using (var client = new WebClient())
            {
                var dic = new Dictionary<string, string>();
                dic.Add("username", "17352806618");
                dic.Add("password", "123456");
                dic.Add("sign", key);
                var json = dic.ToJson();
                client.Headers.Add("content-type", "application/json");
                client.Encoding = Encoding.UTF8;
                str = client.UploadString(host + "/oauth/token", "POST", json);
            }

            Response.Write(str);
        }
    }
}