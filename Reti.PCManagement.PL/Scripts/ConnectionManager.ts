import { Course } from '../ViewModels/Course';
import { Resource } from '../ViewModels/Resource';
import { Enrollment } from '../ViewModels/Enrollment';
import { Teacher } from '../ViewModels/Teacher';

export class ConnectionManager {

    public apiPrefix = "http://localhost:8888/API/";

    public getCourses(onSuccess, onFail) {
        $.ajax({
            type: "GET",
            url: this.apiPrefix + "Courses/GetAll",
            success: onSuccess,
            error: onFail
        }); 
    }


    public insertCourse(course: Course, onSuccess, onFail) {
        $.ajax({
            type: "POST",
            data: course, 
            url: this.apiPrefix + "Courses/Insert",
            success: onSuccess,
            error: onFail
        });
    }

    public updateCourse(course: Course, onSuccess, onFail) {
        $.ajax({
            type: "PUT",
            data: course, 
            url: this.apiPrefix + "Courses/Edit",
            success: onSuccess,
            error: onFail
        });
    }

    public deleteCourse(course: Course, onSuccess, onFail) {
        $.ajax({
            type: "DELETE",
            data: course,
            url: this.apiPrefix + "Courses/Delete",
            success: onSuccess,
            error: onFail
        });
    }

    public getResources(onSuccess, onFail) {
        $.ajax({
            type: "GET",
            url: this.apiPrefix + "Resources/GetAll",
            success: onSuccess,
            error: onFail
        }); 
    }


    public insertResource(res: Resource, onSuccess, onFail) {
        $.ajax({
            type: "POST",
            data: res, 
            url: this.apiPrefix + "Resources/Insert",
            success: onSuccess,
            error: onFail
        });
    }

    public updateResource(newRes: Resource, oldRes: Resource, onSuccess, onFail) {
        $.ajax({
            type: "PUT",
            data: {newResource: newRes, oldResource: oldRes}, 
            url: this.apiPrefix + "Resources/Edit",
            success: onSuccess,
            error: onFail
        });
    }

    public deleteResource(res: Resource, onSuccess, onFail) {
        $.ajax({
            type: "DELETE",
            data: res,
            url: this.apiPrefix + "Resources/Delete",
            success: onSuccess,
            error: onFail
        });
    }

    public getEnrollments(onSuccess, onFail) {
        $.ajax({
            type: "GET",
            url: this.apiPrefix + "Enrollments/GetAll",
            success: onSuccess,
            error: onFail
        }); 
    }


    public insertEnrollment(enroll: Enrollment, onSuccess, onFail) {
        $.ajax({
            type: "POST",
            data: enroll, 
            url: this.apiPrefix + "Enrollments/Insert",
            success: onSuccess,
            error: onFail
        });
    }

    public updateEnrollment(enroll: Enrollment, onSuccess, onFail) {
        $.ajax({
            type: "PUT",
            data: enroll, 
            url: this.apiPrefix + "Enrollments/Edit",
            success: onSuccess,
            error: onFail
        });
    }

    public deleteEnrollment(enroll: Enrollment, onSuccess, onFail) {
        $.ajax({
            type: "DELETE",
            data: enroll,
            url: this.apiPrefix + "Enrollments/Delete",
            success: onSuccess,
            error: onFail
        });
    }



    public getTeachers(onSuccess, onFail) {
        $.ajax({
            type: "GET",
            url: this.apiPrefix + "Teachers/GetAll",
            success: onSuccess,
            error: onFail
        }); 
    }


    public insertTeacher(tchr: Teacher, onSuccess, onFail) {
        $.ajax({
            type: "POST",
            data: tchr, 
            url: this.apiPrefix + "Teachers/Insert",
            success: onSuccess,
            error: onFail
        });
    }

    public updateTeacher(tchr: Teacher, onSuccess, onFail) {
        $.ajax({
            type: "PUT",
            data: tchr, 
            url: this.apiPrefix + "Teachers/Edit",
            success: onSuccess,
            error: onFail
        });
    }

    public deleteTeacher(tchr: Teacher, onSuccess, onFail) {
        $.ajax({
            type: "DELETE",
            data: tchr,
            url: this.apiPrefix + "Teachers/Delete",
            success: onSuccess,
            error: onFail
        });
    }
}