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

        [HttpDelete]
        [Route("Delete")]
        public HttpResponseMessage DeleteResource([FromBody] ResourceEntity resource)
        {
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.InternalServerError);
            try
            {
                ResourcesManager resManager = new ResourcesManager();
                resManager.DeleteResource(resource);
                response = Request.CreateResponse(HttpStatusCode.OK);
            }
            catch (Exception ex)
            {
                response.Content = new StringContent($"{GENERIC_ERROR}  [{ex.Message}]");
                DbLog.LogError("Error in ResourcesController", ex);
            }
            return response;
        }


        [HttpPut]
        [Route("Edit")]
        public HttpResponseMessage EditResource([FromBody] ResourceEntity newResource, [FromBody] ResourceEntity oldResource)
        {
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.InternalServerError);
            try
            {
                ResourcesManager teachersManager = new ResourcesManager();
                teachersManager.EditResource(newResource, oldResource);
                response = Request.CreateResponse(HttpStatusCode.OK);
            }
            catch (Exception ex)
            {
                response.Content = new StringContent($"{GENERIC_ERROR}  [{ex.Message}]");
                DbLog.LogError("Error in ResourcesController", ex);
            }
            return response;
        }
    }
}
