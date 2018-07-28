using Reti.PCManagement.DAL.Repositories;
using Reti.PCManagement.Entities;
using Reti.PCManagement.Logger;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Reti.PCManagement.DAL
{
    public class DbDataProvider
    {

        public void InsertResource(ResourceEntity res)
        {
            ResourcesRepository resRepo = new ResourcesRepository();
            using (var uow = UnitOfWork.CreateUoW())
            {
                try
                {
                    resRepo.Create(EntitiesMapper.ToDbModel(res), uow);
                    uow.ApplyChanges();
                }
                catch (Exception ex)
                {
                    uow.Rollback();
                    DbLog.LogError("Error inserting resource " + res, ex);
                }

            }
               
        }

        public List<ResourceEntity> GetByResourceOrUsername(int id, string username)
        {
            List<ResourceEntity> result = new List<ResourceEntity>();
            ResourcesRepository resRepo = new ResourcesRepository();
            using (var uow = UnitOfWork.CreateUoW())
            {
                try
                {
                    var resList = resRepo.GetResourceByIDOrUsername(id, username, uow);
                    //uow.ApplyChanges();
                    result = resList.Select(x => EntitiesMapper.ToEntity(x)).ToList();
                }
                catch (Exception ex)
                {
                    uow.Rollback();
                    DbLog.LogError("Error retrieving resource " + id + " " + username, ex);
                }

            }
            return result;
        }
    }
}
