import { AuthService } from './../../core/services/auth.service';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { SCartService } from '../../core/services/scart.service';


@Component({
  selector: 'app-nav-balnk',
  standalone: true,
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './nav-balnk.component.html',
  styleUrl: './nav-balnk.component.scss'
})
export class NavBalnkComponent implements OnInit {
public  readonly _AuthService =inject(AuthService) 
private readonly _SCartService=inject(SCartService)
cartNUms:number=0
ngOnInit(): void {
  this._SCartService.getAllProductsInCart().subscribe({
    next:(res)=>{
      this._SCartService.cartNum.next(res.numOfCartItems)
    }
  })
  this._SCartService.cartNum.subscribe({
    next:(data)=> {
      this.cartNUms=data
    },
  })
}
}
