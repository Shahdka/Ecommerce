import { NgClass } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CheckorderService } from '../../core/services/checkorder.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [ReactiveFormsModule,NgClass],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit {
  private readonly _FormBuilder=inject(FormBuilder)
  private readonly _ActivatedRoute=inject(ActivatedRoute)
  private readonly CheckorderService=inject(CheckorderService) 
  private readonly _ToastrService=inject(ToastrService)
    orderId :string|null= ''
  orderInfo:FormGroup=this._FormBuilder.group({
    details:[null,[Validators.required]],
    phone:[null,[Validators.required,Validators.pattern(/^(01)[0125][0-9]{8}$/)]],
    city:[null,[Validators.required]]
  })
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next:(parm)=>{
        this.orderId= parm.get('id')
      }
    })
  }
  SubmitOrder():void{
    console.log(this.orderInfo.value);
      this.CheckorderService.checkOutOrder(this.orderId,this.orderInfo.value).subscribe({
        next:(res)=>{
          console.log(res);
          this._ToastrService.success(res.status,'Fresh Cart')
          if(res.status=='success'){
            window.open(res.session.url,"_self")
          }
          
        }
      })
  }

}
