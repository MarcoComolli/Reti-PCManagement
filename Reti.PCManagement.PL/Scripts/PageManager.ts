import { ViewState, ResourceType } from "./ViewState";
import { Constants } from "./Constants";
import { ResourcesManager } from "./ResourcesManager";
import { Utilities } from "./Utilities";
import { Course } from "../ViewModels/Course";
import { Resource } from "../ViewModels/Resource";
import { Enrollment } from "../ViewModels/Enrollment";
import { Teacher } from "../ViewModels/Teacher";

/**
 * Manages the state of the page showing and hiding the html of the 
 * web site's sections
 *
 * @export
 * @class PageManager
 */
export class PageManager {
    public state: ViewState;
    public resMng: ResourcesManager;

    constructor(state: ViewState) {
        this.state = state;
        this.resMng = new ResourcesManager(state, this);
    }


    /**
     * Initialize the state of the page and binds the events to the clickable parts
     *
     * @memberof PageManager
     */
    public initPage(): void {
        this.bindClickEvents();
        this.generateTableHeaders(ResourceType.Course);
        this.resMng.updateCoursesList();
        $("section.data-list").first().addClass("full-view");
        $("section.data-list").first().removeClass("partial-view");
        $("section.data-detail").first().hide();
        $("section.data-insert").first().hide();
    }

    /**
     * Generate dinamically the html headers of the table list based on the input ResourceType
     *
     * @param {ResourceType} type
     * @memberof PageManager
     */
    public generateTableHeaders(type: ResourceType): void {
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


    /**
     * Bind the clicks event to the static clickable elements of the page
     *
     * @memberof PageManager
     */
    public bindClickEvents(): void {

        $(".data-list .add-plus").click(() => {
            this.state.isCurrentInsert = true;
            this.openInsert(this.state.resourceSelected);
        });

        $(".data-detail .close-x").click(() => {
            this.closeDetail();
        });

        $(".btn-edit").click(() => {
            this.state.isCurrentInsert = false;
            this.openEdit(this.state.currentIdx, this.state.resourceSelected);
        });

        $("section.data-insert .btn-save").click(() => {
            this.resMng.insertOrUpdateData(this.state.resourceSelected);
        });

        $(".data-insert .close-x").click(() => {
            this.state.isCurrentInsert ? this.closeInsert() : this.closeEdit();
        });

        $("section.data-detail .btn-delete").click(() => {
            if (confirm("You're going to delete permanently the record, are you sure?")) {
                this.resMng.deleteData(this.state.currentIdx, this.state.resourceSelected);
            }
        });

        $(".menu-courses").click(() => {
            this.changeResourceView(ResourceType.Course);
        });

        $(".menu-teachers").click(() => {
            this.changeResourceView(ResourceType.Teacher);
        });

        $(".menu-enrollments").click(() => {
            this.changeResourceView(ResourceType.Enrollment);
        });

        $(".menu-resources").click(() => {
            this.changeResourceView(ResourceType.Resource);
        });

        $(".error-msg .close-btn").click(() => {
            this.hideMessage();
        });
    }


    /**
     * Generate the html code for the detail view based on ResourceType
     * @param {ResourceType} type
     * @memberof PageManager
     */
    public generateDetailTemplate(type: ResourceType) : void {
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

    /**
     * Close the data edit card
     *
     * @memberof PageManager
     */
    public closeEdit() : void {
        $("section.data-list").first().addClass("partial-view");
        $("section.data-list").first().removeClass("full-view");
    
        $("section.data-insert").first().fadeOut(150, () => {
            $("section.data-detail").first().fadeIn(150);
        });
    }

    /**
     * Open the edit data card and prefill the input section with the detail's data
     *
     * @param {number} resourceIdx
     * @param {ResourceType} type
     * @memberof PageManager
     */
    public openEdit(resourceIdx: number, type: ResourceType): void {
        $("section.data-insert .btn-save").val(Constants.BTN_UPDATE);
        switch (type) {
            case ResourceType.Course:
                let course = this.state.courses[resourceIdx];
                $(".course-data-entry .input-description").first().val(course.Description);
                //need to be in format yyyy-mm-dd to be set
                if (course.StartDate) {
                    $(".course-data-entry input[name=start-date]").first().val(Utilities.dateToYMD(new Date(course.StartDate)));
                }
                if (course.EndDate) {
                    $(".course-data-entry input[name=end-date]").first().val(Utilities.dateToYMD(new Date(course.EndDate)));
                }
                $(".course-data-entry input[name=ref-year]").first().val(course.RefYear.toString());
                $(".course-data-entry input[name=coordinator]").first().val(course.Coordinator.Username);
                $(".course-data-entry input[name=is-recursive]").filter(`[value="${course.IsPeriodic}"]`).prop("checked", "true");
                break;
            case ResourceType.Resource:
                let resource = this.state.resources[resourceIdx];
                $(".resource-data-entry input[name=res-id]").first().val(resource.Id.toString());
                $(".resource-data-entry input[name=name]").first().val(resource.Name);
                $(".resource-data-entry input[name=surname]").first().val(resource.Surname);
                $(".resource-data-entry select").first().val(resource.Status);
                break;
            case ResourceType.Teacher:
                let teacher = this.state.teachers[resourceIdx];
                $(".teacher-data-entry .input-description").first().val(teacher.Notes);
                $(".teacher-data-entry input[name=course]").first().val(teacher.Course.Id.toString());
                $(".teacher-data-entry input[name=teacher]").first().val(teacher.Resource.Username);
                break;
            case ResourceType.Enrollment:
                let enroll = this.state.enrollments[resourceIdx];
                $(".enroll-data-entry .input-description").first().val(enroll.Notes);
                //need to be in format yyyy-mm-dd to be set
                if (enroll.StartDate) {
                    $(".enroll-data-entry input[name=start-date]").first().val(Utilities.dateToYMD(new Date(enroll.StartDate)));
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
            this.showInsert(type);
        });
    }

    /**
     * Oper the detail view and fill it with the input item properties
     *
     * @param {*} item
     * @param {ResourceType} type
     * @memberof PageManager
     */
    public openDetail(item: any, type: ResourceType) : void {

        $("section.data-insert").first().hide();
        $("section.data-list").first().addClass("partial-view");
        $("section.data-list").first().removeClass("full-view");
    
        this.generateDetailTemplate(type);
        this.resMng.fillDetailWithData(item, type);
        
    
        $("section.data-detail").first().slideDown(300, () => {
            this.state.prevOpenDetail = true;
        });
    }


    /**
     * Open the insert data card based on input the resource type
     * 
     * @param {ResourceType} type
     * @memberof PageManager
     */
    public openInsert(type: ResourceType) : void {
        $("section.data-insert .btn-save").val(Constants.BTN_INSERT);
        $("section.data-list").first().addClass("partial-view");
        $("section.data-list").first().removeClass("full-view");
        $(this.state.selectedRow).removeClass("selected");
        $(".card-style form").trigger("reset");
    
        if (this.state.prevOpenDetail) { //if detail was opened
            $("section.data-detail").first().fadeOut(150, () => {
                this.showInsert(type);
            });
        } else {
            this.showInsert(type);
        }
    }

    /**
     * Show and hide the correct html portion of the insert card
     * based on the input resource type
     *
     * @private
     * @param {ResourceType} type
     * @memberof PageManager
     */
    private showInsert(type: ResourceType) : void {
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
    
        $("section.data-insert").first().fadeIn(150);
    }
    
    /**
     * Close the insert data card
     *
     * @memberof PageManager
     */
    public closeInsert() : void {
        $("section.data-insert").first().fadeOut(150, () => {
            $("section.data-list").first().addClass("full-view");
            $("section.data-list").first().removeClass("partial-view");
        });
    }

     /**
     * Close the detail data card
     *
     * @memberof PageManager
     */
    public closeDetail() : void {
        $(this.state.selectedRow).removeClass("selected");
        $("section.data-insert").first().hide();
        $("section.data-detail").first().slideUp(200, () => {
            $("section.data-list").first().addClass("full-view");
            $("section.data-list").first().removeClass("partial-view");
        });
    }

    /**
     * Hide error message
     *
     * @memberof PageManager
     */
    public hideMessage() : void{
        $(".error-msg").fadeOut(400);
    }
    
    /**
     * Show error message and set the error text based on the input error message
     *
     * @param {string} [error]
     * @memberof PageManager
     */
    public showMessage(error?: string) : void {
        let generic = "An error occurred!";
        if (error) {
            $(".error-msg-txt").text(error);
        } else {
            $(".error-msg-txt").text(generic);
        }
        $(".error-msg").show();
    }

    /**
     * Clear the displayed data list emptying the html table
     *
     * @memberof PageManager
     */
    public clearList() {
        this.hideMessage();
        $(".table-list tbody").empty();
    }
    

    /**
     * Return to the list view with the selected resourceType
     *
     * @param {ResourceType} type
     * @memberof PageManager
     */
    public changeResourceView(type: ResourceType) : void{
        this.state.resourceSelected = type;
    
        $("section.data-list").first().addClass("full-view");
        $("section.data-list").first().removeClass("partial-view");
        $("section.data-detail").first().hide();
        $("section.data-insert").first().hide();
    
        this.generateTableHeaders(type);
    
        switch (type) {
            case ResourceType.Course:
                $(".data-list-container .title-row").text(Constants.TITLE_COURSES);
                this.resMng.updateCoursesList();
                break;
            case ResourceType.Enrollment:
                $(".data-list-container .title-row").text(Constants.TITLE_ENROLL);
                this.resMng.updateEnrollmentsList();
                break;
            case ResourceType.Teacher:
                $(".data-list-container .title-row").text(Constants.TITLE_TEACHERS);
                this.resMng.updateTeachersList();
                break;
            case ResourceType.Resource:
                $(".data-list-container .title-row").text(Constants.TITLE_RESOURCES);
                this.resMng.updateResourcesList();
                break;
        }
    
    }
    

}