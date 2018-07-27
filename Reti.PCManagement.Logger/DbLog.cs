using Reti.PCManagement.Common;
using Reti.PCManagement.DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Reti.PCManagement.Logger
{
    public class DbLog
    {

        private static void WriteLogOnDB(Enums.Severity severity, string msg, Exception exception = null)
        {
            try
            {
                using (var connection = DBManager.Instance().GetSqlConnection())
                {
                    connection.Open();
                    var cmd = connection.CreateCommand();
                    cmd.CommandText = $"INSERT INTO [dbo].[Logs]([SEVERITY],[MESSAGE],[EXCEPTION])" +
                                      $"VALUES (@SEVERITY,@MSG,@EX)";
                    cmd.AddParameter("SEVERITY", severity.ToString());
                    cmd.AddParameter("MSG", msg);
                    cmd.AddParameter("EX", exception?.ToString() ?? (object)DBNull.Value);
                    cmd.ExecuteNonQuery();
                    connection.Close();
                }
            }
            catch (Exception ex)
            {
                FileLog.LogError("Error in writing dbLog", ex);
            }

        }

        public static void LogError(string message)
        {
            try
            {
                WriteLogOnDB(Enums.Severity.Error, message);
            }
            catch (Exception ex)
            {
                FileLog.LogError(ex);
            }
        }

        public static void LogError(Exception exception)
        {
            try
            {
                WriteLogOnDB(Enums.Severity.Error, exception.Message, exception);
            }
            catch (Exception ex)
            {
                FileLog.LogError(ex);
            }
        }

        public static void LogError(string message, Exception exception)
        {
            try
            {
                WriteLogOnDB(Enums.Severity.Error, message, exception);
            }
            catch (Exception ex)
            {
                FileLog.LogError(ex);
            }
        }

        public static void LogWarning(string message)
        {
            try
            {
                WriteLogOnDB(Enums.Severity.Warning, message);
            }
            catch (Exception ex)
            {
                FileLog.LogError(ex);
            }
        }

        public static void LogVerbose(string message)
        {
            try
            {
                WriteLogOnDB(Enums.Severity.Verbose, message);
            }
            catch (Exception ex)
            {
                FileLog.LogError(ex);
            }
        }

        public static void LogDebug(string message)
        {
            try
            {
                WriteLogOnDB(Enums.Severity.Debug, message);
            }
            catch (Exception ex)
            {
                FileLog.LogError(ex);
            }
        }
    }
}
