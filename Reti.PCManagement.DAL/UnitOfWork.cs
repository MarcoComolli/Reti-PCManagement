using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using System.Data.SqlClient;
using System.Data;

namespace Reti.PCManagement.DAL
{
    public class UnitOfWork : IUnitOfWork
    {

        private SqlConnection connection;
        private SqlTransaction transaction;


        public static IUnitOfWork CreateUoW()
        {
            var connection = DBManager.Instance().GetSqlConnection();
            connection.Open();
            return new UnitOfWork(connection);
        }

        public IDbCommand CreateCommand()
        {
            var command = connection.CreateCommand();
            command.Transaction = transaction;
            return command;
        }

        

        private UnitOfWork(SqlConnection connection)
        {
            this.connection = connection;
            transaction = connection.BeginTransaction();
        }


        public void ApplyChanges()
        {
            if(transaction == null)
            {
                throw new InvalidOperationException("Cannot found uow transaction. Could be already used?");
            }
            try
            {
                transaction.Commit();
            }
            catch (Exception commitEx)
            {
                // Attempt to roll back the transaction.
                try
                {
                    transaction.Rollback();
                }
                catch (Exception rbEx)
                {
                    // This catch block will handle any errors that may have occurred on the server that would cause the rollback to fail
                    //TODO LogDB
                    throw rbEx;
                }
                //TODO LogDB
                throw commitEx;
            }
            finally
            {
                transaction = null;
            }
            
        }

        public void Dispose()
        {
            if(transaction != null)
            {
                transaction.Rollback();
                transaction = null;
            }

            if(connection != null)
            {
                connection.Close();
                connection.Dispose();
                connection = null;
            }
        }
    }
}
