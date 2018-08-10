﻿import { Course } from "../ViewModels/Course";
import { Resource } from "../ViewModels/Resource";
import { ConnectionManager } from "./ConnectionManager";
import { ViewState, ResourceType } from "./ViewState";
import { Constants } from "./Constants";


let state: ViewState;

$("document").ready(() => {

    init();

    //click handlers 
    $(".data-list .add-plus").click(() => {
        openInsert(state.resourceSelected);
    });

    $(".data-detail .close-x").click( () => {
        closeDetail();
    });

    $(".btn-edit").click( () => {
        state.isCurrentInsert = false;
        openEdit(state.currentIdx, state.resourceSelected);
    });

    $("section.data-insert .btn-save").click(() => {
        state.isCurrentInsert = true;
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
            break;
        case ResourceType.Teacher:
            $(".data-list-container .title-row").text(Constants.TITLE_TEACHERS);
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
            headersHTML = `<th>${Constants.TH_RESOURCE}</th><th>${Constants.TH_COURSE}</th><th>${Constants.TH_ADMITTED}</th><th></th>`;
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

function onInsertCourseSuccess(data: any, textStatus: string, jqXHR: JQuery.jqXHR) {
    updateCoursesList();
}

function onDeleteCourseSuccess(data: any, textStatus: string, jqXHR: JQuery.jqXHR) {
    closeDetail();
    updateCoursesList();
}

function onUpdateCourseSuccess(data: any, textStatus: string, jqXHR: JQuery.jqXHR) {
    updateCoursesList();
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
            // case aaa:
            // htmlStr += `
            //     <div class="det-row"><div>${Constants.DETROW_}</div><div></div></div>
            //     <div class="det-row"><div>${Constants.DETROW_}</div><div></div></div>
            //     <div class="det-row"><div>${Constants.DETROW_}</div><div></div></div>
            //     <div class="det-row"><div>${Constants.DETROW_}</div><div></div></div>
            //     <div class="det-row"><div>${Constants.DETROW_}</div><div></div></div>
            //     <div class="det-row"><div>${Constants.DETROW_}</div><div></div></div>
            //     <div class="det-row"><div>${Constants.DETROW_}</div><div></div></div>`
            // break;
    
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
    }

    $("section.data-detail").first().slideDown(300, () => {
        state.detail = true;
        state.isPartialList = true;
        state.prevOpenDetail = true;
    });
}

function closeDetail() {
    $("section.data-insert").first().hide();
    $("section.data-detail").first().slideUp(200,() => {
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
            showInsert();
        });
    } else {
        showInsert();
    }

    state.insert = true;
    state.isPartialList = true;
}


function showInsert() {
    $("section.data-insert").first().fadeIn(150);
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

function openEdit(resourceIdx: number,  type: ResourceType) {
    $("section.data-insert .btn-save").val(Constants.BTN_UPDATE);
    switch (type) {
        case ResourceType.Course:
            let course = state.courses[resourceIdx];
            $(".data-insert .input-description").first().val(course.Description);

            //need to be in format yyyy-mm-dd to be set
            if(course.StartDate) {
                $(".data-insert input[name=start-date]").first().val(dateToYMD(new Date(course.StartDate)));
            }
            if(course.EndDate) {
                $(".data-insert input[name=end-date]").first().val(dateToYMD(new Date(course.EndDate)));
            }
            $(".data-insert input[name=ref-year]").first().val(course.RefYear.toString());
            $(".data-insert input[name=coordinator]").first().val(course.Coordinator.Username);
            $(".data-insert input[name=is-recursive]").filter(`[value="${course.IsPeriodic}"]`).attr("checked", "true");
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

function closeEdit(){

}

function insertOrUpdateData(type: ResourceType) {
    switch (type) {
        case ResourceType.Course:
            //read data from html
            let description = $(".data-insert .input-description").first().val().toString();
            let startStr = $(".data-insert input[name=start-date]").first().val().toString();
            let endStr = $(".data-insert input[name=end-date]").first().val().toString();
            let refYearStr = $(".data-insert input[name=ref-year]").first().val().toString();
            let coordinatorUsername = $(".data-insert input[name=coordinator]").first().val().toString();
            let isRecursiveStr = $(".data-insert input[name=is-recursive]:checked").first().val();

            let error = false;
            let errorMessage = "";
            //error handling
            if (!coordinatorUsername || coordinatorUsername === "") {
                error = true;
                errorMessage = "Please provide a valid Username.";
            }
            if (!isRecursiveStr || isRecursiveStr === "") {
                error = true;
                errorMessage = "Please provide a value for periodicity of the course.";
            }

            if (error) {
                showMessage(errorMessage);
            } else {
                //convert Data
                let refYear = parseInt(refYearStr);
                let isRecursive = (isRecursiveStr === "yes") ? true : false;

                let resourceFake = new Resource(-1, coordinatorUsername, "", "", "");
                let newCourse = new Course(-1, description, refYear, startStr, endStr, isRecursive, resourceFake);

                let cnm = new ConnectionManager();
                if(state.isCurrentInsert) {
                    cnm.insertCourse(newCourse, onInsertCourseSuccess, onError);
                } else {
                    newCourse.Id = state.courses[state.currentIdx].Id;
                    newCourse.Coordinator.Id = state.courses[state.currentIdx].Coordinator.Id;
                    cnm.updateCourse(newCourse, onUpdateCourseSuccess, onError);
                }
              
            }
            break;
    }
}

function deleteData(resIndex: number, type: ResourceType) {
    switch (type) {
        case ResourceType.Course:
            if(resIndex > -1) {
                let course: Course = state.courses[resIndex];
                let cnm = new ConnectionManager();
                cnm.deleteCourse(course, onDeleteCourseSuccess , onError );
            }
            
            break;
        default:
            break;
    }
}



function toResourceString(res: Resource) : string {
    return res.Surname + " " + res.Name + " (" + res.Username + ")";
}


//utility function taken from internet to convert in the format yyyy-mm-dd
function dateToYMD(date) {
    var d = date.getDate();
    var m = date.getMonth() + 1; //Month from 0 to 11
    var y = date.getFullYear();
    return '' + y + '-' + (m<=9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
}