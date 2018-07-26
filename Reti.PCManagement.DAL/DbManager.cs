using System.Configuration;
using System.Data.SqlClient;
using System;


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

            }
            catch (Exception ex)
            {
                //TODO
                //logdb
                throw ex;
            }
            dbConnectionString = ConfigurationManager.ConnectionStrings[CONNECTION_STRING_CONFIG_NAME].ConnectionString;
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


        //TODO - 
        //http://blog.gauffin.org/2013/01/ado-net-the-right-way/
        //Creare un repository generico e poi uno specifico per per ogni classe. Segui il link sopra.
    }
}
