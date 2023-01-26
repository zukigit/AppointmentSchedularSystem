import { Schdule } from "./schdule";
import { User } from "./user";

export class UpdateApp {
    appointment_id:number;
    description : string;
    type : string;
    title : string;
    created_date:string;
    isDeleted:boolean;
    employee : User[]=[];
    createUser : {employee_id:string};
    schedules:Schdule[]=[];
    files = [];
}
