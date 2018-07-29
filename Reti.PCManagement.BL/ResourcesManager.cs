using Reti.PCManagement.Common;
using Reti.PCManagement.Entities;
using Reti.PCManagement.DAL;
using System;
using System.Collections.Generic;

namespace Reti.PCManagement.BL
{
    public class ResourcesManager
    {
        public void InsertResource(ResourceEntity res)
        {
            if (CheckResourceInsert(res))
            {
                DbDataProvider ddp = new DbDataProvider();
                ddp.InsertResource(res);
            }
            else
            {
                throw new Exception("Cannot insert resource. Duplicate ID or Username");
            }
        }

        public List<ResourceEntity> GetAllResources()
        {
            DbDataProvider ddp = new DbDataProvider();
            return ddp.GetAllResources();
        }

        public ResourceEntity GetResource(int id)
        {
            DbDataProvider ddp = new DbDataProvider();
            return ddp.GetResourceById(id);
        }

        private bool CheckResourceInsert(ResourceEntity res)
        {
            DbDataProvider ddp = new DbDataProvider();
            var result = ddp.GetResourceByIdOrUsername(res.Id, res.Username);
            if (result != null)
            {
                return result.Count <= 0;
            }
            return false;
        }
    }
}
