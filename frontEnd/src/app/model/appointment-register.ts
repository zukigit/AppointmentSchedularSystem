import { Time } from "@angular/common";

export class AppointmentRegister {
    start_date : Date;
    end_date : Date;
    start_time : number;
    end_time : number;
    description : string;
    type : string;
    title : string;
    attachedment_file : File;
    created_date:Date;
    updated_date : Date;
    create_userId : string;
    attached:File;
    listbox_key:string;
    listbox:any=[];
}
