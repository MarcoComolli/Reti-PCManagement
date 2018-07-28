using Reti.PCManagement.Common;
using Reti.PCManagement.DAL.DBContracts;
using Reti.PCManagement.DAL.Models;
using Reti.PCManagement.Logger;
using System;
using System.Collections.Generic;
using System.Data;


namespace Reti.PCManagement.DAL.Repositories
{
    public class ResourcesRepository : Repository<Resource>
    {
        protected override Resource Map(IDataRecord record)
        {

            var Id = (int)record[ResourcesContract.ID];
            var Username = (string)record[ResourcesContract.USERNAME];
            var Surname = (string)record[ResourcesContract.SURNAME];
            var Name = (string)record[ResourcesContract.NAME];
            var Status = (string)record[ResourcesContract.STATUS];

            return new Resource(Id, Username, Name, Surname, Status);

    }


        public void Create(Resource resource, UnitOfWork uow)
        {
            try
            {
                using (var command = uow.CreateCommand())
                {

                    command.CommandText = $"INSERT INTO {ResourcesContract.TABLE_NAME} (" +
                        $"[{ResourcesContract.ID}]," +
                        $"[{ResourcesContract.USERNAME}], [{ResourcesContract.NAME}], " +
                        $"[{ResourcesContract.SURNAME}], [{ResourcesContract.STATUS}])" +
                       "VALUES(@ID, @USERNAME, @NAME, @SURNAME, @STATUS)";

                    command.AddParameter("ID", resource.Id);
                    command.AddParameter("USERNAME", resource.Username);
                    command.AddParameter("NAME", resource.Name);
                    command.AddParameter("SURNAME", resource.Surname);
                    command.AddParameter("STATUS", resource.Status);

                    command.ExecuteNonQuery();
                }
            }
            catch (Exception ex)
            {
                DbLog.LogError($"Error inserting the new Resource: {resource.ToString()}", ex);
                throw ex;
            }
        }

        public void Update(Resource resource, UnitOfWork uow)
        {
            try
            {
                using (var command = uow.CreateCommand())
                {


                    command.CommandText = $"UPDATE {ResourcesContract.TABLE_NAME}" +
                                        $"SET [{ResourcesContract.USERNAME}] = @USERNAME, [{ResourcesContract.SURNAME}] = @SURNAME," +
                                            $"[{ResourcesContract.NAME}] = @NAME, [{ResourcesContract.STATUS}] = @STATUS, [{ResourcesContract.ID}] = @ID" +
                                        $"WHERE [{ResourcesContract.ID}] = @ID";

                    command.AddParameter("ID", resource.Id);
                    command.AddParameter("USERNAME", resource.Username);
                    command.AddParameter("NAME", resource.Name);
                    command.AddParameter("SURNAME", resource.Surname);
                    command.AddParameter("STATUS", resource.Status);
                    command.ExecuteNonQuery();
                }
            }
            catch (Exception ex)
            {
                DbLog.LogError($"Error updating Resource: {resource.ToString()}", ex);
                throw ex;
            }
        }

        public void Delete(int id, UnitOfWork uow)
        {
            try
            {
                using (var command = uow.CreateCommand())
                {


                    command.CommandText = $"DELETE FROM {ResourcesContract.TABLE_NAME}" +
                                            $"WHERE [{ResourcesContract.ID}] = @ID";
                    command.AddParameter("ID", id);
                    command.ExecuteNonQuery();
                }
            }
            catch (Exception ex)
            {
                DbLog.LogError($"Error deleting Resource of id {id}", ex);
                throw ex;
            }
        }

        public List<Resource> GetAllResources(UnitOfWork uow)
        {
            try
            {
                using (var command = uow.CreateCommand())
                {
                    command.CommandText = $"SELECT * FROM {ResourcesContract.TABLE_NAME}";
                    return ToList(command);
                }
            }
            catch (Exception ex)
            {
                DbLog.LogError($"Error retrieving all Resources", ex);
                throw ex;
            }
        }

        /// <summary>
        /// Return null if not found
        /// </summary>
        /// <param name="id"></param>
        /// <param name="uow"></param>
        /// <returns></returns>
        public Resource GetResourceByID(int id, UnitOfWork uow)
        {
            try
            {
                using (var command = uow.CreateCommand())
                {
                    command.CommandText = $"SELECT * FROM {ResourcesContract.TABLE_NAME} WHERE [{ResourcesContract.ID}] = @ID";
                    command.AddParameter("ID", id);
                    using (var reader = command.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            var result = Map(reader);
                            return result;
                        }
                        return null;
                    }
                }
            }
            catch (Exception ex)
            {
                DbLog.LogError($"Error retriving Resource by id {id}", ex);
                throw ex;
            }
        }

        public List<Resource> GetResourceByIDOrUsername(int id, string username, UnitOfWork uow)
        {
            try
            {
                using (var command = uow.CreateCommand())
                {
                    command.CommandText = $"SELECT * FROM {ResourcesContract.TABLE_NAME} " +
                        $"WHERE [{ResourcesContract.ID}] = @ID OR [{ResourcesContract.USERNAME}] = @USERNAME ";
                    command.AddParameter("ID", id);
                    command.AddParameter("USERNAME", username);
                    return ToList(command);
                }
            }
            catch (Exception ex)
            {
                DbLog.LogError($"Error retriving Resource by id {id} or username {username}", ex);
                throw ex;
            }
        }
    }
}
