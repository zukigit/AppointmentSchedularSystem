import { Image } from "./image";
import { Team } from "./team";

export class User {
    employee_id?:string;
    name?:string;  
    password?:string;
    phone_number?:string;
    gender?:string;
    team_id?:string;
    role?:string;
    position?:string;
    department_name?:string
    team_name?:string;
    team ?: Team;
    userImage ?: Image;
}
