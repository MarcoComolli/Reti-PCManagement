using Reti.PCManagement.Common;
using Reti.PCManagement.Entities;
using Reti.PCManagement.DAL;
using System;
using System.Collections.Generic;

namespace Reti.PCManagement.BL
{
    public class EnrollmentsManager
    {
        public void InsertEnrollment(EnrollmentEntity enroll)
        {
            DbDataProvider ddp = new DbDataProvider();
            
            var resApplicant = ddp.GetResourceByIdOrUsername(-1, enroll.Resource.Username);

            if (resApplicant.Count != 1)
            {
                throw new Exception("Error retrieving applicant resource by username " + enroll.Resource.Username);
            }

            var resLeader = ddp.GetResourceByIdOrUsername(-1, enroll.ProjectLeader.Username);

            if (resLeader.Count != 1)
            {
                throw new Exception("Error retrieving applicant leader resource by username " + enroll.ProjectLeader.Username);
            }

            var course = ddp.GetCourseById(enroll.Course.Id);
            if (course == null)
            {
                throw new Exception("Error retrieving course by id " + enroll.Course.Id);
            }

            enroll.Course = course;
            enroll.Resource = resApplicant[0];
            enroll.ProjectLeader = resLeader[0];

            ddp.InsertEnrollment(enroll);
        }

        public List<EnrollmentEntity> GetAllEnrollments()
        {
            DbDataProvider ddp = new DbDataProvider();
            return ddp.GetAllenrollments();
        }

        public EnrollmentEntity GetEnrollment(int id)
        {
            DbDataProvider ddp = new DbDataProvider();
            return ddp.GetEnrollmentById(id);
        }
    }
}
