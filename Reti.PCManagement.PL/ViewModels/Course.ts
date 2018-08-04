export class Course {
    Id: number;
    Description: string;
    RefYear: number;
    StartDate: Date;
    EndDate: Date;
    IsPeriodic: boolean;
    ResourceEntity: number; 

    constructor(id: number, desc: string, refYear: number, startD: Date, endD: Date, isPeriodic: boolean, resource: number) {
        this.Id = id;
        this.Description = desc;
        this.RefYear = refYear; 
        this.StartDate = startD;
        this.EndDate = endD;
        this.IsPeriodic = isPeriodic;
        this.ResourceEntity = resource; 
    }
}


//export class Coordinator{
//    Username: string = " ";
    
//}