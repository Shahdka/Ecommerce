import { NgClass } from '@angular/common';
import { Component, inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { log } from 'console';

@Component({
  selector: 'app-forget',
  standalone: true,
  imports: [ReactiveFormsModule,NgClass],
  templateUrl: './forget.component.html',
  styleUrl: './forget.component.scss'
})
export class ForgetComponent implements OnDestroy{
  private readonly _AuthService=inject(AuthService)
  private readonly _FormBuilder=inject(FormBuilder)
  private readonly _Router=inject(Router)

  step:number=1
  emailEndSub !:Subscription 
  CodeEndSub !:Subscription 
  NewPassEndSub !:Subscription 
  isLoading:boolean=false

  verifyEmail:FormGroup=this._FormBuilder.group({
    email:[null,[Validators.required,Validators.email]]
  })

  verifyCode:FormGroup=this._FormBuilder.group({
    resetCode:[null,[Validators.required,Validators.pattern(/^\d{6}$/)]]
  })


  resetPassword:FormGroup=this._FormBuilder.group({
    email:[null,[Validators.required,Validators.email]],
    newPassword:[null,[Validators.required,Validators.pattern(/^\w{6,}$/)]],
  })

  VerifyEmailStep1():void{
    this.isLoading=true
    this.emailEndSub = this._AuthService.SetVerifyEmail(this.verifyEmail.value).subscribe({
      next:(res)=>{
        if(res.statusMsg==="success"){
          this.step=2
          this.isLoading=false  
        }
      },
      error:(err)=>console.log(err)
    })
  }

  VerifyCodeStep2():void{
    this.isLoading=true
    
    this.CodeEndSub =this._AuthService.SetVerifyCode(this.verifyCode.value).subscribe({
      next:(res)=>{
        if( res.status ==='Success'){
          console.log(res);
          this.isLoading=false
          this.step=3
        }
      },
      error:(err)=>{
        console.log(err);
        
      }

    })
  }



 resetNewPasswordStep3():void{
  this.isLoading=true
  this.NewPassEndSub= this._AuthService.SetNewPassword(this.resetPassword.value).subscribe({
    next:(res)=>{
      console.log(res)
      
      localStorage.setItem('token',res.token)
      this._AuthService.DataToken()
      this.isLoading=false
      this._Router.navigate(['/home'])
    }
  })
 
 }






ngOnDestroy(): void {
  this.emailEndSub.unsubscribe()
  this.CodeEndSub.unsubscribe()
  this.NewPassEndSub.unsubscribe()

}
}
