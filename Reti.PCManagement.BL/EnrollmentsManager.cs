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

        public void DeleteEnrollment(EnrollmentEntity enroll)
        {
            DbDataProvider ddp = new DbDataProvider();
            ddp.DeleteEnrollment(enroll);
        }

        public void EditEnrollment(EnrollmentEntity enroll)
        {
            DbDataProvider ddp = new DbDataProvider();

            //if resource not arriving from controller
            if (enroll.Resource.Id == -1)
            {
                var result = ddp.GetResourceByIdOrUsername(-1, enroll.Resource.Username);
                if (result != null && result.Count == 1)
                {
                    enroll.Resource = result[0];
                }
                else
                {
                    throw new Exception("Cannot retrieve applicant from username " + enroll.Resource.Username);
                }
            }

            //if project leader not arriving from controller
            if (enroll.ProjectLeader.Id == -1)
            {
                var result = ddp.GetResourceByIdOrUsername(-1, enroll.ProjectLeader.Username);
                if (result != null && result.Count == 1)
                {
                    enroll.ProjectLeader = result[0];
                }
                else
                {
                    throw new Exception("Cannot retrieve project leader from username " + enroll.ProjectLeader.Username);
                }
            }


            var course = ddp.GetCourseById(enroll.Course.Id);
            if (course != null)
            {
                enroll.Course = course;
            }
            else
            {
                throw new Exception("Cannot retrieve course for id " + enroll.Course.Id);
            }

            ddp.EditEnrollment(enroll);

        }
    }
}
