import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.sass']
})
export class AuthComponent implements OnInit {
  authType: String = '';
  title: String = '';
  isSubmitting = false;
  authForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private userService: UserService,
              private fb: FormBuilder
              ){
                this.authForm = this.fb.group({
                  'username':['', Validators.required],
                  'password':['', Validators.required]
                });
              }

  ngOnInit() {
    this.route.url.subscribe(data => {
      this.authType = data[data.length - 1].path;
      this.title = (this.authType == 'signin') ? 'Sign In':'Sign Up';

      if (this.authType === 'signup'){
        this.authForm.addControl('email', new FormControl());
      }
    });
  }

  submitForm(){
    this.isSubmitting = true;
    const credentials = this.authForm.value;
    this.userService.attemptAuth(this.authType, credentials).subscribe(
      data => this.router.navigateByUrl('/'),
      err => {
        console.log("Sign Up/In error submit:", err)
      }
    );
  }
}
