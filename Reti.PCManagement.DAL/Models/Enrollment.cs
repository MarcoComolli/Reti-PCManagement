using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Reti.PCManagement.DAL.Models
{
    public class Enrollment
    {

        public int Id { get; set; }
        public int ReosurceId { get; set; }
        public int ProjectLeaderId { get; set; }
        public int CourseId { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? MaxEndDate { get; set; }
        public bool IsAdmitted { get; set; }
        public string Notes { get; set; }


        public Enrollment(int id, int reosurceId, int projectLeaderId, int courseId, DateTime? startDate, DateTime? maxEndDate, bool isAdmitted, string notes)
        {
            Id = id;
            ReosurceId = reosurceId;
            ProjectLeaderId = projectLeaderId;
            CourseId = courseId;
            StartDate = startDate;
            MaxEndDate = maxEndDate;
            IsAdmitted = isAdmitted;
            Notes = notes;
        }

    }
}
