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
            if (string.IsNullOrEmpty(res.Username))
            {
                res.Username = GenerateUsername(res);
            }

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

        private string GenerateUsername(ResourceEntity res)
        {
            
            var partSurn = res.Surname.Length < 5 ? res.Surname : res.Surname.Substring(0, 5);
            var partName = (res.Name.Length < (7 - partSurn.Length)) ? res.Name : res.Name.Substring(0, 7 - partSurn.Length);
            string partialUsername = $"{partSurn}{partName}";
            partialUsername = partialUsername.PadRight(7, 'a').ToUpper();

            DbDataProvider ddp = new DbDataProvider();
            var result = ddp.GetResourcesByPartialUsername(partialUsername);
            return partialUsername + (result.Count + 1);
        }
    }
}
