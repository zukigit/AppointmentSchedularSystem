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
    attachedment_file : File;
    created_date:Date;
    updated_date : Date;
    createUser : {employee_id:string};
    attached:File[] = [];
    listbox_key:string;
    employee:any=[];
    schedules:Schdule[]=[];

}
