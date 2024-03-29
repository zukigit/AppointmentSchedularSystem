import { Schdule } from "./schdule";
import { User } from "./user";

export class ShowAppointment {
    appointment_id:number;
    title:string;
    description:string;
    type:string;
    createUser:User;
    start_time:string;
    end_time:string;
    start_date:string;
    end_date:string;
    schedules:Schdule[];
    employee : User[]=[];
    files = [];
}
