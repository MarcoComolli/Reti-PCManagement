using Reti.PCManagement.Common;
using Reti.PCManagement.Entities;
using Reti.PCManagement.DAL;
using System;
using System.Collections.Generic;

namespace Reti.PCManagement.BL
{
    public class CoursesManager
    {
        public void InsertCourse(CourseEntity course)
        {
            DbDataProvider ddp = new DbDataProvider();
            ddp.InsertCourse(course);
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
    }
}
