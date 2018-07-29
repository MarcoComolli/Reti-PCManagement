using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Reti.PCManagement.Entities
{
    public class TeacherEntity
    {
        public int Id { get; set; }
        public ResourceEntity Resource { get; set; }
        public CourseEntity Course { get; set; }
        public string Notes { get; set; }

        public TeacherEntity() { }

        public TeacherEntity(int id, ResourceEntity resource, CourseEntity course, string notes)
        {
            Id = id;
            Resource = resource;
            Course = course;
            Notes = notes;
        }

        public override string ToString()
        {
            return $"[{Id},{Resource},{Course},{Notes}]";
        }

    }
}
