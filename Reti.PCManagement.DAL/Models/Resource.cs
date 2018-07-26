using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Reti.PCManagement.DAL.Models
{
    public class Resource
    {
        
        public int Id { get; set; }
        public string Username { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Status { get; set; }


        public Resource(int id, string username, string name, string surname, string status)
        {
            Id = id;
            Username = username;
            Name = name;
            Surname = surname;
            Status = status;
        }



    }
}
