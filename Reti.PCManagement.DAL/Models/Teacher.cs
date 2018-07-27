using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Reti.PCManagement.DAL.Models
{
    public class Teacher
    {
        public int Id { get; set; }
        public int ResourceId { get; set; }
        public int CourseId { get; set; }
        public string Notes { get; set; }

        public Teacher() { }

        public Teacher(int id, int resourceId, int courseId, string notes)
        {
            Id = id;
            ResourceId = resourceId;
            CourseId = courseId;
            Notes = notes;
        }

        public override string ToString()
        {
            return $"[{Id},{ResourceId},{CourseId},{Notes}]";
        }

    }
}
