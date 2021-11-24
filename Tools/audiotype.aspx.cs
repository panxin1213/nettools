using System;
using System.Collections.Generic;
using System.Linq;
using System.Speech.Synthesis;
using System.Threading;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Tools
{
    public partial class audiotype : System.Web.UI.Page
    {
        string str = "";
        protected void Page_Load(object sender, EventArgs e)
        {
            new Thread(() =>
            {
                using (SpeechSynthesizer voice = new SpeechSynthesizer())   //建立语音实例
                {
                    var o = voice.GetInstalledVoices();
                    str = o.Select(a => a.VoiceInfo.Name).ToJson();
                }
            }).Start();

            var count = 0;
            while (String.IsNullOrWhiteSpace(str))
            {
                Thread.Sleep(100);
                if (count == 10)
                {
                    break;
                }

                count++;
            }

            Response.Write(str);

        }
    }
}