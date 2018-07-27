using System.Configuration;
using System.Data.SqlClient;
using System;
using Reti.PCManagement.Logger;

namespace Reti.PCManagement.DAL
{
    public class DBManager
    {
        private static DBManager dbm;
        private readonly string CONNECTION_STRING_CONFIG_NAME = "PercorsoCircolareDB";
        private string dbConnectionString;



        private DBManager()
        {
            //retrieve connection string from App.config
            try
            {
                 dbConnectionString = ConfigurationManager.ConnectionStrings[CONNECTION_STRING_CONFIG_NAME].ConnectionString;
            }
            catch (Exception ex)
            {
                FileLog.LogError(ex);
                throw ex;
            }
        }

        public static DBManager Instance()
        {
            if (dbm != null)
            {
                return dbm;
            }
            else
            {
                dbm = new DBManager();
                return dbm;
            }
        }


        public SqlConnection GetSqlConnection()
        {
            SqlConnection conn = new SqlConnection();
            conn.ConnectionString = dbConnectionString;
            return conn;
        }



    }
}
