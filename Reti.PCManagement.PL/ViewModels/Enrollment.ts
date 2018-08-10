import { Resource } from "./Resource";
import { Course } from "./Course";

export class Enrollment {
    
    public Id: number;
    public Resource: Resource;
    public ProjectLeader: Resource;
    public Course: Course;
    public StartDate: string | null;
    public MaxEndDate: string | null;
    public IsAdmitted: boolean;
    public Notes: string;

    constructor(id: number, res: Resource, leader: Resource, course: Course, startdate: string, endDate: string, admit: boolean, notes: string) {
        this.Id = id;
        this.Resource = res;
        this.ProjectLeader = leader;
        this.Course = course;
        this.StartDate = startdate;
        this.MaxEndDate = endDate;
        this.IsAdmitted = admit;
        this.Notes = notes;      
    }


}
