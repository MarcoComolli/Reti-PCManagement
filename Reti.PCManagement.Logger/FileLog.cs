using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO;
using System.Configuration;
using Reti.PCManagement.Common;

namespace Reti.PCManagement.Logger
{
    public class FileLog
    {
        public static readonly string LOG_FILE_PATH;
        public static readonly string LOG_FILE_NAME;



        //static constructor
        static FileLog()
        {
            try
            {
                LOG_FILE_PATH = ConfigurationManager.AppSettings["FilePath"];
                LOG_FILE_NAME = ConfigurationManager.AppSettings["FileName"];
                Directory.CreateDirectory(LOG_FILE_PATH); //create path if doesn't exist
                bool append = bool.Parse(ConfigurationManager.AppSettings["LogAppend"]);
                if(!append)
                {
                    File.Delete(LOG_FILE_PATH + LOG_FILE_NAME);
                }
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
                using (StreamWriter sw = File.AppendText(LOG_FILE_PATH + LOG_FILE_NAME))
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
        private static string WrapWithHelpfulData(Enums.Severity severity, string msg)
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
            WriteLine(WrapWithHelpfulData(Enums.Severity.Error, message));
        }

        public static void LogError(string message, Exception ex)
        {
            WriteLine(WrapWithHelpfulData(Enums.Severity.Error, $"{message} - {ex.ToString()}"));
        }

        public static void LogError(Exception ex)
        {
            WriteLine(WrapWithHelpfulData(Enums.Severity.Error, ex.ToString()));
        }

        public static void LogWarning(string message)
        {
            WriteLine(WrapWithHelpfulData(Enums.Severity.Warning, message));
        }

        public static void LogVerbose(string message)
        {
            WriteLine(WrapWithHelpfulData(Enums.Severity.Verbose, message));
        }

        public static void LogDebug(string message)
        {
            WriteLine(WrapWithHelpfulData(Enums.Severity.Debug, message));
        }
    }
}
