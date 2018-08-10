import { Course } from '../ViewModels/Course';
import { Resource } from '../ViewModels/Resource';

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


    public insertResources(res: Resource, onSuccess, onFail) {
        $.ajax({
            type: "POST",
            data: res, 
            url: this.apiPrefix + "Resources/Insert",
            success: onSuccess,
            error: onFail
        });
    }

    public updateResource(res: Resource, onSuccess, onFail) {
        $.ajax({
            type: "PUT",
            data: res, 
            url: this.apiPrefix + "Resources/Edit",
            success: onSuccess,
            error: onFail
        });
    }

    public deleteResourc(res: Resource, onSuccess, onFail) {
        $.ajax({
            type: "DELETE",
            data: res,
            url: this.apiPrefix + "Resources/Delete",
            success: onSuccess,
            error: onFail
        });
    }
}