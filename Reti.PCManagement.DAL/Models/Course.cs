using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Reti.PCManagement.DAL.Models
{
    public class Course
    {

        public int Id { get; set; }
        public string Description { get; set; }
        public int RefYear { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public bool IsPeriodic { get; set; }
        public int CoordinatorId { get; set; }


        public Course() { }

        public Course(int id, string description, int refYear, DateTime? startDate, DateTime? endDate, bool isPeriodic, int coordinatorId)
        {
            Id = id;
            Description = description;
            RefYear = refYear;
            StartDate = startDate;
            EndDate = endDate;
            IsPeriodic = isPeriodic;
            CoordinatorId = coordinatorId;
        }

        public override string ToString()
        {
            return $"[{Id},{Description},{RefYear},{StartDate},{EndDate},{IsPeriodic},{CoordinatorId}]";
        }

    }
}
