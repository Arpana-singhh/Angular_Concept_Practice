import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';


@Component({
  selector: 'app-reactive-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reactive-form.component.html',
  styleUrl: './reactive-form.component.css'
})
export class ReactiveFormComponent implements OnInit {
  userForm!: FormGroup;

  skillOptions = ['JavaScript', 'Angular', 'React', 'Node', 'Python'];
  levels = ['Beginner', 'Intermediate', 'Expert'];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      gender: ['', Validators.required],
      address: ['', Validators.required],

      dob: ['', Validators.required],
      
      city: ['', Validators.required],
      country: ['', Validators.required],
      profilePhoto: [null],

      experience: [0, [Validators.required, Validators.min(0)]],
      currentJobTitle: [''],
      companyName: [''],

      skills: this.fb.array([]),
      primarySkillLevel: ['', Validators.required],

      resume: [null, Validators.required]
    });
  }

    get skills(): FormArray {
      return this.userForm.get('skills') as FormArray;
    }

    onSkillChange(event: any) {
    if (event.target.checked) {
      this.skills.push(this.fb.control(event.target.value));
    } else {
      const index = this.skills.controls.findIndex(
        x => x.value === event.target.value
      );
      this.skills.removeAt(index);
    }
  }

  onFileChange(event: any, field: string) {
    const file = event.target.files[0];
    if (file) {
      this.userForm.patchValue({
        [field]: file
      });
    }
  }

  onSubmit(){
    console.log(this.userForm.value);
  }
}
