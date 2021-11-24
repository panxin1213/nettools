using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Speech.AudioFormat;
using System.Speech.Synthesis;
using System.IO;
using System.Threading;
using ChinaBM.Common;
using Common.Library.Log;

namespace Tools
{
    public partial class audio : System.Web.UI.Page
    {
        byte[] stream = null;

        private Dictionary<string, string> userdic = new Dictionary<string, string>
        {
            {"hui","VW Hui"},
            {"liang","VW Liang"},
            {"lily","VW Lily"},
            {"wang","VW Wang"},
        };
        protected void Page_Load(object sender, EventArgs e)
        {
            var str = HttpKit.GetFormParam("str");
            var key = HttpKit.GetFormParam("key");
            var user = HttpKit.GetUrlParam("user");

            if (String.IsNullOrWhiteSpace(str))
            {
                str = "Hellow Word你好啊";
            }

            //if (EncryptKit.ToLowerMd5(str + "abcd") != key)
            //{
            //    Response.Write("no");
            //    return;
            //}

            var thread = new Thread((o) =>
            {
                try
                {
                    using (SpeechSynthesizer speechEngine = new SpeechSynthesizer())

                    using (var st = new MemoryStream())
                    {
                        var un = userdic.TryGetValue(user, "");
                        var sul = speechEngine.GetInstalledVoices();
                        var suln = sul.Select(a => a.VoiceInfo.Name).ToList();

                        if (!String.IsNullOrWhiteSpace(un) && suln.Contains(un))
                        {
                            speechEngine.SelectVoice(un);
                        }

                        //推荐保存方式 ，编码率11K，默认44文件较大！小于11K 时声音变化不理想！
                        SpeechAudioFormatInfo wavFromat = new SpeechAudioFormatInfo(System.Speech.AudioFormat.EncodingFormat.Pcm, 1024 * 11, 16, 1, 16000, 2, null);

                        speechEngine.SetOutputToWaveStream(st);
                        speechEngine.Speak(o.ToSafeString());
                        if (st.Position > 0)
                        {
                            st.Position = 0;
                            stream = st.ToArray();
                        }
                        // stream.Flush();
                    }
                }
                catch (Exception ex)
                {
                    Logger.Error(ex, ex.Message, ex);
                }
            });

            thread.Start(str);
            var count = 0;
            while (stream == null)
            {
                Thread.Sleep(1000);
                if (count == 100)
                {
                    break;
                }

                count++;
            }

            if (stream != null)
            {
                ShowStream(new MemoryStream(stream));
                return;
            }
        }

        /// <summary>
        /// Response输出流文件
        /// </summary>
        /// <param name="fileStream"></param>
        /// <param name="filename"></param>
        public void ShowStream(Stream fileStream)
        {
            long fileSize = fileStream.Length;
            byte[] fileBuffer = new byte[fileSize];
            fileStream.Read(fileBuffer, 0, (int)fileSize);

            //如果不写fileStream.Close()语句，用户在下载过程中选择取消，将不能再次下载
            fileStream.Close();
            Response.Clear();
            Response.ContentType = "audio/wav";
            Response.BinaryWrite(fileBuffer);
            Response.Flush();
            Response.End();
        }
    }
}