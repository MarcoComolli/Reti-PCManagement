using Reti.PCManagement.BL;
using Reti.PCManagement.Entities;
using Reti.PCManagement.Logger;
using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Reti.PCManagement.SL.Controllers
{
    //[EnableCors(origins: "http://localhost:8088", headers: "*", methods: "*")]
    [RoutePrefix("API/Teachers")]
    public class TeachersController : ApiController
    {

        public readonly string GENERIC_ERROR = "Unfortunately an error occurred managing Teachers. Reason:";


        [HttpGet]
        [Route("GetAll")]
        public HttpResponseMessage GetAllTeachers()
        {
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.InternalServerError);
            try
            {
                TeachersManager teachManager = new TeachersManager();
                List<TeacherEntity> teachers = teachManager.GetAllTeachers();
                response = Request.CreateResponse(HttpStatusCode.OK, teachers);
            }
            catch (Exception ex)
            {
                response.ReasonPhrase = $"{GENERIC_ERROR} [{ex.Message}]";
                DbLog.LogError("Error in TeachersController", ex);
            }
            return response;
        }

        [HttpGet]
        [Route("GetByID/{id}")]
        public HttpResponseMessage GetTeacherById(int id)
        {
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.InternalServerError);
            try
            {
                TeachersManager teachManager = new TeachersManager();
                TeacherEntity teacher = teachManager.GetTeacher(id);
                response = Request.CreateResponse(HttpStatusCode.OK, teacher);
            }
            catch (Exception ex)
            {
                response.ReasonPhrase = $"{GENERIC_ERROR} [{ex.Message}]";
                DbLog.LogError("Error in TeachersController", ex);
            }
            return response;
        }

        [HttpPost]
        [Route("Insert")]
        public HttpResponseMessage InsertTeacher([FromBody] TeacherEntity Teacher)
        {
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.InternalServerError);
            try
            {
                TeachersManager teachManager = new TeachersManager();
                teachManager.InsertTeacher(Teacher);
                response = Request.CreateResponse(HttpStatusCode.OK);
            }
            catch (Exception ex)
            {
                response.ReasonPhrase = $"{GENERIC_ERROR}  [{ex.Message}]";
                DbLog.LogError("Error in TeachersController", ex);
            }
            return response;
        }
    }
}
