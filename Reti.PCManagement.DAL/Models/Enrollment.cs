﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Reti.PCManagement.DAL.Models
{
    public class Enrollment
    {

        public int Id { get; set; }
        public int ResourceId { get; set; }
        public int ProjectLeaderId { get; set; }
        public int CourseId { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? MaxEndDate { get; set; }
        public bool IsAdmitted { get; set; }
        public string Notes { get; set; }


        public Enrollment() { }

        public Enrollment(int id, int resourceId, int projectLeaderId, int courseId, DateTime? startDate, DateTime? maxEndDate, bool isAdmitted, string notes)
        {
            Id = id;
            ResourceId = resourceId;
            ProjectLeaderId = projectLeaderId;
            CourseId = courseId;
            StartDate = startDate;
            MaxEndDate = maxEndDate;
            IsAdmitted = isAdmitted;
            Notes = notes;
        }

        public override string ToString()
        {
            return $"[{Id},{ResourceId},{ProjectLeaderId},{CourseId},{StartDate},{MaxEndDate},{IsAdmitted},{Notes}]";
        }

    }
}
