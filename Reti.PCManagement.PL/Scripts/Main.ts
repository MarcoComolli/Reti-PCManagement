import { Course } from "../ViewModels/Course";
import { Resource } from "../ViewModels/Resource";
import { ConnectionManager } from "./ConnectionManager";
import { ViewState, ResourceType } from "./ViewState";
import { Constants } from "./Constants";
import { Enrollment } from "../ViewModels/Enrollment";
import { Teacher } from "../ViewModels/Teacher";


let state: ViewState;

$("document").ready(() => {

    init();

    //click handlers 
    $(".data-list .add-plus").click(() => {
        state.isCurrentInsert = true;
        openInsert(state.resourceSelected);
    });

    $(".data-detail .close-x").click(() => {
        closeDetail();
    });

    $(".btn-edit").click(() => {
        state.isCurrentInsert = false;
        openEdit(state.currentIdx, state.resourceSelected);
    });

    $("section.data-insert .btn-save").click(() => {
        insertOrUpdateData(state.resourceSelected);
    });

    $(".data-insert .close-x").click(() => {
        closeInsert();
    });

    $("section.data-detail .btn-delete").click(() => {
        deleteData(state.currentIdx, state.resourceSelected);
    });

    $(".menu-courses").click(() => {
        changeResourceView(ResourceType.Course);
    });

    $(".menu-teachers").click(() => {
        changeResourceView(ResourceType.Teacher);
    });

    $(".menu-enrollments").click(() => {
        changeResourceView(ResourceType.Enrollment);
    });

    $(".menu-resources").click(() => {
        changeResourceView(ResourceType.Resource);
    });



});


function changeResourceView(type: ResourceType) {
    state.resourceSelected = type;

    $("section.data-list").first().addClass("full-view");
    $("section.data-list").first().removeClass("partial-view");
    $("section.data-detail").first().hide();
    $("section.data-insert").first().hide();

    generateTableHeaders(type);

    switch (type) {
        case ResourceType.Course:
            $(".data-list-container .title-row").text(Constants.TITLE_COURSES);
            updateCoursesList();
            break;
        case ResourceType.Enrollment:
            $(".data-list-container .title-row").text(Constants.TITLE_ENROLL);
            updateEnrollmentsList();
            break;
        case ResourceType.Teacher:
            $(".data-list-container .title-row").text(Constants.TITLE_TEACHERS);
            updateTeachersList();
            break;
        case ResourceType.Resource:
            $(".data-list-container .title-row").text(Constants.TITLE_RESOURCES);
            updateResourcesList();
            break;
    }

}


function generateTableHeaders(type: ResourceType) {
    let headersHTML: string;
    switch (type) {
        case ResourceType.Course:
            headersHTML = `<th>${Constants.TH_DESC}</th><th>${Constants.TH_REF_YEAR}</th><th>${Constants.TH_RECURSIVE}</th><th></th>`;
            break;
        case ResourceType.Enrollment:
            headersHTML = `<th>${Constants.TH_APPLICANT}</th><th>${Constants.TH_COURSE}</th><th>${Constants.TH_ADMITTED}</th><th></th>`;
            break;
        case ResourceType.Teacher:
            headersHTML = `<th>${Constants.TH_RESOURCE}</th><th>${Constants.TH_COURSE}</th><th></th>`;
            break;
        case ResourceType.Resource:
            headersHTML = `<th>${Constants.TH_NAME}</th><th>${Constants.TH_SURNAME}</th><th>${Constants.TH_STATUS}</th><th></th>`;
            break;
    }

    $(".table-list thead tr").empty().append(headersHTML);
}



function onGetCourseSuccess(data: Course[], textStatus: string, jqXHR: JQuery.jqXHR) {
    if (data) {
        state.courses = data;
        data.forEach((item: Course) => {
            let cell1 = `<td>${item.Description}</td>`;
            let cell2 = `<td>${item.RefYear}</td>`;
            let cell3 = `<td>${item.IsPeriodic ? 'yes' : 'no'}</td>`;
            let cell4 = `<td class='details-link'> DETAILS </td>`;

            $(".table-list tbody").append(`<tr>${cell1}${cell2}${cell3}${cell4}</tr>`);
        });

        $(".data-list .table-list tbody tr .details-link").click((ev) => {
            let index = $(ev.target).parent().index();
            if (index >= 0 && index < data.length) {
                state.currentIdx = index;
                openDetail(data[index], ResourceType.Course);
            }
        });

    } else {
        showMessage("No courses found!");
    }
}

function onGetResourcesSuccess(data: Resource[], textStatus: string, jqXHR: JQuery.jqXHR) {
    if (data) {
        state.resources = data;
        data.forEach((item: Resource) => {
            let cell1 = `<td>${item.Name}</td>`;
            let cell2 = `<td>${item.Surname}</td>`;
            let cell3 = `<td>${item.Status}</td>`;
            let cell4 = `<td class='details-link'> DETAILS </td>`;

            $(".table-list tbody").append(`<tr>${cell1}${cell2}${cell3}${cell4}</tr>`);
        });

        $(".data-list .table-list tbody tr .details-link").click((ev) => {
            let index = $(ev.target).parent().index();
            if (index >= 0 && index < data.length) {
                state.currentIdx = index;
                openDetail(data[index], ResourceType.Resource);
            }
        });

    } else {
        showMessage("No resources found!");
    }
}

function onGetEnrollmentsSuccess(data: Enrollment[], textStatus: string, jqXHR: JQuery.jqXHR) {
    if (data) {
        state.enrollments = data;
        data.forEach((item: Enrollment) => {
            let cell1 = `<td>${toResourceString(item.Resource)}</td>`;
            let cell2 = `<td>${toCourseString(item.Course)}</td>`;
            let cell3 = `<td>${item.IsAdmitted ? 'yes' : 'no'}</td>`;
            let cell4 = `<td class='details-link'> DETAILS </td>`;

            $(".table-list tbody").append(`<tr>${cell1}${cell2}${cell3}${cell4}</tr>`);
        });

        $(".data-list .table-list tbody tr .details-link").click((ev) => {
            let index = $(ev.target).parent().index();
            if (index >= 0 && index < data.length) {
                state.currentIdx = index;
                openDetail(data[index], ResourceType.Enrollment);
            }
        });

    } else {
        showMessage("No Enrollment found!");
    }
}

function onGetTeachersSuccess(data: Teacher[], textStatus: string, jqXHR: JQuery.jqXHR) {
    if (data) {
        state.teachers = data;
        data.forEach((item: Teacher) => {
            let cell1 = `<td>${toResourceString(item.Resource)}</td>`;
            let cell2 = `<td>${toCourseString(item.Course)}</td>`;
            let cell3 = `<td class='details-link'> DETAILS </td>`;

            $(".table-list tbody").append(`<tr>${cell1}${cell2}${cell3}</tr>`);
        });

        $(".data-list .table-list tbody tr .details-link").click((ev) => {
            let index = $(ev.target).parent().index();
            if (index >= 0 && index < data.length) {
                state.currentIdx = index;
                openDetail(data[index], ResourceType.Teacher);
            }
        });

    } else {
        showMessage("No Teachers found!");
    }
}


function onInsertCourseSuccess(data: any, textStatus: string, jqXHR: JQuery.jqXHR) {
    updateCoursesList();
}

function onInsertResourceSuccess(data: any, textStatus: string, jqXHR: JQuery.jqXHR) {
    updateResourcesList();
}

function onInsertTeacherSuccess(data: any, textStatus: string, jqXHR: JQuery.jqXHR) {
    updateTeachersList();
}

function onInsertEnrollmentSuccess(data: any, textStatus: string, jqXHR: JQuery.jqXHR) {
    updateEnrollmentsList();
}

function onDeleteCourseSuccess(data: any, textStatus: string, jqXHR: JQuery.jqXHR) {
    closeDetail();
    updateCoursesList();
}

function onDeleteResourceSuccess(data: any, textStatus: string, jqXHR: JQuery.jqXHR) {
    closeDetail();
    updateResourcesList();
}

function onDeleteEnrollSuccess(data: any, textStatus: string, jqXHR: JQuery.jqXHR) {
    closeDetail();
    updateEnrollmentsList();
}

function onDeleteTeacherSuccess(data: any, textStatus: string, jqXHR: JQuery.jqXHR) {
    closeDetail();
    updateTeachersList();
}

function onUpdateCourseSuccess(data: any, textStatus: string, jqXHR: JQuery.jqXHR) {
    updateCoursesList();
}

function onUpdateResourceSuccess(data: any, textStatus: string, jqXHR: JQuery.jqXHR) {
    updateResourcesList();
}

function onUpdateEnrollSuccess(data: any, textStatus: string, jqXHR: JQuery.jqXHR) {
    updateEnrollmentsList();
}

function onUpdateTeacherSuccess(data: any, textStatus: string, jqXHR: JQuery.jqXHR) {
    updateTeachersList();
}

function clearList() {
    $(".table-list tbody").empty();
}

function onError(jqXHR: JQuery.jqXHR, textStatus: string, errorThrown: string) {
    showMessage(jqXHR.responseText);
}

function showMessage(error?: string) {
    let generic = "An error occurred!";
    if (error) {
        $(".error-msg-txt").text(error);
    } else {
        $(".error-msg-txt").text(generic);
    }

    $(".error-msg").show();

    $(".error-msg .close-btn").click(() => {
        $(".error-msg").fadeOut(400);
    });
}

function init() {
    state = new ViewState();
    generateTableHeaders(ResourceType.Course);
    updateCoursesList();
    $("section.data-list").first().addClass("full-view");
    $("section.data-list").first().removeClass("partial-view");
    $("section.data-detail").first().hide();
    $("section.data-insert").first().hide();
}

function updateCoursesList() {
    clearList();
    let cm = new ConnectionManager();
    cm.getCourses(onGetCourseSuccess, onError);
}

function updateResourcesList() {
    clearList();
    let cm = new ConnectionManager();
    cm.getResources(onGetResourcesSuccess, onError);
}

function updateEnrollmentsList() {
    clearList();
    let cm = new ConnectionManager();
    cm.getEnrollments(onGetEnrollmentsSuccess, onError);
}

function updateTeachersList() {
    clearList();
    let cm = new ConnectionManager();
    cm.getTeachers(onGetTeachersSuccess, onError);
}

function generateDetailTemplate(type: ResourceType) {


    let htmlStr = "";
    switch (type) {
        case ResourceType.Course:
            htmlStr += `
                <div class="det-row"><div>${Constants.DETROW_COURSEID}</div><div></div></div>
                <div class="det-row"><div>${Constants.DETROW_DESCRIPTION}</div><div></div></div>
                <div class="det-row"><div>${Constants.DETROW_REFYEAR}</div><div></div></div>
                <div class="det-row"><div>${Constants.DETROW_STARTDATE}</div><div></div></div>
                <div class="det-row"><div>${Constants.DETROW_ENDDATE}</div><div></div></div>
                <div class="det-row"><div>${Constants.DETROW_RECURSIVE}</div><div></div></div>
                <div class="det-row"><div>${Constants.DETROW_COORDINATOR}</div><div></div></div>`
            break;
        case ResourceType.Resource:
            htmlStr += `
                <div class="det-row"><div>${Constants.DETROW_RESOURCEID}</div><div></div></div>
                <div class="det-row"><div>${Constants.DETROW_USERNAME}</div><div></div></div>
                <div class="det-row"><div>${Constants.DETROW_SURNAME}</div><div></div></div>
                <div class="det-row"><div>${Constants.DETROW_NAME}</div><div></div></div>
                <div class="det-row"><div>${Constants.DETROW_STATUS}</div><div></div></div>`
            break;
        case ResourceType.Teacher:
            htmlStr += `
                <div class="det-row"><div>${Constants.DETROW_TEACHERID}</div><div></div></div>
                <div class="det-row"><div>${Constants.DETROW_RESOURCE}</div><div></div></div>
                <div class="det-row"><div>${Constants.DETROW_COURSE}</div><div></div></div>
                <div class="det-row"><div>${Constants.DETROW_NOTES}</div><div></div></div>`
            break;
        case ResourceType.Enrollment:
            htmlStr += `
                <div class="det-row"><div>${Constants.DETROW_ENROLLID}</div><div></div></div>
                <div class="det-row"><div>${Constants.DETROW_RESOURCE}</div><div></div></div>
                <div class="det-row"><div>${Constants.DETROW_LEADER}</div><div></div></div>
                <div class="det-row"><div>${Constants.DETROW_COURSE}</div><div></div></div>
                <div class="det-row"><div>${Constants.DETROW_STARTDATE}</div><div></div></div>
                <div class="det-row"><div>${Constants.DETROW_MAXENDDATE}</div><div></div></div>
                <div class="det-row"><div>${Constants.DETROW_ADMITTED}</div><div></div></div>
                <div class="det-row"><div>${Constants.DETROW_NOTES}</div><div></div></div>`
            break;


        default:
            break;
    }
    $(".data-detail .detail-rows").empty().append(htmlStr);
}

function openDetail(item: any, type: ResourceType) {

    $("section.data-insert").first().hide();
    $("section.data-list").first().addClass("partial-view");
    $("section.data-list").first().removeClass("full-view");

    generateDetailTemplate(type);

    //POPOLA DETTAGLIO  
    switch (type) {
        case ResourceType.Course:
            let course: Course = <Course>item;
            Object.keys(course).forEach((key, idx) => {
                let property = course[key];
                //convert properties to the end user
                if (property && (key === "StartDate" || key === "EndDate")) {
                    property = new Date(property).toLocaleDateString();
                }
                if (key === "Coordinator") {
                    let tmp = <Resource>property;
                    property = toResourceString(tmp);

                }
                if (key === "IsPeriodic") {
                    property = property ? "Yes" : "No";
                }
                $(".data-detail .det-row div:nth-child(2)").eq(idx).text(property !== null ? property : "-");
            });
            break;
        case ResourceType.Resource:
            let res = <Resource>item;
            Object.keys(res).forEach((key, idx) => {
                let property = res[key];
                $(".data-detail .det-row div:nth-child(2)").eq(idx).text(property !== null ? property : "-");
            });
            break;
        case ResourceType.Enrollment:
            let enroll = <Enrollment>item;
            Object.keys(enroll).forEach((key, idx) => {
                let property = enroll[key];
                //convert properties to the end user
                if (property && (key === "StartDate" || key === "MaxEndDate")) {
                    property = new Date(property).toLocaleDateString();
                }
                if (key === "Resource" || key === "ProjectLeader") {
                    let tmp = <Resource>property;
                    property = toResourceString(tmp);
                }
                if (key === "IsAdmitted") {
                    property = property ? "Yes" : "No";
                }
                if (key === "Course") {
                    property = toCourseString(property);
                }
                $(".data-detail .det-row div:nth-child(2)").eq(idx).text(property !== null ? property : "-");
            });
            break;
        case ResourceType.Teacher:
            let tchr = <Teacher>item;
            Object.keys(tchr).forEach((key, idx) => {
                let property = tchr[key];
                //convert properties to the end user
                if (key === "Resource") {
                    let tmp = <Resource>property;
                    property = toResourceString(tmp);
                }
                if (key === "Course") {
                    property = toCourseString(property);
                }
                $(".data-detail .det-row div:nth-child(2)").eq(idx).text(property !== null ? property : "-");
            });
            break;
    }

    $("section.data-detail").first().slideDown(300, () => {
        state.detail = true;
        state.isPartialList = true;
        state.prevOpenDetail = true;
    });
}

function closeDetail() {
    $("section.data-insert").first().hide();
    $("section.data-detail").first().slideUp(200, () => {
        $("section.data-list").first().addClass("full-view");
        $("section.data-list").first().removeClass("partial-view");
    });

    state.isPartialList = false;
    state.detail = false;


}

function openInsert(type: ResourceType) {
    $("section.data-insert .btn-save").val(Constants.BTN_INSERT);
    $("section.data-list").first().addClass("partial-view");
    $("section.data-list").first().removeClass("full-view");

    if (state.prevOpenDetail) { //if detail was opened
        $("section.data-detail").first().fadeOut(150, () => {
            showInsert(type);
        });
    } else {
        showInsert(type);
    }

    state.insert = true;
    state.isPartialList = true;
}


function showInsert(type: ResourceType) {
    $("section.data-insert").first().fadeIn(150);
    switch (type) {
        case ResourceType.Course:
            $(".course-data-entry").show();
            $(".resource-data-entry").hide();
            $(".enroll-data-entry").hide();
            $(".teacher-data-entry").hide();
            break;
        case ResourceType.Resource:
            $(".course-data-entry").hide();
            $(".resource-data-entry").show();
            $(".enroll-data-entry").hide();
            $(".teacher-data-entry").hide();
            break;
        case ResourceType.Enrollment:
            $(".course-data-entry").hide();
            $(".resource-data-entry").hide();
            $(".enroll-data-entry").show();
            $(".teacher-data-entry").hide();
            break;
        case ResourceType.Teacher:
            $(".course-data-entry").hide();
            $(".resource-data-entry").hide();
            $(".enroll-data-entry").hide();
            $(".teacher-data-entry").show();
            break;
    }
}

function closeInsert() {
    $("section.data-list").first().addClass("partial-view");
    $("section.data-list").first().removeClass("full-view");

    $("section.data-insert").first().fadeOut(150, () => {
        $("section.data-detail").first().fadeIn(150);
        state.detail = true;
        state.isPartialList = true;
        state.insert = false;
    });
}

function openEdit(resourceIdx: number, type: ResourceType) {
    showInsert(type);
    $("section.data-insert .btn-save").val(Constants.BTN_UPDATE);
    switch (type) {
        case ResourceType.Course:
            let course = state.courses[resourceIdx];
            $(".course-data-entry .input-description").first().val(course.Description);
            //need to be in format yyyy-mm-dd to be set
            if (course.StartDate) {
                $(".course-data-entry input[name=start-date]").first().val(dateToYMD(new Date(course.StartDate)));
            }
            if (course.EndDate) {
                $(".course-data-entry input[name=end-date]").first().val(dateToYMD(new Date(course.EndDate)));
            }
            $(".course-data-entry input[name=ref-year]").first().val(course.RefYear.toString());
            $(".course-data-entry input[name=coordinator]").first().val(course.Coordinator.Username);
            $(".course-data-entry input[name=is-recursive]").filter(`[value="${course.IsPeriodic}"]`).prop("checked", "true");
            break;
        case ResourceType.Resource:
            let resource = state.resources[resourceIdx];
            $(".resource-data-entry input[name=res-id]").first().val(resource.Id.toString());
            $(".resource-data-entry input[name=name]").first().val(resource.Name);
            $(".resource-data-entry input[name=surname]").first().val(resource.Surname);
            $(".resource-data-entry select").first().val(resource.Status);
            break;
        case ResourceType.Teacher:
            let teacher = state.teachers[resourceIdx];
            $(".teacher-data-entry .input-description").first().val(teacher.Notes);
            $(".teacher-data-entry input[name=course]").first().val(teacher.Course.Id.toString());
            $(".teacher-data-entry input[name=teacher]").first().val(teacher.Resource.Username);
            break;
        case ResourceType.Enrollment:
            let enroll = state.enrollments[resourceIdx];
            $(".enroll-data-entry .input-description").first().val(enroll.Notes);
            //need to be in format yyyy-mm-dd to be set
            if (enroll.StartDate) {
                $(".enroll-data-entry input[name=start-date]").first().val(dateToYMD(new Date(enroll.StartDate)));
            }
            $(".enroll-data-entry input[name=course]").first().val(enroll.Course.Id.toString());
            $(".enroll-data-entry input[name=applicant]").first().val(enroll.Resource.Username);
            $(".enroll-data-entry input[name=leader]").first().val(enroll.ProjectLeader.Username);
            $(".enroll-data-entry input[name=is-admitted]").filter(`[value="${enroll.IsAdmitted}"]`).prop("checked", "true");
            break;
        default:
            break;
    }

    $("section.data-detail").first().fadeOut(150, () => {
        $("section.data-insert").first().fadeIn(150);
    });

    state.insert = true;
    state.isPartialList = true;
}

function closeEdit() {

}

function insertOrUpdateData(type: ResourceType) {
    switch (type) {
        case ResourceType.Course:
            //read data from html
            let crsDescription = $(".course-data-entry .input-description").first().val().toString();
            let crsStartStr = $(".course-data-entry input[name=start-date]").first().val().toString();
            let crsEndStr = $(".course-data-entry input[name=end-date]").first().val().toString();
            let crsRefYearStr = $(".course-data-entry input[name=ref-year]").first().val().toString();
            let crsCoordinatorUsername = $(".course-data-entry input[name=coordinator]").first().val().toString();
            let crsIsRecursiveStr = $(".course-data-entry input[name=is-recursive]:checked").first().val();

            let crsError = false;
            let crsErrorMessage = "";
            //error handling
            if (!crsCoordinatorUsername || crsCoordinatorUsername === "") {
                crsError = true;
                crsErrorMessage = "Please provide a valid Username.";
            }
            if (!crsIsRecursiveStr || crsIsRecursiveStr === "") {
                crsError = true;
                crsErrorMessage = "Please provide a value for periodicity of the course.";
            }

            if (crsError) {
                showMessage(crsErrorMessage);
            } else {
                //convert Data
                let refYear = parseInt(crsRefYearStr);
                let isRecursive = (crsIsRecursiveStr === "yes") ? true : false;

                let resourceFake = new Resource(-1, crsCoordinatorUsername, "", "", "");
                let newCourse = new Course(-1, crsDescription, refYear, crsStartStr, crsEndStr, isRecursive, resourceFake);

                let cnm = new ConnectionManager();
                if (state.isCurrentInsert) {
                    cnm.insertCourse(newCourse, onInsertCourseSuccess, onError);
                } else {
                    newCourse.Id = state.courses[state.currentIdx].Id;
                    cnm.updateCourse(newCourse, onUpdateCourseSuccess, onError);
                }

            }
            break;
        case ResourceType.Resource:
            //read data from html
            let resIdStr = $(".resource-data-entry input[name=res-id]").first().val().toString();
            let resName = $(".resource-data-entry input[name=name]").first().val().toString();
            let resSurname = $(".resource-data-entry input[name=surname]").first().val().toString();
            let resStatusStr = $(".resource-data-entry select").first().val().toString();

            let resError = false;
            let resErrorMessage = "";
            //error handling
            if (!resIdStr || resIdStr === "") {
                resError = true;
                resErrorMessage = "Please provide a Resource identifier.";
            }
            if (!resName || resName === "") {
                resError = true;
                resErrorMessage = "Please provide a valid name.";
            }
            if (!resSurname || resSurname === "") {
                resError = true;
                resErrorMessage = "Please provide a valid surname.";
            }

            if (resError) {
                showMessage(resErrorMessage);
            } else {
                //convert Data
                let resID = parseInt(resIdStr);
                let newResource = new Resource(resID, "", resName, resSurname, resStatusStr);

                let cnm = new ConnectionManager();
                if (state.isCurrentInsert) {
                    cnm.insertResource(newResource, onInsertResourceSuccess, onError);
                } else {
                    cnm.updateResource(newResource, state.resources[state.currentIdx], onUpdateResourceSuccess, onError);
                }

            }
            break;
        case ResourceType.Teacher:
            //read data from html
            let tchrTeacher = $(".teacher-data-entry input[name=teacher]").first().val().toString();
            let tchrCourse = $(".teacher-data-entry input[name=course]").first().val().toString();
            let tchrNotes = $(".teacher-data-entry .input-description").first().val().toString();


            let tchrError = false;
            let tchrErrorMessage = "";
            //error handling
            if (!tchrTeacher || tchrTeacher === "") {
                tchrError = true;
                tchrErrorMessage = "Please provide a valid teacher username.";
            }

            if (tchrError) {
                showMessage(tchrErrorMessage);
            } else {
                //convert Data
                let tchrCourseID = parseInt(tchrCourse);
                let resourceFake = new Resource(-1, tchrTeacher, "", "", "");
                let courseFake = new Course(tchrCourseID, "", 0, "", "", false, resourceFake);
                let newTeacher = new Teacher(-1, resourceFake, courseFake, tchrNotes);

                let cnm = new ConnectionManager();
                if (state.isCurrentInsert) {
                    cnm.insertTeacher(newTeacher, onInsertTeacherSuccess, onError);
                } else {
                    newTeacher.Id = state.teachers[state.currentIdx].Id;
                    cnm.updateTeacher(newTeacher, onUpdateTeacherSuccess, onError);
                }

            }
            break;
        case ResourceType.Enrollment:
            //read data from html
            let enrlApplicant = $(".enroll-data-entry input[name=applicant]").first().val().toString();
            let enrlLeader = $(".enroll-data-entry input[name=leader]").first().val().toString();
            let enrlStartStr = $(".enroll-data-entry input[name=start-date]").first().val().toString();
            let enrlCourse = $(".enroll-data-entry input[name=course]").first().val().toString();
            let enrlNotes = $(".enroll-data-entry .input-description").first().val().toString();
            let enrlIsAdmitStr = $(".enroll-data-entry input[name=is-admitted]:checked").first().val();


            let enrlError = false;
            let enrlErrorMessage = "";
            //error handling
            if (!enrlApplicant || enrlApplicant === "") {
                enrlError = true;
                enrlErrorMessage = "Please provide a valid applicant username.";
            }
            if (!enrlLeader || enrlLeader === "") {
                enrlError = true;
                enrlErrorMessage = "Please provide a valid project leader username.";
            }
            if (!enrlIsAdmitStr || enrlIsAdmitStr === "") {
                enrlError = true;
                enrlErrorMessage = "Please provide a value for the admission of the enrollment.";
            }

            if (enrlError) {
                showMessage(enrlErrorMessage);
            } else {
                //convert Data
                let enrlIsAdmit = (enrlIsAdmitStr === "true") ? true : false;
                let enrlCourseID = parseInt(enrlCourse);
                let applicantFake = new Resource(-1, enrlApplicant, "", "", "");
                let leaderFake = new Resource(-1, enrlLeader, "", "", "");
                let courseFake = new Course(enrlCourseID, "", 0, "", "", false, applicantFake);
                let newEnroll = new Enrollment(-1, applicantFake, leaderFake, courseFake, enrlStartStr, "", enrlIsAdmit, enrlNotes);

                let cnm = new ConnectionManager();
                if (state.isCurrentInsert) {
                    cnm.insertEnrollment(newEnroll, onInsertEnrollmentSuccess, onError);
                } else {
                    newEnroll.Id = state.enrollments[state.currentIdx].Id;
                    cnm.updateEnrollment(newEnroll, onUpdateEnrollSuccess, onError);
                }

            }
            break;
    }
}

function deleteData(resIndex: number, type: ResourceType) {
    switch (type) {
        case ResourceType.Course:
            if (resIndex > -1) {
                let course: Course = state.courses[resIndex];
                let cnm = new ConnectionManager();
                cnm.deleteCourse(course, onDeleteCourseSuccess, onError);
            }
            break;
        case ResourceType.Enrollment:
            if (resIndex > -1) {
                let enroll: Enrollment = state.enrollments[resIndex];
                let cnm = new ConnectionManager();
                cnm.deleteEnrollment(enroll, onDeleteEnrollSuccess, onError);
            }
            break;
        case ResourceType.Resource:
            if (resIndex > -1) {
                let resource: Resource = state.resources[resIndex];
                let cnm = new ConnectionManager();
                cnm.deleteResource(resource, onDeleteResourceSuccess, onError);
            }
            break;
        case ResourceType.Teacher:
            if (resIndex > -1) {
                let teacher: Teacher = state.teachers[resIndex];
                let cnm = new ConnectionManager();
                cnm.deleteTeacher(teacher, onDeleteTeacherSuccess, onError);
            }
            break;
        default:
            break;
    }
}



function toResourceString(res: Resource): string {
    return res.Surname + " " + res.Name + " (" + res.Username + ")";
}

function toCourseString(res: Course): string {
    return res.RefYear + " - " + res.Description.substr(0, 30);
}


//utility function taken from internet to convert in the format yyyy-mm-dd
function dateToYMD(date) {
    var d = date.getDate();
    var m = date.getMonth() + 1; //Month from 0 to 11
    var y = date.getFullYear();
    return '' + y + '-' + (m <= 9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
}