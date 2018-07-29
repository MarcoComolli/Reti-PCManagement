using Reti.PCManagement.DAL.Models;
using Reti.PCManagement.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Reti.PCManagement.DAL
{
    /// <summary>
    /// Convert Database DataModels to Entities and viceversa
    /// </summary>
    public static class EntitiesMapper
    {
        public static ResourceEntity ToEntity(Resource res)
        {
            return new ResourceEntity(res.Id, res.Username, res.Name, res.Surname, res.Status);
        }

        public static Resource ToDbModel(ResourceEntity res)
        {
            return new Resource(res.Id, res.Username, res.Name, res.Surname, res.Status);
        }

        public static CourseEntity ToEntity(Course crs)
        {
            DbDataProvider ddp = new DbDataProvider();
            ResourceEntity coordinator = ddp.GetResourceById(crs.CoordinatorId);
            return new CourseEntity(crs.Id, crs.Description, crs.RefYear, crs.StartDate, crs.EndDate, crs.IsPeriodic, coordinator);
        }

        public static Course ToDbModel(CourseEntity crs)
        {
            return new Course(crs.Id, crs.Description, crs.RefYear, crs.StartDate, crs.EndDate, crs.IsPeriodic, crs.Coordinator.Id);
        }

        public static EnrollmentEntity ToEntity(Enrollment enrl)
        {
            DbDataProvider ddp = new DbDataProvider();
            ResourceEntity resource = ddp.GetResourceById(enrl.ResourceId);
            ResourceEntity projectLeader = ddp.GetResourceById(enrl.ProjectLeaderId); ;
            CourseEntity course = ddp.GetCourseById(enrl.CourseId); ;
            return new EnrollmentEntity(enrl.Id, resource, projectLeader, course, enrl.StartDate, enrl.MaxEndDate, enrl.IsAdmitted, enrl.Notes);
        }

        public static Enrollment ToDbModel(EnrollmentEntity enrl)
        {
            return new Enrollment(enrl.Id, enrl.Resource.Id, enrl.ProjectLeader.Id, enrl.Course.Id, enrl.StartDate, enrl.MaxEndDate, enrl.IsAdmitted, enrl.Notes);
        }

        public static TeacherEntity ToEntity(Teacher tchr)
        {
            DbDataProvider ddp = new DbDataProvider();
            ResourceEntity resource = ddp.GetResourceById(tchr.ResourceId);
            CourseEntity course = ddp.GetCourseById(tchr.CourseId); ;

            return new TeacherEntity(tchr.Id, resource, course, tchr.Notes);
        }

        public static Teacher ToDbModel(TeacherEntity tchr)
        {
            return new Teacher(tchr.Id, tchr.Resource.Id, tchr.Course.Id, tchr.Notes);
        }
    }
}
