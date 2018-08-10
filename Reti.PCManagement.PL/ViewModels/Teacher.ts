import { Resource } from "./Resource";
import { Course } from "./Course";

export class Teacher {

    public Id: number;
    public Resource: Resource;
    public Course: Course;
    public Notes: string;

    constructor(id: number, res: Resource, course: Course, notes: string) {
        this.Id = id;
        this.Resource = res;
        this.Course = course;
        this.Notes = notes;    
    }

}