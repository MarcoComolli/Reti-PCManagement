using Reti.PCManagement.Entities;
using Reti.PCManagement.DAL;
using System;
using System.Collections.Generic;
using System.Linq;

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


        public void DeleteResource(ResourceEntity res)
        {
            DbDataProvider ddp = new DbDataProvider();
            ddp.DeleteResource(res);
        }

        public void EditResource(ResourceEntity newRes, ResourceEntity oldRes)
        {
            DbDataProvider ddp = new DbDataProvider();
            newRes.Username = GenerateUsername(newRes);
            //if the generated username match the oldone don't increase the last number by one
            if (newRes.Username.Substring(0,7).Equals(oldRes.Username.Substring(0,7),StringComparison.OrdinalIgnoreCase))
            {
                newRes.Username = oldRes.Username;
            }
            ddp.EditResource(newRes);

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
            try
            {
                var partSurn = res.Surname.Length < 5 ? res.Surname : res.Surname.Substring(0, 5);
                var partName = (res.Name.Length < (7 - partSurn.Length)) ? res.Name : res.Name.Substring(0, 7 - partSurn.Length);
                string partialUsername = $"{partSurn}{partName}";
                partialUsername = partialUsername.PadRight(7, 'a').ToUpper();

                DbDataProvider ddp = new DbDataProvider();
                var result = ddp.GetResourcesByPartialUsername(partialUsername);
                if(result.Count() == 0)
                {
                    return partialUsername + 1;
                }
                var numbers = result.Select(x => int.Parse(x.Username.Substring(7, 1)));
                //the numbers are in sequence and no empty slot left
                if (numbers.Max() == result.Count)
                {
                    return partialUsername + (result.Count + 1);
                }
                //there are some free numbers in the sequence
                else
                {
                    //search for the first free number and take it
                    for (int i = 1; i <= numbers.Count(); i++)
                    {
                        if (numbers.FirstOrDefault(x => x == i) == 0)
                        {
                            return partialUsername + i;
                        }
                    }

                }
                return partialUsername.Substring(0, 6) + 10; //only 8 chars in db..to be managed in future
            }
            catch (Exception ex)
            {
                Logger.DbLog.LogError("Error generating username for resource " + res, ex);
                throw ex;
            }
            
        }
    }
}
