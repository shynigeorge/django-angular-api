import { Component } from '@angular/core';
import { ServiceService } from '../service/service.service';
import { Student } from '../student';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './add.component.html',
  styleUrl: './add.component.css'
})
export class AddComponent {

  student: Student = { name: '', age: 0, course: '' };  // Initialize the student object
  successMessage: string = '';  // To store success message
  errorMessage: string = '';  // To store error message

  constructor(private studentService: ServiceService) {}

  // Method to handle form submission
  addStudent(): void {
    this.studentService.addStudent(this.student).subscribe(
      (newStudent: Student) => {
        this.successMessage = 'Student added successfully!';
        this.errorMessage = '';  // Clear any previous error message
        this.student = { name: '', age: 0, course: '' };  // Reset form after successful addition
      },
      (error) => {
        this.errorMessage = 'Failed to add student. Please try again later.';
        this.successMessage = '';  // Clear any previous success message
        console.error('Error adding student:', error);
      }
    );
  }

}
