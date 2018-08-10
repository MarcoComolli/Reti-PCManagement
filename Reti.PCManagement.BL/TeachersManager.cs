using Reti.PCManagement.Common;
using Reti.PCManagement.Entities;
using Reti.PCManagement.DAL;
using System;
using System.Collections.Generic;

namespace Reti.PCManagement.BL
{
    public class TeachersManager
    {
        public void InsertTeacher(TeacherEntity tch)
        {
            DbDataProvider ddp = new DbDataProvider();
            var resource = ddp.GetResourceByIdOrUsername(-1,tch.Resource.Username);

            if(resource.Count != 1)
            {
                throw new Exception("Error retrieving resource by username " + tch.Resource.Username);
            }

            var course = ddp.GetCourseById(tch.Course.Id);
            if(course == null)
            {
                throw new Exception("Error retrieving course by id " + tch.Course.Id);
            }

            tch.Course = course;
            tch.Resource = resource[0];

            ddp.InsertTeacher(tch);
        }

        public List<TeacherEntity> GetAllTeachers()
        {
            DbDataProvider ddp = new DbDataProvider();
            return ddp.GetAllTeachers();
        }

        public TeacherEntity GetTeacher(int id)
        {
            DbDataProvider ddp = new DbDataProvider();
            return ddp.GetTeacherById(id);
        }
    }
}
