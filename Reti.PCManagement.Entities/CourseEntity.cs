using System;
namespace Reti.PCManagement.Entities
{
    public class CourseEntity
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public int RefYear { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public bool IsPeriodic { get; set; }
        public ResourceEntity Coordinator { get; set; }

        public CourseEntity(int id, string description, int refYear, DateTime? startDate, DateTime? endDate, bool isPeriodic, ResourceEntity coordinator)
        {
            Id = id;
            Description = description;
            RefYear = refYear;
            StartDate = startDate;
            EndDate = endDate;
            IsPeriodic = isPeriodic;
            Coordinator = coordinator;
        }

        public override string ToString()
        {
            return $"[{Id},{Description},{RefYear},{StartDate},{EndDate},{IsPeriodic},{Coordinator}]";
        }
    }
}
