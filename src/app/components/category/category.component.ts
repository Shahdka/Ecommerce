import { Component, inject, OnInit } from '@angular/core';
import { SCategoryService } from '../../core/services/scategory.service';
import { ICategory } from '../../core/interface/icategory';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent implements OnInit{
  private readonly _SCategoryService=inject(SCategoryService)


  categories: ICategory[] = [];


  ngOnInit(): void {

    this._SCategoryService.getAllCategory().subscribe({
      next: (res) => {
        console.log(res);
        this.categories=res.data
      }
    })
    
  }
}
