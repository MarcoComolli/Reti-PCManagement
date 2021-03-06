﻿using Reti.PCManagement.DAL.Repositories;
using Reti.PCManagement.Entities;
using Reti.PCManagement.Logger;
using System;
using System.Collections.Generic;
using System.Linq;


namespace Reti.PCManagement.DAL
{
    /// <summary>
    /// Manage the Repositories and the Unit of Work to query the database.
    /// Provide the "access point" to the DataAccessLayer to the Business Layer
    /// </summary>
    public class DbDataProvider
    {

        public void InsertResource(ResourceEntity res)
        {
            ResourcesRepository resRepo = new ResourcesRepository();
            using (var uow = UnitOfWork.CreateUoW())
            {
                try
                {
                    resRepo.Create(EntitiesMapper.ToDbModel(res), uow);
                    uow.ApplyChanges();
                }
                catch (Exception ex)
                {
                    uow.Rollback();
                    DbLog.LogError("Error inserting resource " + res, ex);
                    throw ex;
                }

            }
               
        }

        public ResourceEntity GetResourceById(int id)
        {
            ResourceEntity result = null;
            ResourcesRepository resRepo = new ResourcesRepository();
            using (var uow = UnitOfWork.CreateUoW())
            {
                try
                {
                    var res = resRepo.GetResourceByID(id, uow);
                    result = res != null ? EntitiesMapper.ToEntity(res) : null;
                }
                catch (Exception ex)
                {
                    DbLog.LogError("Error retrieving resource " + id, ex);
                    throw ex;
                }

            }
            return result;
        }

        public List<ResourceEntity> GetResourceByIdOrUsername(int id, string username)
        {
            List<ResourceEntity> result = new List<ResourceEntity>();
            ResourcesRepository resRepo = new ResourcesRepository();
            using (var uow = UnitOfWork.CreateUoW())
            {
                try
                {
                    var resList = resRepo.GetResourceByIDOrUsername(id, username, uow);
                    result = resList.Select(x => EntitiesMapper.ToEntity(x)).ToList();
                }
                catch (Exception ex)
                {
                    DbLog.LogError("Error retrieving resource " + id + " " + username, ex);
                    throw ex;
                }

            }
            return result;
        }

        public List<ResourceEntity> GetResourcesByPartialUsername(string partUsername)
        {
            List<ResourceEntity> result = new List<ResourceEntity>();
            ResourcesRepository resRepo = new ResourcesRepository();
            using (var uow = UnitOfWork.CreateUoW())
            {
                try
                {
                    var resList = resRepo.GetResourcesByPartialUsername(partUsername, uow);
                    result = resList.Select(x => EntitiesMapper.ToEntity(x)).ToList();
                }
                catch (Exception ex)
                {
                    DbLog.LogError("Error retrieving resources " + partUsername, ex);
                    throw ex;
                }

            }
            return result;
        }

        public void DeleteResource(ResourceEntity resource)
        {
            ResourcesRepository resRepo = new ResourcesRepository();
            using (var uow = UnitOfWork.CreateUoW())
            {
                try
                {
                    resRepo.Delete(resource.Id, uow);
                    uow.ApplyChanges();
                }
                catch (Exception ex)
                {
                    DbLog.LogError("Error deleting resource " + resource.Id, ex);
                    throw ex;
                }

            }
        }

        public void EditResource(ResourceEntity resource)
        {
            ResourcesRepository resRepo = new ResourcesRepository();
            using (var uow = UnitOfWork.CreateUoW())
            {
                try
                {
                    resRepo.Update(EntitiesMapper.ToDbModel(resource), uow);
                    uow.ApplyChanges();
                }
                catch (Exception ex)
                {
                    DbLog.LogError("Error editing resource " + resource, ex);
                    throw ex;
                }
            }
        }

        public List<ResourceEntity> GetAllResources()
        {
            List<ResourceEntity> result = new List<ResourceEntity>();
            ResourcesRepository resRepo = new ResourcesRepository();
            using (var uow = UnitOfWork.CreateUoW())
            {
                try
                {
                    var resList = resRepo.GetAllResources(uow);
                    result = resList.Select(x => EntitiesMapper.ToEntity(x)).ToList();
                }
                catch (Exception ex)
                {
                    DbLog.LogError("Error retrieving all resources", ex);
                    throw ex;
                }

            }
            return result;
        }


        public void InsertCourse(CourseEntity course)
        {
            CoursesRepository courseRepo = new CoursesRepository();
            using (var uow = UnitOfWork.CreateUoW())
            {
                try
                {
                    courseRepo.Create(EntitiesMapper.ToDbModel(course), uow);
                    uow.ApplyChanges();
                }
                catch (Exception ex)
                {
                    uow.Rollback();
                    DbLog.LogError("Error inserting course " + course, ex);
                    throw ex;
                }

            }
        }

        public List<CourseEntity> GetAllCourses()
        {
            List<CourseEntity> result = new List<CourseEntity>();
            CoursesRepository courseRepo = new CoursesRepository();
            using (var uow = UnitOfWork.CreateUoW())
            {
                try
                {
                    var list = courseRepo.GetAllCourses(uow);
                    result = list.Select(x => EntitiesMapper.ToEntity(x)).ToList();
                }
                catch (Exception ex)
                {
                    DbLog.LogError("Error retrieving all courses", ex);
                    throw ex;
                }
            }
            return result;
        }

        public CourseEntity GetCourseById(int id)
        {
            CourseEntity result = null;
            CoursesRepository courseRepo = new CoursesRepository();
            using (var uow = UnitOfWork.CreateUoW())
            {
                try
                {
                    var res = courseRepo.GetCourseByID(id, uow);
                    result = res != null ? EntitiesMapper.ToEntity(res) : null;
                }
                catch (Exception ex)
                {
                    DbLog.LogError("Error retrieving course " + id, ex);
                    throw ex;
                }

            }
            return result;
        }

        public CourseEntity DeleteCourse(CourseEntity course)
        {
            CourseEntity result = null;
            CoursesRepository courseRepo = new CoursesRepository();
            using (var uow = UnitOfWork.CreateUoW())
            {
                try
                {
                    courseRepo.Delete(course.Id, uow);
                    uow.ApplyChanges();
                }
                catch (Exception ex)
                {
                    DbLog.LogError("Error deleting course " + course.Id, ex);
                    throw ex;
                }

            }
            return result;
        }


        public void EditCourse(CourseEntity course)
        {
            CoursesRepository courseRepo = new CoursesRepository();
            using (var uow = UnitOfWork.CreateUoW())
            {
                try
                {
                    courseRepo.Update(EntitiesMapper.ToDbModel(course), uow);
                    uow.ApplyChanges();
                }
                catch (Exception ex)
                {
                    uow.Rollback();
                    DbLog.LogError("Error editing course " + course, ex);
                    throw ex;
                }

            }
        }



        public void InsertEnrollment(EnrollmentEntity enroll)
        {
            EnrollmentsRepository enrollRepo = new EnrollmentsRepository();
            using (var uow = UnitOfWork.CreateUoW())
            {
                try
                {
                    enrollRepo.Create(EntitiesMapper.ToDbModel(enroll), uow);
                    uow.ApplyChanges();
                }
                catch (Exception ex)
                {
                    uow.Rollback();
                    DbLog.LogError("Error inserting enrollment " + enroll, ex);
                    throw ex;
                }

            }
        }

        public List<EnrollmentEntity> GetAllenrollments()
        {
            List<EnrollmentEntity> result = new List<EnrollmentEntity>();
            EnrollmentsRepository enrollRepo = new EnrollmentsRepository();
            using (var uow = UnitOfWork.CreateUoW())
            {
                try
                {
                    var list = enrollRepo.GetAllEnrollments(uow);
                    result = list.Select(x => EntitiesMapper.ToEntity(x)).ToList();
                }
                catch (Exception ex)
                {
                    DbLog.LogError("Error retrieving all Enrollments", ex);
                    throw ex;
                }
            }
            return result;
        }

        public EnrollmentEntity GetEnrollmentById(int id)
        {
            EnrollmentEntity result = null;
            EnrollmentsRepository enrollRepo = new EnrollmentsRepository();
            using (var uow = UnitOfWork.CreateUoW())
            {
                try
                {
                    var res = enrollRepo.GetEnrollmentByID(id, uow);
                    result = res != null ? EntitiesMapper.ToEntity(res) : null;
                }
                catch (Exception ex)
                {
                    DbLog.LogError("Error retrieving enrollment " + id, ex);
                    throw ex;
                }

            }
            return result;
        }

        public void DeleteEnrollment(EnrollmentEntity enroll)
        {
            EnrollmentsRepository enrollRepo = new EnrollmentsRepository();
            using (var uow = UnitOfWork.CreateUoW())
            {
                try
                {
                    enrollRepo.Delete(enroll.Id, uow);
                    uow.ApplyChanges();
                }
                catch (Exception ex)
                {
                    DbLog.LogError("Error deleting enrollment " + enroll.Id, ex);
                    throw ex;
                }

            }
        }

        public void EditEnrollment(EnrollmentEntity enroll)
        {
            EnrollmentsRepository enrollRepo = new EnrollmentsRepository();
            using (var uow = UnitOfWork.CreateUoW())
            {
                try
                {
                    enrollRepo.Update(EntitiesMapper.ToDbModel(enroll), uow);
                    uow.ApplyChanges();
                }
                catch (Exception ex)
                {
                    DbLog.LogError("Error editing enrollment " + enroll, ex);
                    throw ex;
                }
            }
        }


        public void InsertTeacher(TeacherEntity teacher)
        {
            TeachersRepository teachRepo = new TeachersRepository();
            using (var uow = UnitOfWork.CreateUoW())
            {
                try
                {
                    teachRepo.Create(EntitiesMapper.ToDbModel(teacher), uow);
                    uow.ApplyChanges();
                }
                catch (Exception ex)
                {
                    uow.Rollback();
                    DbLog.LogError("Error inserting teacher " + teacher, ex);
                    throw ex;
                }

            }
        }

        public List<TeacherEntity> GetAllTeachers()
        {
            List<TeacherEntity> result = new List<TeacherEntity>();
            TeachersRepository teachRepo = new TeachersRepository();
            using (var uow = UnitOfWork.CreateUoW())
            {
                try
                {
                    var list = teachRepo.GetAllTeachers(uow);
                    result = list.Select(x => EntitiesMapper.ToEntity(x)).ToList();
                }
                catch (Exception ex)
                {
                    DbLog.LogError("Error retrieving all teachers", ex);
                    throw ex;
                }
            }
            return result;
        }

        public TeacherEntity GetTeacherById(int id)
        {
            TeacherEntity result = null;
            TeachersRepository teachRepo = new TeachersRepository();
            using (var uow = UnitOfWork.CreateUoW())
            {
                try
                {
                    var res = teachRepo.GetTeacherByID(id, uow);
                    result = res != null ? EntitiesMapper.ToEntity(res) : null;
                }
                catch (Exception ex)
                {
                    DbLog.LogError("Error retrieving teacher " + id, ex);
                    throw ex;
                }

            }
            return result;
        }

        public void DeleteTeacher(TeacherEntity teacher)
        {
            TeachersRepository teachRepo = new TeachersRepository();
            using (var uow = UnitOfWork.CreateUoW())
            {
                try
                {
                    teachRepo.Delete(teacher.Id, uow);
                    uow.ApplyChanges();
                }
                catch (Exception ex)
                {
                    DbLog.LogError("Error deleting teacher " + teacher.Id, ex);
                    throw ex;
                }

            }
        }

        public void EditTeacher(TeacherEntity teacher)
        {
            TeachersRepository teachRepo = new TeachersRepository();
            using (var uow = UnitOfWork.CreateUoW())
            {
                try
                {
                    teachRepo.Update(EntitiesMapper.ToDbModel(teacher), uow);
                    uow.ApplyChanges();
                }
                catch (Exception ex)
                {
                    DbLog.LogError("Error editing teacher " + teacher, ex);
                    throw ex;
                }
            }
        }
    } 
}
