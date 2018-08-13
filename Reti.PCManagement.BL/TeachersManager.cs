using Reti.PCManagement.Common;
using Reti.PCManagement.Entities;
using Reti.PCManagement.DAL;
using System;
using System.Collections.Generic;

namespace Reti.PCManagement.BL
{
    public class TeachersManager
    {
        /// <summary>
        /// Retrieve missing information by id or username of the entities and build the 
        /// Teacher to be inserted in the database
        /// </summary>
        /// <param name="tch"></param>
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

        public void DeleteTeacher(TeacherEntity teacher)
        {
            DbDataProvider ddp = new DbDataProvider();
            ddp.DeleteTeacher(teacher);
        }

        /// <summary>
        /// Retrieve missing information by id or username of the entities and build the 
        /// Teacher that will be updated in the db
        /// </summary>
        /// <param name="teacher"></param>
        public void EditTeacher(TeacherEntity teacher)
        {
            DbDataProvider ddp = new DbDataProvider();

            //if resource not arriving from controller
            if (teacher.Resource?.Id == -1)
            {
                var result = ddp.GetResourceByIdOrUsername(-1, teacher.Resource.Username);
                if (result != null && result.Count == 1)
                {
                    teacher.Resource = result[0];
                }
                else
                {
                    throw new Exception("Cannot retrieve resource form username");
                }
            }

            var course = ddp.GetCourseById(teacher.Course.Id);
            if (course != null)
            {
                teacher.Course = course;
            }
            else
            {
                throw new Exception("Cannot retrieve course for id " + teacher.Course.Id);
            }
                
            ddp.EditTeacher(teacher);
           
        }
    }
}
