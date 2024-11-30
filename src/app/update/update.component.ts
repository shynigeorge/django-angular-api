import { Component, OnInit } from '@angular/core';
import { Student } from '../student';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from '../service/service.service';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update',
  standalone: true,
  imports: [FormsModule, CommonModule,],
  templateUrl: './update.component.html',
  styleUrl: './update.component.css'
})
export class UpdateComponent  implements OnInit{

 
  student: Student = { id: 0, name: '', age: 0, course: '' };  // Initialize with empty values
  errorMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private studentService: ServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const studentId = this.route.snapshot.paramMap.get('id');
    if (studentId) {
      this.studentService.getStudentById(+studentId).subscribe(
        (data) => {
          this.student = data;  // Populate the student data in the form
        },
        (error) => {
          console.error('Error fetching student data:', error);
          this.errorMessage = 'Student not found';
        }
      );
    }
  }

  updateStudent(): void {
    if (this.student.id) {
      this.studentService.updateStudent(this.student.id,this.student).subscribe(
        (response) => {
          console.log('Student updated successfully:', response);
          this.router.navigate(['/list']);  // Redirect after successful update
        },
        (error) => {
          console.error('Error updating student:', error);
          this.errorMessage = 'Error updating student';
        }
      );
    } else {
      console.error('Student ID is missing');
      this.errorMessage = 'Student ID is missing';
    }
  }

  
  }



