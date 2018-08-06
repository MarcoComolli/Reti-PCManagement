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
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    [RoutePrefix("API/Courses")]
    public class CoursesController : ApiController
    {

        public readonly string GENERIC_ERROR = "Unfortunately an error occurred managing Courses. Reason:";


        [HttpGet]
        [Route("GetAll")]
        public HttpResponseMessage GetAllCourses()
        {
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.InternalServerError);
            try
            {
                CoursesManager courseManager = new CoursesManager();
                List<CourseEntity> courses = courseManager.GetAllCourses();
                response = Request.CreateResponse(HttpStatusCode.OK, courses);
            }
            catch (Exception ex)
            {
                response.Content = new StringContent($"{GENERIC_ERROR}  [{ex.Message}]");
                DbLog.LogError("Error in CoursesController", ex);
            }
            return response;
        }

        [HttpGet]
        [Route("GetByID/{id}")]
        public HttpResponseMessage GetCourseById(int id)
        {
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.InternalServerError);
            try
            {
                CoursesManager courseManager = new CoursesManager();
                CourseEntity course = courseManager.GetCourse(id);
                response = Request.CreateResponse(HttpStatusCode.OK, course);
            }
            catch (Exception ex)
            {
                response.Content = new StringContent($"{GENERIC_ERROR}  [{ex.Message}]");
                DbLog.LogError("Error in CoursesController", ex);
            }
            return response;
        }

        [HttpPost]
        [Route("Insert")]
        public HttpResponseMessage InsertCourse([FromBody] CourseEntity Course)
        {
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.InternalServerError);
            try
            {
                CoursesManager courseManager = new CoursesManager();
                courseManager.InsertCourse(Course);
                response = Request.CreateResponse(HttpStatusCode.OK);
            }
            catch (Exception ex)
            {
                response.Content = new StringContent($"{GENERIC_ERROR}  [{ex.Message}]");
                DbLog.LogError("Error in CoursesController", ex);
            }
            return response;
        }

        [HttpDelete]
        [Route("Delete")]
        public HttpResponseMessage DeleteCourse([FromBody] CourseEntity Course)
        {
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.InternalServerError);
            try
            {
                CoursesManager courseManager = new CoursesManager();
                courseManager.DeleteCourse(Course);
                response = Request.CreateResponse(HttpStatusCode.OK);
            }
            catch (Exception ex)
            {
                response.Content = new StringContent($"{GENERIC_ERROR}  [{ex.Message}]");
                DbLog.LogError("Error in CoursesController", ex);
            }
            return response;
        }
    }
}
