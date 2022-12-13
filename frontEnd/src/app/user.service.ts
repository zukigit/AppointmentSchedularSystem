import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  department(){
    return [
      {department_id:"02",department_name:"HR/Admin"},
    {department_id:"03",department_name:"PMO"},
    {department_id:"04",department_name:"SDQC"},
    {department_id:"05",department_name:"Offshore Dept1"},
    {department_id:"06",department_name:"Offshore Dept2"},
    {department_id:"07",department_name:"SSD"},
    {department_id:"08",department_name:"Local"},
    {department_id:"09",department_name:"Common Infra"} 
    ]
}

team(){
  return[
    {team_id:"001",team_name:"Finance",department_id:"01"},
    {team_id:"002",team_name:"HR/Admin",department_id:"02"},
    {team_id:"003",team_name:"PMO",department_id:"03"},
    {team_id:"004",team_name:"SDQC",department_id:"04"},
    {team_id:"005",team_name:"DOT",department_id:"05"},
    {team_id:"006",team_name:"FPD",department_id:"05"},
    {team_id:"007",team_name:"Mark/Smart",department_id:"05"},
    {team_id:"008",team_name:"SNR-MF",department_id:"05"},
    {team_id:"009",team_name:"OSS",department_id:"06"},
    {team_id:"010",team_name:"KTS",department_id:"06"},
    {team_id:"011",team_name:"KNW21",department_id:"06"},
    {team_id:"012",team_name:"HIME",department_id:"06"},
    {team_id:"013",team_name:"MODOS",department_id:"06"},
    {team_id:"014",team_name:"Front",department_id:"07"},
    {team_id:"015",team_name:"Back",department_id:"07"},
    {team_id:"016",team_name:"Exchange",department_id:"07"},
    {team_id:"017",team_name:"CAI",department_id:"07"},
    {team_id:"018",team_name:"Aeon",department_id:"08"},
    {team_id:"019",team_name:"Toyota",department_id:"08"},
    {team_id:"020",team_name:"Infra",department_id:"09"},
    {team_id:"021",team_name:"NW",department_id:"09"},
    {team_id:"022",team_name:"Service Desk",department_id:"09"},
    {team_id:"023",team_name:"1st Line",department_id:"09"},
    {team_id:"024",team_name:"OMG",department_id:"09"}

  ]
}


  private baseUrl = `http://localhost:8080/api`;

  // public doRegisteration(register: User) {
  //   return this.http.post("http://localhost:8080/api", register, { responseType: 'text' as 'json' })
  // }

  getAllData(): Observable<any> {
    return this.http.get(`${this.baseUrl}/getAll`)
  }

  createUser(users: User):Observable<Object>{
    return this.http.post(`${this.baseUrl}`, users);
  }

  getStudentId(id: string): Observable<Object> {  
    return this.http.get(`${this.baseUrl}/student/${id}`);  
  }

  updateUser(data: any, id: string): Observable<any> {
    return this.http.patch(`${this.baseUrl}/updateUser/${id}`, data);
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/deleteUser/${id}`);
  }
}
