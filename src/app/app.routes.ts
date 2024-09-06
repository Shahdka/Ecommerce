import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { NotfoundedComponent } from './components/notfounded/notfounded.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { CartComponent } from './components/cart/cart.component';
import { CategoryComponent } from './components/category/category.component';
import { BrandsComponent } from './components/brands/brands.component';
import { authGuard } from './core/guards/auth.guard';
import { logedGuard } from './core/guards/loged.guard';
import { Detils1Component } from './components/detils1/detils1.component';
import { ForgetComponent } from './components/forget/forget.component';
import { AllordersComponent } from './components/allorders/allorders.component';
import { OrdersComponent } from './components/orders/orders.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { SpBrandComponent } from './components/sp-brand/sp-brand.component';
import { SubCategoryComponent } from './components/sub-category/sub-category.component';
export const routes: Routes = [
    {path:'',component:AuthLayoutComponent , canActivate:[logedGuard] ,children:[
        {path:'',redirectTo:'login',pathMatch:"full",title:'login'},
        {path:'login',component:LoginComponent,title:'login'},
        {path:'register',component:RegisterComponent,title:'registration'},
        {path:'forget',component:ForgetComponent,title:'forget Password'}
    ] },
    {path:'',component:BlankLayoutComponent,canActivate:[authGuard] ,children:[
        {path:'',redirectTo:'home',pathMatch:"full"},
        {path:'home',component:HomeComponent,title:'home'},
        {path:'product',component:ProductsComponent,title:'products'},
        {path:'cart',component:CartComponent,title:'cart'},
        {path:'category',component:CategoryComponent,title:"category"},
        {path:'brands',component:BrandsComponent,title:'brands'},
        {path:'details/:productId',component:Detils1Component,title:'details'},
        {path:'allorders',component:AllordersComponent,title:'all orders'},
        {path:'orders/:id',component:OrdersComponent,title:'orders'},
        {path:'wish',component:WishlistComponent,title:'wish list'},
        {path:'SPBrand/:Bid',component:SpBrandComponent,title:'specific Brand'},
        {path:'SPCategory/:cid',component:SubCategoryComponent,title:'specific category'},
    ]},
    {path:'**',component:NotfoundedComponent}
];
