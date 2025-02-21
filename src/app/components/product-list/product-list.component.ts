import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../common/product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  // templateUrl: './product-list-table.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {

  products: Product[] = [];
  currentCategoryId:number=1;
  searchMode:boolean=false;

  constructor(private productService: ProductService, private route:ActivatedRoute) {
  }

  ngOnInit(): void {
   this.route.paramMap.subscribe(()=>{
    this.listProducts();
   }) 
  }

  listProducts() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    if(this.searchMode){
      this.handleSearchProducts();
    }
    else{
      this.handleListProducts();
    }
  }
  
  handleSearchProducts()
  {
    const theKeyword = this.route.snapshot.paramMap.get('keyword')!;

    //now search the product from the given keyword
    this.productService.searchProducts(theKeyword).subscribe(
      data=>{
        this.products=data;
      }
    )
  }


  handleListProducts()
  {
      //check if "id" parameter is available
    const hasCategoryId: boolean=this.route.snapshot.paramMap.has('id');
    
    if(hasCategoryId){
     //get the "id" param string. convert string to a number using the "+" symbol
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
    }
    else
    {
      //not category id available ... default to category id 1
      this.currentCategoryId=1;
    }

    this.productService.getProductList(this.currentCategoryId).subscribe(
      data => {
        this.products = data;
      }
    )
  }
}
