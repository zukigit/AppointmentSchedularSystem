import { Time } from "@angular/common";

export class AppointmentRegister {
    sDate : Date;
    eDate : Date;
    sTime : number;
    eTime : number;
    description : string;
    type : string;
    title : string;
    attachedment_file : File;
    update_date : Date;
    create_userId : string;
    attached:File;
    listbox_key:string;
    listbox:any=[];
}
