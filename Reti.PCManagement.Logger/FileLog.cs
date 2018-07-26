using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO;
using System.Configuration;

namespace Reti.PCManagement.Logger
{
    public class FileLog
    {
        public static readonly string LOG_FILE_PATH;
        public static readonly string LOG_FILE_PATH_NAME;

        public enum Severity
        {
            Debug,
            Assert,
            Warning,
            Error
        }

        //static constructor
        static FileLog()
        {
            try
            {
                LOG_FILE_PATH = ConfigurationManager.AppSettings["FilePath"];
                LOG_FILE_PATH_NAME = ConfigurationManager.AppSettings["FilePathName"];
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        private static void WriteLine(string line)
        {
            try
            {
                    using (StreamWriter sw = File.AppendText(LOG_FILE_PATH_NAME))
                    {
                        sw.Write(line + "\r\n");
                    }      
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        //add useful data to the log
        private static string WrapWithHelpfulData(Severity severity, string msg)
        {
            StringBuilder sb = new StringBuilder();
            sb.Append(DateTime.Now)
            .Append(" - ")
            .Append("[").Append(severity.ToString()).Append("]")
            .Append(" - ")
            .Append(msg);
            return sb.ToString();
        }

        public static void LogError(string message)
        {
            WriteLine(WrapWithHelpfulData(Severity.Error, message));
        }

        public static void LogError(Exception ex)
        {
            string message = $"{ex.Message} | {ex.StackTrace}";
            WriteLine(WrapWithHelpfulData(Severity.Error, message));
        }

        public static void LogWarning(string message)
        {
            WriteLine(WrapWithHelpfulData(Severity.Warning, message));
        }

        public static void LogAssert(string message)
        {
            WriteLine(WrapWithHelpfulData(Severity.Assert, message));
        }

        public static void LogDebug(string message)
        {
            WriteLine(WrapWithHelpfulData(Severity.Debug, message));
        }
    }
}
