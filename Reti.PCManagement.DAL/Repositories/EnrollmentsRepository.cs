using Reti.PCManagement.Common;
using Reti.PCManagement.DAL.DBContracts;
using Reti.PCManagement.DAL.Models;
using Reti.PCManagement.Logger;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Reti.PCManagement.DAL.Repositories
{
    class EnrollmentsRepository : Repository<Enrollment>
    {
        protected override Enrollment Map(IDataRecord record)
        {

            var Id = (int)record[EnrollmentsContract.ID];
            var ResourceId = (int)record[EnrollmentsContract.RESOURCE_ID];
            var CourseId = (int)record[EnrollmentsContract.COURSE_ID];
            var Notes = record[EnrollmentsContract.NOTES] == DBNull.Value ? null : (string)record[EnrollmentsContract.NOTES];
            var ProjectLeaderID = (int)record[EnrollmentsContract.PROJECT_LEADER_ID];
            var StartDate = record[EnrollmentsContract.START_DATE] == DBNull.Value ? null : (DateTime?)record[EnrollmentsContract.START_DATE];
            var MaxEndDate = record[EnrollmentsContract.MAX_END_DATE] == DBNull.Value ? null : (DateTime?)record[EnrollmentsContract.MAX_END_DATE];
            var IsAdmitted = (bool)record[EnrollmentsContract.IS_ADMITTED];

            return new Enrollment(Id, ResourceId, ProjectLeaderID, CourseId, StartDate, MaxEndDate, IsAdmitted, Notes);

        }


        public void Create(Enrollment enroll, UnitOfWork uow)
        {
            try
            {
                using (var command = uow.CreateCommand())
                {

                    command.CommandText = $"INSERT INTO {EnrollmentsContract.TABLE_NAME} (" +
                        $"[{EnrollmentsContract.RESOURCE_ID}], [{EnrollmentsContract.PROJECT_LEADER_ID}], " +
                        $"[{EnrollmentsContract.COURSE_ID}], [{EnrollmentsContract.START_DATE}], [{EnrollmentsContract.IS_ADMITTED}], [{EnrollmentsContract.NOTES}])" +
                       "VALUES(@RES_ID,  @PROJLD_ID, @COURSE_ID, @START_DATE, @IS_ADMIT, @NOTES)";

                    command.AddParameter("RES_ID", enroll.ResourceId);
                    command.AddParameter("COURSE_ID", enroll.CourseId);
                    command.AddParameter("NOTES", enroll.Notes ?? (object)DBNull.Value);
                    command.AddParameter("PROJLD_ID", enroll.ProjectLeaderId);
                    command.AddParameter("START_DATE", enroll.StartDate ?? (object)DBNull.Value);
                    command.AddParameter("IS_ADMIT", enroll.IsAdmitted);

                    command.ExecuteNonQuery();
                }
            }
            catch (Exception ex)
            {
                DbLog.LogError($"Error inserting the new Enrollment: {enroll.ToString()}", ex);
                throw ex;
            }
        }

        public void Update(Enrollment enroll, UnitOfWork uow)
        {
            try
            {
                using (var command = uow.CreateCommand())
                {


                    command.CommandText = $"UPDATE {EnrollmentsContract.TABLE_NAME}" +
                                        $"SET [{EnrollmentsContract.COURSE_ID}] = @COURSE_ID, [{EnrollmentsContract.RESOURCE_ID}] = @RES_ID," +
                                            $"[{EnrollmentsContract.NOTES}] = @NOTES, [{EnrollmentsContract.START_DATE}] = @START_DATE," +
                                            $"[{EnrollmentsContract.IS_ADMITTED}] = @IS_ADMIT, [{EnrollmentsContract.PROJECT_LEADER_ID}] = @PROJLD_ID" +
                                        $"WHERE [{EnrollmentsContract.ID}] = @ID";

                    command.AddParameter("RES_ID", enroll.ResourceId);
                    command.AddParameter("COURSE_ID", enroll.CourseId);
                    command.AddParameter("NOTES", enroll.Notes ?? (object)DBNull.Value);
                    command.AddParameter("PROJLD_ID", enroll.ProjectLeaderId);
                    command.AddParameter("START_DATE", enroll.StartDate ?? (object)DBNull.Value);
                    command.AddParameter("IS_ADMIT", enroll.IsAdmitted);
                    command.ExecuteNonQuery();
                }
            }
            catch (Exception ex)
            {
                DbLog.LogError($"Error updating Enrollment: {enroll.ToString()}", ex);
                throw ex;
            }
        }

        public void Delete(int id, UnitOfWork uow)
        {
            try
            {
                using (var command = uow.CreateCommand())
                {


                    command.CommandText = $"DELETE FROM {EnrollmentsContract.TABLE_NAME}" +
                                            $"WHERE [{EnrollmentsContract.ID}] = @ID";
                    command.AddParameter("ID", id);
                    command.ExecuteNonQuery();
                }
            }
            catch (Exception ex)
            {
                DbLog.LogError($"Error deleting Enrollment of id {id}", ex);
                throw ex;
            }
        }

        public List<Enrollment> GetAllEnrollments(UnitOfWork uow)
        {
            try
            {
                using (var command = uow.CreateCommand())
                {
                    command.CommandText = $"SELECT * FROM {EnrollmentsContract.TABLE_NAME}";
                    return ToList(command);
                }
            }
            catch (Exception ex)
            {
                DbLog.LogError($"Error retrieving all Enrollments", ex);
                throw ex;
            }
        }

        /// <summary>
        /// Return null if not found
        /// </summary>
        /// <param name="id"></param>
        /// <param name="uow"></param>
        /// <returns></returns>
        public Enrollment GetEnrollmentByID(int id, UnitOfWork uow)
        {
            try
            {
                using (var command = uow.CreateCommand())
                {
                    command.CommandText = $"SELECT * FROM {EnrollmentsContract.TABLE_NAME} WHERE [{EnrollmentsContract.ID}] = @ID";
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
                DbLog.LogError($"Error retriving Enrollment by id {id}", ex);
                throw ex;
            }
        }
    }
}
