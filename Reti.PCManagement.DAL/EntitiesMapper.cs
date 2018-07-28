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
    }
}
