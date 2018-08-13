import { Course } from '../ViewModels/Course';
import { Resource } from '../ViewModels/Resource';
import { Enrollment } from '../ViewModels/Enrollment';
import { Teacher } from '../ViewModels/Teacher';
import { ResourcesManager } from './ResourcesManager';
import { Constants } from './Constants';

/**
 * Manage the requests sent to the webapi
 *
 * @export
 * @class ConnectionManager
 */
export class ConnectionManager {

    public apiPrefix = Constants.WEB_API_PREFIX;

    public getCourses(onSuccess, onFail, resMng: ResourcesManager) {
        $.ajax({
            type: "GET",
            url: this.apiPrefix + "Courses/GetAll",
            context: resMng,
            success: onSuccess,
            error: onFail
        }); 
    }


    public insertCourse(course: Course, onSuccess, onFail, resMng: ResourcesManager) {
        $.ajax({
            type: "POST",
            data: course, 
            url: this.apiPrefix + "Courses/Insert",
            context: resMng,
            success: onSuccess,
            error: onFail
        });
    }

    public updateCourse(course: Course, onSuccess, onFail, resMng: ResourcesManager) {
        $.ajax({
            type: "PUT",
            data: course, 
            url: this.apiPrefix + "Courses/Edit",
            context: resMng,
            success: onSuccess,
            error: onFail
        });
    }

    public deleteCourse(course: Course, onSuccess, onFail, resMng: ResourcesManager) {
        $.ajax({
            type: "DELETE",
            data: course,
            url: this.apiPrefix + "Courses/Delete",
            context: resMng,
            success: onSuccess,
            error: onFail
        });
    }

    public getResources(onSuccess, onFail, resMng: ResourcesManager) {
        $.ajax({
            type: "GET",
            url: this.apiPrefix + "Resources/GetAll",
            context: resMng,
            success: onSuccess,
            error: onFail
        }); 
    }


    public insertResource(res: Resource, onSuccess, onFail, resMng: ResourcesManager) {
        $.ajax({
            type: "POST",
            data: res, 
            url: this.apiPrefix + "Resources/Insert",
            context: resMng,
            success: onSuccess,
            error: onFail
        });
    }

    public updateResource(newRes: Resource, oldRes: Resource, onSuccess, onFail, resMng: ResourcesManager) {
        $.ajax({
            type: "PUT",
            data: JSON.stringify({newResource: newRes, oldResource: oldRes}), 
            contentType: "application/json",
            url: this.apiPrefix + "Resources/Edit",
            context: resMng,
            success: onSuccess,
            error: onFail
        });
    }

    public deleteResource(res: Resource, onSuccess, onFail, resMng: ResourcesManager) {
        $.ajax({
            type: "DELETE",
            data: res,
            url: this.apiPrefix + "Resources/Delete",
            context: resMng,
            success: onSuccess,
            error: onFail
        });
    }

    public getEnrollments(onSuccess, onFail, resMng: ResourcesManager) {
        $.ajax({
            type: "GET",
            url: this.apiPrefix + "Enrollments/GetAll",
            context: resMng,
            success: onSuccess,
            error: onFail
        }); 
    }


    public insertEnrollment(enroll: Enrollment, onSuccess, onFail, resMng: ResourcesManager) {
        $.ajax({
            type: "POST",
            data: enroll, 
            url: this.apiPrefix + "Enrollments/Insert",
            context: resMng,
            success: onSuccess,
            error: onFail
        });
    }

    public updateEnrollment(enroll: Enrollment, onSuccess, onFail, resMng: ResourcesManager) {
        $.ajax({
            type: "PUT",
            data: enroll, 
            url: this.apiPrefix + "Enrollments/Edit",
            context: resMng,
            success: onSuccess,
            error: onFail
        });
    }

    public deleteEnrollment(enroll: Enrollment, onSuccess, onFail, resMng: ResourcesManager) {
        $.ajax({
            type: "DELETE",
            data: enroll,
            url: this.apiPrefix + "Enrollments/Delete",
            context: resMng,
            success: onSuccess,
            error: onFail
        });
    }



    public getTeachers(onSuccess, onFail, resMng: ResourcesManager) {
        $.ajax({
            type: "GET",
            url: this.apiPrefix + "Teachers/GetAll",
            context: resMng,
            success: onSuccess,
            error: onFail
        }); 
    }


    public insertTeacher(tchr: Teacher, onSuccess, onFail, resMng: ResourcesManager) {
        $.ajax({
            type: "POST",
            data: tchr, 
            url: this.apiPrefix + "Teachers/Insert",
            context: resMng,
            success: onSuccess,
            error: onFail
        });
    }

    public updateTeacher(tchr: Teacher, onSuccess, onFail, resMng: ResourcesManager) {
        $.ajax({
            type: "PUT",
            data: tchr, 
            url: this.apiPrefix + "Teachers/Edit",
            context: resMng,
            success: onSuccess,
            error: onFail
        });
    }

    public deleteTeacher(tchr: Teacher, onSuccess, onFail, resMng: ResourcesManager) {
        $.ajax({
            type: "DELETE",
            data: tchr,
            url: this.apiPrefix + "Teachers/Delete",
            context: resMng,
            success: onSuccess,
            error: onFail
        });
    }
}