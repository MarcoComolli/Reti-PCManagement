using Reti.PCManagement.Common;
using Reti.PCManagement.Entities;
using Reti.PCManagement.DAL;
using System;
using System.Collections.Generic;

namespace Reti.PCManagement.BL
{
    public class EnrollmentManager
    {
        public void InsertTeacher(EnrollmentEntity enroll)
        {
            DbDataProvider ddp = new DbDataProvider();
            ddp.InsertEnrollment(enroll);
        }

        public List<EnrollmentEntity> GetAllResources()
        {
            DbDataProvider ddp = new DbDataProvider();
            return ddp.GetAllenrollments();
        }

        public EnrollmentEntity GetResource(int id)
        {
            DbDataProvider ddp = new DbDataProvider();
            return ddp.GetEnrollmentById(id);
        }
    }
}
