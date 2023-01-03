import { Time } from "@angular/common";

export class AppointmentRegister {
    sDate : Date;
    eDate : Date;
    sTime : Time;
    eTime : Time;
    description : string;
    privacy : string;
    title : string;
    attachedment_file : File;
    update_date : Date;
    create_userId : string;
    type : string;
}
