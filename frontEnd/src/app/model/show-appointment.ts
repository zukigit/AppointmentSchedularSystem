import { type } from "os";
import { Schdule } from "./schdule";
import { User } from "./user";

export class ShowAppointment {

    title:string;
    description:string;
    type:string;
    createUser:User;
    schedules:Schdule[];


}
