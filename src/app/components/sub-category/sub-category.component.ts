import { Component, inject, OnInit } from '@angular/core';
import { SCategoryService } from '../../core/services/scategory.service';
import { ActivatedRoute } from '@angular/router';
import { ICategory } from '../../core/interface/icategory';
import { ISubCategory } from '../../core/interface/isub-category';

@Component({
  selector: 'app-sub-category',
  standalone: true,
  imports: [],
  templateUrl: './sub-category.component.html',
  styleUrl: './sub-category.component.scss'
})
export class SubCategoryComponent implements OnInit{
private readonly _SCategoryService=inject(SCategoryService)
private readonly _ActivatedRoute=inject(ActivatedRoute)
id:string|null=''
subCategory:ISubCategory ={} as ISubCategory
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (p) => {
        this.id= p.get('cid');
      }
    })
    this._SCategoryService.getSubCategory(this.id).subscribe({
      next: (res) => {
        console.log(res);
        this.subCategory=res.data
      },
      error: (err) => {
        console.error(err);
      }
    })
  }
}
