        public byte[] GetZipBytesFor(IEnumerable<HttpPostedFileBase> documents)
        {
            using (var memoryStream = new MemoryStream())
            {
                using (var archive = new ZipArchive(memoryStream, ZipArchiveMode.Create, true))
                {
                    foreach (var file in documents)
                    {
                        ZipArchiveEntry entry = archive.CreateEntry(file.FileName, CompressionLevel.Fastest);
                        using (var entryStream = entry.Open())
                        {
                            file.InputStream.CopyTo(entryStream);
                        }
                    }
                }
                return memoryStream.ToArray();
            }
        }
