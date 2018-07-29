﻿using Reti.PCManagement.BL;
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
    [RoutePrefix("API/Enrollments")]
    public class EnrollmentsController : ApiController
    {

        public readonly string GENERIC_ERROR = "Unfortunately an error occurred managing Enrollments. Reason:";


        [HttpGet]
        [Route("GetAll")]
        public HttpResponseMessage GetAllEnrollments()
        {
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.InternalServerError);
            try
            {
                EnrollmentsManager enrollManager = new EnrollmentsManager();
                List<EnrollmentEntity> enrollments = enrollManager.GetAllEnrollments();
                response = Request.CreateResponse(HttpStatusCode.OK, enrollments);
            }
            catch (Exception ex)
            {
                response.ReasonPhrase = $"{GENERIC_ERROR} [{ex.Message}]";
                DbLog.LogError("Error in EnrollmentsController", ex);
            }
            return response;
        }

        [HttpGet]
        [Route("GetByID/{id}")]
        public HttpResponseMessage GetEnrollmentById(int id)
        {
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.InternalServerError);
            try
            {
                EnrollmentsManager enrollManager = new EnrollmentsManager();
                EnrollmentEntity enrollment = enrollManager.GetEnrollment(id);
                response = Request.CreateResponse(HttpStatusCode.OK, enrollment);
            }
            catch (Exception ex)
            {
                response.ReasonPhrase = $"{GENERIC_ERROR} [{ex.Message}]";
                DbLog.LogError("Error in EnrollmentsController", ex);
            }
            return response;
        }

        [HttpPost]
        [Route("Insert")]
        public HttpResponseMessage InsertEnrollment([FromBody] EnrollmentEntity Enrollment)
        {
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.InternalServerError);
            try
            {
                EnrollmentsManager enrollManager = new EnrollmentsManager();
                enrollManager.InsertEnrollment(Enrollment);
                response = Request.CreateResponse(HttpStatusCode.OK);
            }
            catch (Exception ex)
            {
                response.ReasonPhrase = $"{GENERIC_ERROR}  [{ex.Message}]";
                DbLog.LogError("Error in EnrollmentsController", ex);
            }
            return response;
        }
    }
}