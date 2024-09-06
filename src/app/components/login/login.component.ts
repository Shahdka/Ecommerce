import { NgClass } from '@angular/common';
import { Component, inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,NgClass,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent  implements OnDestroy{
  private readonly _AuthService =inject(AuthService)
  private readonly _Router= inject(Router)
  private readonly _FormBuilder=inject(FormBuilder)
  private readonly _ToastrService= inject(ToastrService)
  isLoading:boolean=false
  AllDone:string= ""
  msError:string=''
  logSub !:Subscription

  loginForm:FormGroup=this._FormBuilder.group({
    email:[null, [Validators.required, Validators.email]],
    password:[null, [Validators.required,Validators.pattern(/^\w{6,}$/)]]
  })
  LogFormInfo(){
    console.log(this.loginForm.value);
    if( this.loginForm.valid){
      this.isLoading=true
      this.logSub= this._AuthService.getLogin(this.loginForm.value).subscribe({
        next:(res)=>(
          console.log(res),
          this._ToastrService.success(res.message,'Fresh cart'),
          this.isLoading=true,
          this.AllDone=res.message,
          localStorage.setItem('token', res.token),
          
          this._AuthService.DataToken(),
          setTimeout(()=>{
            this._Router.navigate(['/home']);
          },2000)
        ),
        error:(err:HttpErrorResponse)=>(
          console.log(err),
          this.isLoading=false,
          this.msError=err.error.message
        )
      })
    }
    
    this.isLoading=false
  }

  ngOnDestroy(): void {
    this.logSub?.unsubscribe()
  }
}
