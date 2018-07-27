using Reti.PCManagement.Common;
using Reti.PCManagement.DAL.DBContracts;
using Reti.PCManagement.DAL.Models;
using Reti.PCManagement.Logger;
using System;
using System.Collections.Generic;
using System.Data;

namespace Reti.PCManagement.DAL.Repositories
{
    public class TeachersRepository : Repository<Teacher>
    {
        protected override Teacher Map(IDataRecord record)
        {

            var Id = (int)record[TeachersContract.ID];
            var ResourceId = (int)record[TeachersContract.RESOURCE_ID];
            var CourseId = (int)record[TeachersContract.COURSE_ID];
            var Notes = record[TeachersContract.NOTES] == DBNull.Value ? null : (string)record[TeachersContract.NOTES];

            return new Teacher(Id, ResourceId, CourseId, Notes);
        }


        public void Create(Teacher teacher, UnitOfWork uow)
        {
            try
            {
                using (var command = uow.CreateCommand())
                {

                    command.CommandText = $"INSERT INTO {TeachersContract.TABLE_NAME} ([{TeachersContract.RESOURCE_ID}], [{TeachersContract.COURSE_ID}], [{TeachersContract.NOTES}])" +
                                      "VALUES(@RES_ID, @COURSE_ID, @NOTES)";
                    command.AddParameter("RES_ID", teacher.ResourceId);
                    command.AddParameter("COURSE_ID", teacher.CourseId);
                    command.AddParameter("NOTES", teacher.Notes ?? (object)DBNull.Value);

                    command.ExecuteNonQuery();
                }
            }
            catch (Exception ex)
            {
                DbLog.LogError($"Error inserting the new teacher: {teacher.ToString()}", ex);
                throw ex;
            }
        }

        public void Update(Teacher teacher, UnitOfWork uow)
        {
            try
            {
                using (var command = uow.CreateCommand())
                {


                    command.CommandText = $"UPDATE {TeachersContract.TABLE_NAME}" +
                                        $"SET [{TeachersContract.COURSE_ID}] = @COURSE_ID, [{TeachersContract.RESOURCE_ID}] = @RES_ID," +
                                            $"[{TeachersContract.NOTES}] = @NOTES" +
                                        $"WHERE [{TeachersContract.ID}] = @ID";
                    command.AddParameter("RES_ID", teacher.ResourceId);
                    command.AddParameter("COURSE_ID", teacher.CourseId);
                    command.AddParameter("NOTES", teacher.Notes ?? (object)DBNull.Value);
                    command.ExecuteNonQuery();
                }
            }
            catch (Exception ex)
            {
                DbLog.LogError($"Error updating teacher: {teacher.ToString()}", ex);
                throw ex;
            }
        }

        public void Delete(int id, UnitOfWork uow)
        {
            try
            {
                using (var command = uow.CreateCommand())
                {


                    command.CommandText = $"DELETE FROM {TeachersContract.TABLE_NAME}" +
                                            $"WHERE [{TeachersContract.ID}] = @ID";
                    command.AddParameter("ID", id);
                    command.ExecuteNonQuery();
                }
            }
            catch (Exception ex)
            {
                DbLog.LogError($"Error deleting teacher of id {id}", ex);
                throw ex;
            }
        }

        public List<Teacher> GetAllTeachers(UnitOfWork uow)
        {
            try
            {
                using (var command = uow.CreateCommand())
                {
                    command.CommandText = $"SELECT * FROM {TeachersContract.TABLE_NAME}";
                    return ToList(command);
                }
            }
            catch (Exception ex)
            {
                DbLog.LogError($"Error retrieving all teachers", ex);
                throw ex;
            }
        }

        /// <summary>
        /// Return null if not found
        /// </summary>
        /// <param name="id"></param>
        /// <param name="uow"></param>
        /// <returns></returns>
        public Teacher GetTeacherByID(int id, UnitOfWork uow)
        {
            try
            {
                using (var command = uow.CreateCommand())
                {
                    command.CommandText = $"SELECT * FROM {TeachersContract.TABLE_NAME} WHERE [{TeachersContract.ID}] = @ID";
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
                DbLog.LogError($"Error retriveing teacher by id {id}", ex);
                throw ex;
            }
        }
    }
}
