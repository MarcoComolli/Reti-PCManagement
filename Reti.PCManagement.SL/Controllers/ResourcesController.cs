using Reti.PCManagement.BL;
using Reti.PCManagement.Entities;
using Reti.PCManagement.Logger;
using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace Reti.PCManagement.SL.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "GET, POST, DELETE, PUT, OPTIONS")]
    [RoutePrefix("API/Resources")]
    public class ResourcesController : ApiController
    {

        public readonly string GENERIC_ERROR = "Unfortunately an error occurred managing Resources. Reason:";


        [HttpGet]
        [Route("GetAll")]
        public HttpResponseMessage GetAllResources()
        {
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.InternalServerError);
            try
            {
                ResourcesManager resManager = new ResourcesManager();
                List<ResourceEntity> users = resManager.GetAllResources();
                response = Request.CreateResponse(HttpStatusCode.OK, users);
            }
            catch (Exception ex)
            {
                response.Content = new StringContent($"{GENERIC_ERROR}  [{ex.Message}]");
                DbLog.LogError("Error in ResourcesController", ex);
            }
            return response;
        }

        [HttpGet]
        [Route("GetByID/{id}")]
        public HttpResponseMessage GetResourceById(int id)
        {
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.InternalServerError);
            try
            {
                ResourcesManager resManager = new ResourcesManager();
                ResourceEntity user = resManager.GetResource(id);
                response = Request.CreateResponse(HttpStatusCode.OK, user);
            }
            catch (Exception ex)
            {
                response.Content = new StringContent($"{GENERIC_ERROR}  [{ex.Message}]");
                DbLog.LogError("Error in ResourcesController", ex);
            }
            return response;
        }

        [HttpPost]
        [Route("Insert")]
        public HttpResponseMessage InsertResource([FromBody] ResourceEntity resource)
        {
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.InternalServerError);
            try
            {
                ResourcesManager resManager = new ResourcesManager();
                resManager.InsertResource(resource);
                response = Request.CreateResponse(HttpStatusCode.OK);
            }
            catch (Exception ex)
            {
                response.Content = new StringContent($"{GENERIC_ERROR}  [{ex.Message}]");
                DbLog.LogError("Error in ResourcesController", ex);
            }
            return response;
        }

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
