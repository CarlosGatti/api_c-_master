using System;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;

// ReSharper disable ConvertIfStatementToReturnStatement
// ReSharper disable MemberCanBePrivate.Global
// ReSharper disable InconsistentNaming

namespace Cretovale_api.Helpers
{
    public static class FileHelper
    {
        private enum ImageExtensions
        {
            bmp,
            jpeg,
            gif,
            tiff,
            png,
            unknown
        }

        private static ImageExtensions GetImageFormat(byte[] bytes)
        {
            var bmp = Encoding.ASCII.GetBytes("BM"); // BMP
            var gif = Encoding.ASCII.GetBytes("GIF"); // GIF
            var png = new byte[] {137, 80, 78, 71}; // PNG
            var tiff = new byte[] {73, 73, 42}; // TIFF
            var tiff2 = new byte[] {77, 77, 42}; // TIFF
            var jpeg = new byte[] {255, 216, 255, 224}; // jpeg
            var jpeg2 = new byte[] {255, 216, 255, 225}; // jpeg canon

            if (bmp.SequenceEqual(bytes.Take(bmp.Length)))
                return ImageExtensions.bmp;

            if (gif.SequenceEqual(bytes.Take(gif.Length)))
                return ImageExtensions.gif;

            if (png.SequenceEqual(bytes.Take(png.Length)))
                return ImageExtensions.png;

            if (tiff.SequenceEqual(bytes.Take(tiff.Length)))
                return ImageExtensions.tiff;

            if (tiff2.SequenceEqual(bytes.Take(tiff2.Length)))
                return ImageExtensions.tiff;

            if (jpeg.SequenceEqual(bytes.Take(jpeg.Length)))
                return ImageExtensions.jpeg;

            if (jpeg2.SequenceEqual(bytes.Take(jpeg2.Length)))
                return ImageExtensions.jpeg;

            return ImageExtensions.unknown;
        }

        public static string SaveImg(byte[] fileBytes)
        {
            // ensure is a img from headers
            var imgExtension = GetImageFormat(fileBytes);
            if (imgExtension == ImageExtensions.unknown) return string.Empty;

            var fileName = $@"{DateTime.Now.Ticks}.{imgExtension}";
            var fullPath = Path.Combine("upload".ToApplicationPath(), fileName);

            File.WriteAllBytes(fullPath, fileBytes);

            return fileName;
        }
        
        public static string GetApplicationRoot()
        {
            var exePath =   Path.GetDirectoryName(System.Reflection.Assembly.GetExecutingAssembly().CodeBase);
            var appPathMatcher=new Regex(@"(?<!fil)[A-Za-z]:\\+[\S\s]*?(?=\\+bin)");
            var appRoot = appPathMatcher.Match(exePath).Value;
            return appRoot;
        }
        
        public static string ToApplicationPath(this string fileName)
        {
            return Path.Combine(GetApplicationRoot(), fileName);
        }
    }
}
