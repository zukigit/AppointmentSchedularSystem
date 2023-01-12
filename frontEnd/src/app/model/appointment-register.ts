import { Time } from "@angular/common";
import { Schdule } from "./schdule";
import { Team } from "./team";

export class AppointmentRegister {
    start_date : Date;
    end_date : Date;
    start_time : string;
    end_time : string;
    description : string;
    type : string;
    title : string;
    created_date:string;
    updated_date : Date;
    createUser : {employee_id:string};
    attached:FormData[] = [];
    listbox_key:string;
    employee:any=[];
    schedules:Schdule[]=[];

}
