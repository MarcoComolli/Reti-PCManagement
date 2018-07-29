using Reti.PCManagement.BL;
using Reti.PCManagement.Entities;
using Reti.PCManagement.Logger;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace Reti.PCManagement.SL.Controllers
{
    //[EnableCors(origins: "http://localhost:8088", headers: "*", methods: "*")]
    [RoutePrefix("API/Resources")]
    public class ResourcesController : ApiController
    {
        [HttpGet]
        [Route("GetAll")]
        public IEnumerable<ResourceEntity> GetAllResources()
        {
            ResourcesManager resManager = new ResourcesManager();
            List<ResourceEntity> users = resManager.GetAllResources();
            return users;
        }

        //[HttpGet]
        //public IHttpActionResult GetUser(int id)
        //{
        //    UsersManager mng = new UsersManager();
        //    User user = mng.GetUserById(id);
        //    if (user == null)
        //    {
        //        return NotFound();
        //    }
        //    // TODO: use Mappers!
        //    return Ok(new UserVM() { Id = user.Id, UserTitleId = user.UserTitleId, Username = user.Username, Surname = user.Surname, Name = user.Name });
        //}

        //[HttpPost]
        //public IHttpActionResult PostUser(UserVM item)
        //{
        //    UsersManager mng = new UsersManager();
        //    // TODO: use Mappers!
        //    User user = new User() { Id = item.Id, UserTitleId = item.UserTitleId, Username = item.Username, Surname = item.Surname, Name = item.Name };
        //    mng.CreateUser(user);
        //    return Ok(item);
        //}

        //[HttpPut]
        //public IHttpActionResult PutUser(int id, [FromBody] UserVM item)
        //{
        //    UsersManager mng = new UsersManager();
        //    // TODO: use Mappers!
        //    User user = new User() { Id = item.Id, UserTitleId = item.UserTitleId, Username = item.Username, Surname = item.Surname, Name = item.Name };
        //    mng.UpdateUser(id, user);

        //    return Ok(id);
        //}

        //[HttpDelete]
        //public IHttpActionResult DeleteUser([FromUri] int id)
        //{
        //    try
        //    {
        //        UsersManager mng = new UsersManager();
        //        mng.DeleteUser(id);
        //        return Ok(id);
        //    }
        //    catch (Exception ex)
        //    {
        //        return BadRequest(ex.Message);
        //    }
        //}
    }
}
