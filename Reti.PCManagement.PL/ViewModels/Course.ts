import { Resource } from "./Resource";

export class Course {
    Id: number;
    Description: string;
    RefYear: number;
    StartDate: Date | null;
    EndDate: Date | null;
    IsPeriodic: boolean;
    Coordinator: Resource; 

    constructor(id: number, desc: string, refYear: number, startD: Date, endD: Date, isPeriodic: boolean, coordinator: Resource) {
        this.Id = id;
        this.Description = desc;
        this.RefYear = refYear;
        this.StartDate = startD;
        this.EndDate = endD;
        this.IsPeriodic = isPeriodic;
        this.Coordinator = coordinator; 
    }
}