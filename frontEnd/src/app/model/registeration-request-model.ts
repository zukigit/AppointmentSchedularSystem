import { Image } from "./image";
import { Team } from "./team";

export class RegisterationRequestModel {
    employee_id:string;
    name:string;  
    password:string;
    phone_number:string;
    gender:string;
    team:Team;
    role:string;
    position:string;
    userImage ?: Image;
}
