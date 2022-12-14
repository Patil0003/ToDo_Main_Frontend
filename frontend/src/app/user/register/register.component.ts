import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthServicesService } from '../../services/auth-services.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  signupForm: any = FormGroup;
  submitted = false;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private service: AuthServicesService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.createForm();
  }
  createForm() {
    this.signupForm = this.formBuilder.group({
      name: ['', Validators.required],
      mobile: ['', [Validators.required, Validators.minLength(10)]],
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  get f() {
    return this.signupForm.controls;
  }
  onImagechange(event: any) {
    const file = event.target.files[0];
    this.signupForm.patchValue({ image: file });
  }
  signup(form: any) {
    this.submitted = true;

    if (this.signupForm.invalid) {
      return;
    }
    this.service.signup(form).subscribe((response: any) => {
      console.log('signup', response);
      if (response.data) {
        this.toastr.success('User Register Successful!');
        this.router.navigate(['/login']);
      } else {
        this.toastr.error('Failed!');
      }
    });
  }
}
