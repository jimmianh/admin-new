import {Component, OnInit} from '@angular/core';
import { CategoriesService } from '../service/categories.service';
import {take} from "rxjs";

interface DataItem {
  name: string;
  age: number;
  address: string;
}

@Component({
  selector: 'app-categories-management-page',
  templateUrl: './categories-management-page.component.html',
  styleUrls: ['./categories-management-page.component.scss']
})
export class CategoriesManagementPageComponent implements OnInit{
  searchValue = '';
  visible = false;
  listCategories : any[] = [];
  constructor(private categoriesService: CategoriesService) {
  }
  listOfData: DataItem[] = [
    {
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park'
    },
    {
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park'
    },
    {
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park'
    },
    {
      name: 'Jim Red',
      age: 32,
      address: 'London No. 2 Lake Park'
    }
  ];
  listOfDisplayData = [...this.listOfData];

  reset(): void {
    this.searchValue = '';
    this.search();
  }

  search(): void {
    this.visible = false;
    this.listOfDisplayData = this.listOfData.filter((item: DataItem) => item.name.indexOf(this.searchValue) !== -1);
  }

  ngOnInit() : void {
    this.categoriesService.getCategoriesList().pipe(take(1)).subscribe(res => {
      console.log(res);
      this.listCategories = res
    });
  }
}
