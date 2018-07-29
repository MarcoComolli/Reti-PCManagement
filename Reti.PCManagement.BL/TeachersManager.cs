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
