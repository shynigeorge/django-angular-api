import { Component, OnInit } from '@angular/core';
import { Student } from '../student';
import { ServiceService } from '../service/service.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-view',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './view.component.html',
  styleUrl: './view.component.css'
})
export class ViewComponent implements OnInit  {

  students: Student[] = [];  // To store the list of students
  errorMessage: string = '';  // To store any error message

  constructor(private studentService: ServiceService) {}

  ngOnInit(): void {
    this.studentService.getStudents().subscribe(
      (data: Student[]) => {
        this.students = data;  // Assign the fetched data to the students array
        this.errorMessage = '';
        console.log("sty",this.students)
      },
      (error) => {
        this.errorMessage = 'Failed to load students. Please try again later.';  // Handle error
        console.error('Error fetching students:', error);  // Log the error
      }
    );

    
  }


  deleteStudent(id: number): void {
    if (confirm('Are you sure you want to delete this student?')) {
      this.studentService.deleteStudent(id).subscribe(
        () => {
          console.log('Student deleted successfully');
          this.students = this.students.filter((student) => student.id !== id); // Update the list
        },
        (error) => console.error('Error deleting student', error)
      );
    }
  }

}
