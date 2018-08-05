import { Resource } from "./Resource";

export class Course {
    Id: number;
    Description: string;
    RefYear: number;
    StartDate: string | null; //string because Date can't be retrieved by webapi controller
    EndDate: string | null;  //string because Date can't be retrieved by webapi controller
    IsPeriodic: boolean;
    Coordinator: Resource; 

    constructor(id: number, desc: string, refYear: number, startD: string, endD: string, isPeriodic: boolean, coordinator: Resource) {
        this.Id = id;
        this.Description = desc;
        this.RefYear = refYear;
        this.StartDate = startD;
        this.EndDate = endD;
        this.IsPeriodic = isPeriodic;
        this.Coordinator = coordinator; 
    }
}