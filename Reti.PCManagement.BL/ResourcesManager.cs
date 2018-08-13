using Reti.PCManagement.Entities;
using Reti.PCManagement.DAL;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Reti.PCManagement.BL
{
    public class ResourcesManager
    {
        /// <summary>
        /// Generate the username based on the resource data and insert in the database
        /// if hasn't a duplicate ID or username
        /// </summary>
        /// <param name="res"></param>
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

        /// <summary>
        /// Generate the username of the new resource and check if the firts 7 chars are the same of the old one.
        /// In that case means that the username in not modified and replace the new generated with the old one
        /// and update the resource in the db.
        /// 
        /// </summary>
        /// <param name="newRes"></param>
        /// <param name="oldRes"></param>
        public void EditResource(ResourceEntity newRes, ResourceEntity oldRes)
        {
            DbDataProvider ddp = new DbDataProvider();
            newRes.Username = GenerateUsername(newRes);
            //if the generated username match the old one don't increase the last number by one
            if (newRes.Username.Substring(0,7).Equals(oldRes.Username.Substring(0,7),StringComparison.OrdinalIgnoreCase))
            {
                newRes.Username = oldRes.Username;
            }
            ddp.EditResource(newRes);

        }

        /// <summary>
        /// Check if the resource has duplicate id or username. If this is the case return false, true otherwise.
        /// </summary>
        /// <param name="res"></param>
        /// <returns></returns>
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

        /// <summary>
        /// Generate the username based on the Name, Surname and the number of the already inserted username with the same value.
        /// Accepting only 8 chars the valid username are composed by the first 5 chars of the surname, the first 2 chars of the name
        /// and a number. For this reason only 9 resources with the same prefix are accepted by the system. Further Resources inserted
        /// past the 9 admitted are not managed and will be refused.
        /// If a name or surname is too short to match the 7 char requisite the remaining characters will be padded with a 'A' char.
        /// The result username will be in uppercase.
        /// </summary>
        /// <param name="res"></param>
        /// <returns>The username generated</returns>
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
