import { ResourceType, ViewState } from "./ViewState";
import { Course } from "../ViewModels/Course";
import { ConnectionManager } from "./ConnectionManager";
import { Enrollment } from "../ViewModels/Enrollment";
import { Teacher } from "../ViewModels/Teacher";
import { Resource } from "../ViewModels/Resource";
import { Utilities } from "./Utilities";
import { PageManager } from "./PageManager";


/**
 * Include all the logic and operations that are relative
 * to the data received from the server
 *
 * @export
 * @class ResourcesManager
 */
export class ResourcesManager {

    public state: ViewState;
    public pageManager: PageManager;

    constructor(state: ViewState, pageMng: PageManager) {
        this.state = state;
        this.pageManager = pageMng;
    }


     
    /**
     * Method that create the object to send to the webapi to update or inserting the
     * resource based on the input type
     *
     * @param {ResourceType} type
     * @memberof ResourcesManager
     */
    public insertOrUpdateData(type: ResourceType) : void {
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
                    this.pageManager.showMessage(crsErrorMessage);
                } else {
                    //convert Data
                    let refYear = parseInt(crsRefYearStr);
                    let isRecursive = (crsIsRecursiveStr === "true") ? true : false;
    
                    let resourceFake = new Resource(-1, crsCoordinatorUsername, "", "", "");
                    let newCourse = new Course(-1, crsDescription, refYear, crsStartStr, crsEndStr, isRecursive, resourceFake);
    
                    let cnm = new ConnectionManager();
                    if (this.state.isCurrentInsert) {
                        cnm.insertCourse(newCourse, this.onInsertCourseSuccess, this.onError, this);
                    } else {
                        newCourse.Id = this.state.courses[this.state.currentIdx].Id;
                        cnm.updateCourse(newCourse, this.onUpdateCourseSuccess, this.onError, this);
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
                } else if ( parseInt(resIdStr) < 0) {
                    resError = true;
                    resErrorMessage = "Please provide a positive Resource identifier.";
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
                    this.pageManager.showMessage(resErrorMessage);
                } else {
                    //convert Data
                    let resID = parseInt(resIdStr);
                    let newResource = new Resource(resID, "", resName, resSurname, resStatusStr);
    
                    let cnm = new ConnectionManager();
                    if (this.state.isCurrentInsert) {
                        cnm.insertResource(newResource, this.onInsertResourceSuccess, this.onError, this);
                    } else {
                        cnm.updateResource(newResource, this.state.resources[this.state.currentIdx], this.onUpdateResourceSuccess, this.onError, this);
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
                    this.pageManager.showMessage(tchrErrorMessage);
                } else {
                    //convert Data
                    let tchrCourseID = parseInt(tchrCourse);
                    let resourceFake = new Resource(-1, tchrTeacher, "", "", "");
                    let courseFake = new Course(tchrCourseID, "", 0, "", "", false, resourceFake);
                    let newTeacher = new Teacher(-1, resourceFake, courseFake, tchrNotes);
    
                    let cnm = new ConnectionManager();
                    if (this.state.isCurrentInsert) {
                        cnm.insertTeacher(newTeacher, this.onInsertTeacherSuccess, this.onError, this);
                    } else {
                        newTeacher.Id = this.state.teachers[this.state.currentIdx].Id;
                        cnm.updateTeacher(newTeacher, this.onUpdateTeacherSuccess, this.onError, this);
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
                    this.pageManager.showMessage(enrlErrorMessage);
                } else {
                    //convert Data
                    let enrlIsAdmit = (enrlIsAdmitStr === "true") ? true : false;
                    let enrlCourseID = parseInt(enrlCourse);
                    let applicantFake = new Resource(-1, enrlApplicant, "", "", "");
                    let leaderFake = new Resource(-1, enrlLeader, "", "", "");
                    let courseFake = new Course(enrlCourseID, "", 0, "", "", false, applicantFake);
                    let newEnroll = new Enrollment(-1, applicantFake, leaderFake, courseFake, enrlStartStr, "", enrlIsAdmit, enrlNotes);
    
                    let cnm = new ConnectionManager();
                    if (this.state.isCurrentInsert) {
                        cnm.insertEnrollment(newEnroll, this.onInsertEnrollmentSuccess, this.onError, this);
                    } else {
                        newEnroll.Id = this.state.enrollments[this.state.currentIdx].Id;
                        cnm.updateEnrollment(newEnroll, this.onUpdateEnrollSuccess, this.onError, this);
                    }
    
                }
                break;
        }
    }


    /**
     *  Create the object to send to the webapi for deletion
     *
     * @param {number} resIndex
     * @param {ResourceType} type
     * @memberof ResourcesManager
     */
    public deleteData(resIndex: number, type: ResourceType)  : void {
        switch (type) {
            case ResourceType.Course:
                if (resIndex > -1) {
                    let course: Course = this.state.courses[resIndex];
                    let cnm = new ConnectionManager();
                    cnm.deleteCourse(course, this.onDeleteCourseSuccess, this.onError, this);
                }
                break;
            case ResourceType.Enrollment:
                if (resIndex > -1) {
                    let enroll: Enrollment = this.state.enrollments[resIndex];
                    let cnm = new ConnectionManager();
                    cnm.deleteEnrollment(enroll, this.onDeleteEnrollSuccess, this.onError, this);
                }
                break;
            case ResourceType.Resource:
                if (resIndex > -1) {
                    let resource: Resource = this.state.resources[resIndex];
                    let cnm = new ConnectionManager();
                    cnm.deleteResource(resource, this.onDeleteResourceSuccess, this.onError, this);
                }
                break;
            case ResourceType.Teacher:
                if (resIndex > -1) {
                    let teacher: Teacher = this.state.teachers[resIndex];
                    let cnm = new ConnectionManager();
                    cnm.deleteTeacher(teacher, this.onDeleteTeacherSuccess, this.onError, this);
                }
                break;
            default:
                break;
        }
    }


    /**
     * Iterate over object properties to fill the detail view
     *
     * @param {*} item
     * @param {ResourceType} type
     * @memberof ResourcesManager
     */
    public fillDetailWithData(item: any, type: ResourceType) : void {
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
                        property = Utilities.toResourceString(tmp);
    
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
                        property = Utilities.toResourceString(tmp);
                    }
                    if (key === "IsAdmitted") {
                        property = property ? "Yes" : "No";
                    }
                    if (key === "Course") {
                        property = Utilities.toCourseString(property, false);
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
                        property = Utilities.toResourceString(tmp);
                    }
                    if (key === "Course") {
                        property = Utilities.toCourseString(property, false);
                    }
                    $(".data-detail .det-row div:nth-child(2)").eq(idx).text(property !== null ? property : "-");
                });
                break;
        }
    }



    public updateCoursesList(): void {
        this.pageManager.clearList();
        let cm = new ConnectionManager();
        cm.getCourses(this.onGetCourseSuccess, this.onError, this);
    }

    public updateResourcesList(): void {
        this.pageManager.clearList();
        let cm = new ConnectionManager();
        cm.getResources(this.onGetResourcesSuccess, this.onError, this);
    }

    public updateEnrollmentsList(): void {
        this.pageManager.clearList();
        let cm = new ConnectionManager();
        cm.getEnrollments(this.onGetEnrollmentsSuccess, this.onError, this);
    }

    public updateTeachersList(): void {
        this.pageManager.clearList();
        let cm = new ConnectionManager();
        cm.getTeachers(this.onGetTeachersSuccess, this.onError, this);
    }

    public onGetCourseSuccess(data: Course[], textStatus: string, jqXHR: JQuery.jqXHR, state: ViewState)   : void{
        if (data) {
            this.state.courses = data;
            data.forEach((item: Course) => {
                let cell1 = `<td>${item.Description}</td>`;
                let cell2 = `<td>${item.RefYear}</td>`;
                let cell3 = `<td>${item.IsPeriodic ? 'yes' : 'no'}</td>`;
                let cell4 = `<td class='details-link'><img src="./Resources/details-ico.png" alt="Details"></td>`;

                $(".table-list tbody").append(`<tr>${cell1}${cell2}${cell3}${cell4}</tr>`);
            });

            $(".data-list .table-list tbody tr .details-link").click((ev) => {
                let selectedTr = ($(ev.target).is("img")) ? $(ev.target).parent().parent() : $(ev.target).parent();
                if (this.state.selectedRow) {
                    $(this.state.selectedRow).removeClass("selected");
                }
                this.state.selectedRow = selectedTr.addClass("selected").get(0);
                let index = selectedTr.index();
                if (index >= 0 && index < data.length) {
                    this.state.currentIdx = index;
                    this.pageManager.openDetail(data[index], ResourceType.Course);
                }
            });

        } else {
            this.pageManager.showMessage("No courses found!");
        }
    }

    public onGetResourcesSuccess(data: Resource[], textStatus: string, jqXHR: JQuery.jqXHR) : void {
        if (data) {
            this.state.resources = data;
            data.forEach((item: Resource) => {
                let cell1 = `<td>${item.Name}</td>`;
                let cell2 = `<td>${item.Surname}</td>`;
                let cell3 = `<td>${item.Status}</td>`;
                let cell4 = `<td class='details-link'><img src="./Resources/details-ico.png" alt="Details"></td>`;

                $(".table-list tbody").append(`<tr>${cell1}${cell2}${cell3}${cell4}</tr>`);
            });

            $(".data-list .table-list tbody tr .details-link").click((ev) => {
                let selectedTr = ($(ev.target).is("img")) ? $(ev.target).parent().parent() : $(ev.target).parent();
                if (this.state.selectedRow) {
                    $(this.state.selectedRow).removeClass("selected");
                }
                this.state.selectedRow = selectedTr.addClass("selected").get(0);
                let index = selectedTr.index();
                if (index >= 0 && index < data.length) {
                    this.state.currentIdx = index;
                    this.pageManager.openDetail(data[index], ResourceType.Resource);
                }
            });

        } else {
            this.pageManager.showMessage("No resources found!");
        }
    }

    public onGetEnrollmentsSuccess(data: Enrollment[], textStatus: string, jqXHR: JQuery.jqXHR) : void {
        if (data) {
            this.state.enrollments = data;
            data.forEach((item: Enrollment) => {
                let cell1 = `<td>${Utilities.toResourceString(item.Resource)}</td>`;
                let cell2 = `<td>${Utilities.toCourseString(item.Course)}</td>`;
                let cell3 = `<td>${item.IsAdmitted ? 'yes' : 'no'}</td>`;
                let cell4 = `<td class='details-link'><img src="./Resources/details-ico.png" alt="Details"></td>`;

                $(".table-list tbody").append(`<tr>${cell1}${cell2}${cell3}${cell4}</tr>`);
            });

            $(".data-list .table-list tbody tr .details-link").click((ev) => {
                let selectedTr = ($(ev.target).is("img")) ? $(ev.target).parent().parent() : $(ev.target).parent();
                if (this.state.selectedRow) {
                    $(this.state.selectedRow).removeClass("selected");
                }
                this.state.selectedRow = selectedTr.addClass("selected").get(0);
                let index = selectedTr.index();
                if (index >= 0 && index < data.length) {
                    this.state.currentIdx = index;
                    this.pageManager.openDetail(data[index], ResourceType.Enrollment);
                }
            });

        } else {
            this.pageManager.showMessage("No Enrollment found!");
        }
    }

    public onGetTeachersSuccess(data: Teacher[], textStatus: string, jqXHR: JQuery.jqXHR) : void {
        if (data) {
            this.state.teachers = data;
            data.forEach((item: Teacher) => {
                let cell1 = `<td>${Utilities.toResourceString(item.Resource)}</td>`;
                let cell2 = `<td>${Utilities.toCourseString(item.Course)}</td>`;
                let cell3 = `<td class='details-link'><img src="./Resources/details-ico.png" alt="Details"></td>`;

                $(".table-list tbody").append(`<tr>${cell1}${cell2}${cell3}</tr>`);
            });

            $(".data-list .table-list tbody tr .details-link").click((ev) => {
                let selectedTr = ($(ev.target).is("img")) ? $(ev.target).parent().parent() : $(ev.target).parent();
                if (this.state.selectedRow) {
                    $(this.state.selectedRow).removeClass("selected");
                }
                this.state.selectedRow = selectedTr.addClass("selected").get(0);
                let index = selectedTr.index();
                if (index >= 0 && index < data.length) {
                    this.state.currentIdx = index;
                    this.pageManager.openDetail(data[index], ResourceType.Teacher);
                }
            });

        } else {
            this.pageManager.showMessage("No Teachers found!");
        }
    }


    public onInsertCourseSuccess(data: any, textStatus: string, jqXHR: JQuery.jqXHR) : void {
        this.updateCoursesList();
    }

    public onInsertResourceSuccess(data: any, textStatus: string, jqXHR: JQuery.jqXHR) : void {
        this.updateResourcesList();
    }

    public onInsertTeacherSuccess(data: any, textStatus: string, jqXHR: JQuery.jqXHR) : void {
        this.updateTeachersList();
    }

    public onInsertEnrollmentSuccess(data: any, textStatus: string, jqXHR: JQuery.jqXHR) : void {
        this.updateEnrollmentsList();
    }

    public onDeleteCourseSuccess(data: any, textStatus: string, jqXHR: JQuery.jqXHR) : void {
        this.pageManager.closeDetail();
        this.updateCoursesList();
    }

    public onDeleteResourceSuccess(data: any, textStatus: string, jqXHR: JQuery.jqXHR) : void {
        this.pageManager.closeDetail();
        this.updateResourcesList();
    }

    public onDeleteEnrollSuccess(data: any, textStatus: string, jqXHR: JQuery.jqXHR) : void{
        this.pageManager.closeDetail();
        this.updateEnrollmentsList();
    }

    public onDeleteTeacherSuccess(data: any, textStatus: string, jqXHR: JQuery.jqXHR) : void {
        this.pageManager.closeDetail();
        this.updateTeachersList();
    }

    public onUpdateCourseSuccess(data: any, textStatus: string, jqXHR: JQuery.jqXHR) : void {
        this.updateCoursesList();
    }

    public onUpdateResourceSuccess(data: any, textStatus: string, jqXHR: JQuery.jqXHR) : void {
        this.updateResourcesList();
    }

    public onUpdateEnrollSuccess(data: any, textStatus: string, jqXHR: JQuery.jqXHR) : void {
        this.updateEnrollmentsList();
    }

    public onUpdateTeacherSuccess(data: any, textStatus: string, jqXHR: JQuery.jqXHR) : void {
        this.updateTeachersList();
    }

    public onError(jqXHR: JQuery.jqXHR, textStatus: string, errorThrown: string) : void {
        this.pageManager.showMessage(jqXHR.responseText);
    }
}