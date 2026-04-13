import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-template-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './template-form.component.html',
  styleUrl: './template-form.component.css'
})
export class TemplateFormComponent {
  skillOptions = ['JavaScript', 'Angular', 'React', 'Node', 'Python'];
  levels = ['Beginner', 'Intermediate', 'Expert'];

  user = {
    name: '',
    email: '',
    phone: '',
    gender: '',
    address: '',
    dob: '',
    city: '',
    country: '',
    experience: 0,
    currentJobTitle: '',
    companyName: '',
    skills: [] as string[],
    primarySkillLevel: '',
    profilePhoto: null as File | null,
    resume: null as File | null
  };

  onSkillChange(event: Event) {
    const target = event.target as HTMLInputElement | null;
    if (!target) return;

    const skill = target.value;
    if (target.checked) {
      if (!this.user.skills.includes(skill)) this.user.skills.push(skill);
      return;
    }

    this.user.skills = this.user.skills.filter(s => s !== skill);
  }

  isSkillSelected(skill: string) {
    return this.user.skills.includes(skill);
  }

  onFileChange(event: Event, field: 'profilePhoto' | 'resume') {
    const target = event.target as HTMLInputElement | null;
    const file = target?.files?.[0] ?? null;
    this.user[field] = file;
  }

  onSubmit() {
    console.log({
      ...this.user,
      profilePhoto: this.user.profilePhoto?.name ?? null,
      resume: this.user.resume?.name ?? null
    });
  }

}
