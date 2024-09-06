import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,NgClass],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnDestroy {

private readonly _FormBuilder=inject(FormBuilder)
  private readonly _AuthService=inject(AuthService)
  private readonly _Router = inject(Router)
  private readonly _ToastrService=inject(ToastrService)
  registerSub !:Subscription

  
  registerForm:FormGroup=this._FormBuilder.group({
    name:[null,[Validators.required,Validators.minLength(3),Validators.maxLength(20)]],
    email:[null,[Validators.required,Validators.email]],
    password:[null,[Validators.required,Validators.pattern(/^\w{6,}$/)]],
    rePassword:[null,[Validators.required]],
    phone:[null,[Validators.required,Validators.pattern(/^(01)[0125][0-9]{8}$/)]]
  },{validators:this.confirmPassword})
  

  msgErr:string='';
  isLoading:boolean=false;
  AllSuccess:boolean=false

  registerFormInfo(){
    this.isLoading=true
     if(this.registerForm.valid){
  
      this.registerSub = this._AuthService.gitRegister(this.registerForm.value).subscribe({
            next:(res)=>{
              
              console.log(res);
              if(res.message==='success'){
                this._ToastrService.success(res.message,'Fresh Cart')
                this.AllSuccess=true;
                setTimeout(()=>{
                  this._Router.navigate(['/login']);
                },2000)
  
                
              }
  
              this.isLoading=false
            },
            error:(err)=>{
  
              
              this.isLoading=false
            }
          
        })
      console.log(this.registerForm.value);
     }
    }

  confirmPassword(g:AbstractControl){
    if(g.get('password')?.value === g.get('rePassword')?.value){
      return null;
  }
  else{
     return {mismatch:true};
  }
}

ngOnDestroy(): void {
  this.registerSub?.unsubscribe()
}

}
