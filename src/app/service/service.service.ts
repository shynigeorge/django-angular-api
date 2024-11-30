import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Student } from '../student';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {




  constructor(private http: HttpClient) {}

  private apiUrl = ' http://127.0.0.1:8000/students';
 

  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.apiUrl}/list`);
  }

  getStudentById(id: number): Observable<Student> {
    return this.http.get<Student>(`${this.apiUrl}/${id}/data`);
  }

  addStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(this.apiUrl, student);
  }

  updateStudent(id: number, student: Student): Observable<Student> {
    return this.http.put<Student>(`${this.apiUrl}/${id}/update`, student);
  }

  deleteStudent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}/delete`);
  }
}
