import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  AbstractControl
} from '@angular/forms';

@Component({
  selector: 'app-reactive-form',
  imports: [],
  templateUrl: './reactive-form.component.html',
  styleUrl: './reactive-form.component.css'
})
export class ReactiveFormComponent {
  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
    this.handleValueChanges();
  }

  // =========================
  // INIT FORM
  // =========================
  initForm() {
    this.form = this.fb.group(
      {
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
        age: ['', [Validators.required, Validators.min(1)]],
        gender: ['male'],

        skills: this.fb.array([]),

        education: this.fb.array([this.createEducation()])
      },
      { validators: this.passwordMatchValidator }
    );
  }

  // =========================
  // GETTERS (clean code)
  // =========================
  get skills(): FormArray {
    return this.form.get('skills') as FormArray;
  }

  get education(): FormArray {
    return this.form.get('education') as FormArray;
  }

  // =========================
  // CUSTOM VALIDATOR
  // =========================
  passwordMatchValidator(group: AbstractControl) {
    const pass = group.get('password')?.value;
    const confirm = group.get('confirmPassword')?.value;

    return pass === confirm ? null : { mismatch: true };
  }

  // =========================
  // SKILLS (FormArray - simple)
  // =========================
  addSkill(skill: string) {
    if (!skill.trim()) return;
    this.skills.push(this.fb.control(skill));
  }

  removeSkill(index: number) {
    this.skills.removeAt(index);
  }

  // =========================
  // EDUCATION (FormArray - group)
  // =========================
  createEducation(): FormGroup {
    return this.fb.group({
      degree: ['', Validators.required],
      college: ['', Validators.required],
      year: ['', [Validators.required, Validators.min(2000)]]
    });
  }

  addEducation() {
    this.education.push(this.createEducation());
  }

  removeEducation(index: number) {
    this.education.removeAt(index);
  }

  // =========================
  // VALUE CHANGES
  // =========================
  handleValueChanges() {
    this.form.valueChanges.subscribe(value => {
      console.log('Form Changed:', value);
    });

    // Example: dynamic behavior
    this.form.get('age')?.valueChanges.subscribe(age => {
      if (age < 18) {
        alert('User is under 18');
      }
    });
  }

  // =========================
  // LOAD DUMMY DATA
  // =========================
  loadDummyData() {
    this.form.patchValue({
      name: 'Arpana',
      email: 'arpana@gmail.com',
      password: '123456',
      confirmPassword: '123456',
      age: 25,
      gender: 'female'
    });

    // Clear existing arrays
    this.skills.clear();
    this.education.clear();

    // Add skills
    ['Angular', 'React', 'CSS'].forEach(skill => {
      this.skills.push(this.fb.control(skill));
    });

    // Add education
    this.education.push(
      this.fb.group({
        degree: 'BCA',
        college: 'XYZ College',
        year: 2022
      })
    );
  }

  // =========================
  // SUBMIT
  // =========================
  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    console.log('Final Form Data:', this.form.value);
    alert('Form Submitted Successfully!');
  }
}
