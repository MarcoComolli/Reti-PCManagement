import { Course } from "../ViewModels/Course";
import { Resource } from "../ViewModels/Resource";
import { Teacher } from "../ViewModels/Teacher";
import { Enrollment } from "../ViewModels/Enrollment";

export class ViewState {
    public resourceSelected = ResourceType.Course;

    public prevOpenDetail = false;

    public currentIdx = -1; //current resource index

    public isCurrentInsert = false;

    public selectedRow: HTMLElement;

    public courses: Course[] = [];
    public resources: Resource[] = [];
    public teachers: Teacher[] = [];
    public enrollments: Enrollment[] = [];


}

export enum ResourceType {
    Course,
    Resource,
    Teacher,
    Enrollment
}