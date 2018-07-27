using System;
using System.Collections.Generic;
using System.Data;
using Reti.PCManagement.Common;
using Reti.PCManagement.DAL.Models;
using Reti.PCManagement.DAL.DBContracts;
using Reti.PCManagement.Logger;


namespace Reti.PCManagement.DAL.Repositories
{
    public class CoursesRepository : Repository<Course>
    {
        protected override Course Map(IDataRecord record)
        {
            var Id = (int)record[CoursesContract.ID];
            var Description = (string)record[CoursesContract.DESCRIPTION];
            var RefYear = (int)record[CoursesContract.REF_YEAR];
            var StartDate = record[CoursesContract.START_DATE] == DBNull.Value ? null : (DateTime?)record[CoursesContract.START_DATE];
            var EndDate = record[CoursesContract.END_DATE] == DBNull.Value ? null : (DateTime?)record[CoursesContract.END_DATE];
            var IsPeriodic = (bool)record[CoursesContract.IS_PERIODIC];
            var CoordinatorId = (int)record[CoursesContract.COORDINATOR_ID];

            return new Course(Id, Description, RefYear, StartDate, EndDate, IsPeriodic, CoordinatorId);
        }

        public void Create(Course course, UnitOfWork uow)
        {
            try
            {
                using (var command = uow.CreateCommand())
                {

                    command.CommandText = @"INSERT INTO [dbo].[Courses] ([DESCRIPTION], [REF_YEAR], [START_DATE],[END_DATE],[IS_PERIODIC],[COORDINATOR_ID]) 
                                      VALUES(@DESCRIPTION, @REF_YEAR, @START_DATE, @END_DATE, @IS_PERIODIC, @COORDINATOR_ID)";
                    command.AddParameter("DESCRIPTION", course.Description ?? (object)DBNull.Value);
                    command.AddParameter("REF_YEAR", course.RefYear);
                    command.AddParameter("START_DATE", course.StartDate ?? (object)DBNull.Value);
                    command.AddParameter("END_DATE", course.EndDate ?? (object)DBNull.Value);
                    command.AddParameter("IS_PERIODIC", course.IsPeriodic);
                    command.AddParameter("COORDINATOR_ID", course.CoordinatorId);
                    command.ExecuteNonQuery();
                }
            }
            catch (Exception ex)
            {
                //DbLog.LogError($"Error inserting the new course: {course.ToString()}", ex);
                throw ex;
            }
        }

        public void Update(Course course, UnitOfWork uow)
        {
            try
            {
                using (var command = uow.CreateCommand())
                {


                    command.CommandText = @"UPDATE [dbo].[Courses] 
                                        SET [DESCRIPTION] = @DESCRIPTION, [REF_YEAR] = @REF_YEAR,
                                            [START_DATE] = @START_DATE, [END_DATE] = @END_DATE, [IS_PERIODIC] = @IS_PERIODIC, 
                                            [COORDINATOR_ID] = @COORDINATOR_ID 
                                      WHERE [ID] = @ID";
                    command.AddParameter("DESCRIPTION", course.Description ?? (object)DBNull.Value);
                    command.AddParameter("REF_YEAR", course.RefYear);
                    command.AddParameter("START_DATE", course.StartDate ?? (object)DBNull.Value);
                    command.AddParameter("END_DATE", course.EndDate ?? (object)DBNull.Value);
                    command.AddParameter("IS_PERIODIC", course.IsPeriodic);
                    command.AddParameter("COORDINATOR_ID", course.CoordinatorId);
                    command.AddParameter("ID", course.Id);
                    command.ExecuteNonQuery();
                }
            }
            catch (Exception ex)
            {
                DbLog.LogError($"Error updating course! {course.ToString()}", ex);
                throw ex;
            }
        }

        public void Delete(int id, UnitOfWork uow)
        {
            try
            {
                using (var command = uow.CreateCommand())
                {


                    command.CommandText = @"DELETE FROM [dbo].[Courses]
                                            WHERE [ID] = @ID";
                    command.AddParameter("ID", id);
                    command.ExecuteNonQuery();
                }
            }
            catch (Exception ex)
            {
                DbLog.LogError($"Error deleting course of id! {id}", ex);
                throw ex;
            }
        }

        public List<Course> GetAllCourses(UnitOfWork uow)
        {
            try
            {
                using (var command = uow.CreateCommand())
                {
                    command.CommandText = @"SELECT * FROM [dbo].[Courses]";
                    return ToList(command);
                }
            }
            catch (Exception ex)
            {
                DbLog.LogError($"Error retrieving all courses", ex);
                throw ex;
            }
        }

        /// <summary>
        /// Return null if not found
        /// </summary>
        /// <param name="id"></param>
        /// <param name="uow"></param>
        /// <returns></returns>
        public Course GetCourseByID(int id, UnitOfWork uow)
        {
            try
            {
                using (var command = uow.CreateCommand())
                {
                    command.CommandText = @"SELECT * FROM [dbo].[Courses] WHERE [ID] = @id";
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
                DbLog.LogError($"Error retriveing course by id {id}", ex);
                throw ex;
            }
        }
    }
}
