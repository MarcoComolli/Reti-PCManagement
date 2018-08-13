using Reti.PCManagement.Common;
using Reti.PCManagement.Entities;
using Reti.PCManagement.DAL;
using System;
using System.Collections.Generic;

namespace Reti.PCManagement.BL
{
    public class CoursesManager
    {
        /// <summary>
        /// Check if the course to be inserted is valid (without duplicate id or username)
        /// and insert it in the database
        /// </summary>
        /// <param name="course"></param>
        public void InsertCourse(CourseEntity course)
        {
            DbDataProvider ddp = new DbDataProvider();
            //if coordinator not arriving from controller
            if (course.Coordinator?.Id == -1)
            {
                var result = ddp.GetResourceByIdOrUsername(-1, course.Coordinator.Username);
                if(result != null && result.Count == 1)
                {
                    course.Coordinator = result[0];
                    ddp.InsertCourse(course);
                } 
                else
                {
                    throw new Exception("Cannot retrieve resource form user or id");
                }
            } 
            else
            {
                ddp.InsertCourse(course);
            }
        }

        public List<CourseEntity> GetAllCourses()
        {
            DbDataProvider ddp = new DbDataProvider();
            return ddp.GetAllCourses();
        }

        public CourseEntity GetCourse(int id)
        {
            DbDataProvider ddp = new DbDataProvider();
            return ddp.GetCourseById(id);
        }

        public CourseEntity DeleteCourse(CourseEntity course)
        {
            DbDataProvider ddp = new DbDataProvider();
            return ddp.DeleteCourse(course);
        }

        public void EditCourse(CourseEntity course)
        {
            DbDataProvider ddp = new DbDataProvider();
 
            //if coordinator not arriving from controller
            if (course.Coordinator?.Id == -1)
            {
                var result = ddp.GetResourceByIdOrUsername(-1, course.Coordinator.Username);
                if (result != null && result.Count == 1)
                {
                    course.Coordinator = result[0];
                }
                else
                {
                    throw new Exception("Cannot retrieve resource form user or id");
                }
            }
            ddp.EditCourse(course);
        }
    }
}
