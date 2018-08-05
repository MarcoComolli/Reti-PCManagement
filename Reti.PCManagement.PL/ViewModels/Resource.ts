export class Resource {

    Id: number;
    Username: string;
    Name: string;
    Surname: string;
    Status: string;

    constructor(id: number, username: string, name: string, surname: string, status: string) {
        this.Id = id;
        this.Username = username;
        this.Name = name;
        this.Surname = surname;
        this.Status = status;
    }

}