using System.IO;
using System.Net.Http;
using System.Runtime.Serialization.Json;
using System.Text;

namespace YourNameSpace
{
    public class DataContractSerializer
    {
        private string _json = string.Empty;
        private readonly Encoding _encoding;
        private readonly string _mediaType;

        /// <summary>
        /// Default encoding is UTF8, mediaType is application json.
        /// </summary>
        /// <param name="encoding"></param>
        /// <param name="mediaType"></param>
        public DataContractSerializer(Encoding encoding = null, string mediaType = null)
        {
            _encoding = encoding ?? Encoding.UTF8;
            _mediaType = mediaType ?? "application/json";
        }

        public DataContractSerializer Serialize<T>(T obj)
        {
            var JsonSerializer = new DataContractJsonSerializer(typeof(T));

            using (var mStrm = new MemoryStream())
            {
                JsonSerializer.WriteObject(mStrm, obj);
                mStrm.Position = 0;
                using (var sr = new StreamReader(mStrm))
                {
                    _json = sr.ReadToEnd();
                }
            }
            return this;
        }

        public StringContent ToStringContent()
        {
            return new StringContent(_json, _encoding, _mediaType);
        }
    }
}

