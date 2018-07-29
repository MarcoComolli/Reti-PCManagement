using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Reti.PCManagement.Entities
{
    public class EnrollmentEntity
    {
        public int Id { get; set; }
        public ResourceEntity Resource { get; set; }
        public ResourceEntity ProjectLeader { get; set; }
        public CourseEntity Course { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? MaxEndDate { get; set; }
        public bool IsAdmitted { get; set; }
        public string Notes { get; set; }

        public EnrollmentEntity() { }

        public EnrollmentEntity(int id, ResourceEntity resource, ResourceEntity projectLeader, CourseEntity course, DateTime? startDate, DateTime? maxEndDate, bool isAdmitted, string notes)
        {
            Id = id;
            Resource = resource;
            ProjectLeader = projectLeader;
            Course = course;
            StartDate = startDate;
            MaxEndDate = maxEndDate;
            IsAdmitted = isAdmitted;
            Notes = notes;
        }

        public override string ToString()
        {
            return $"[{Id},{Resource.ToString()},{ProjectLeader.ToString()},{Course.ToString()},{StartDate},{MaxEndDate},{IsAdmitted},{Notes}]";
        }

    }
}
