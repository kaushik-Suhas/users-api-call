import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';

export interface ObtainedData {
  id: string;
  email: string;
  first_name: string;
  Last_name: string;
  avatar: any;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'api-call';

  displayedColumns: string[] = ['id', 'email', 'first_name', 'last_name', 'avatar'];
  constructor(private http: HttpClient) {}
  data = [];
  dataSource: MatTableDataSource<ObtainedData>;
  page: number = 1;

  ngOnInit() {
    this.fetchData();
  }

  ngOnChange() {
    this.fetchData();
  }

  fetchData() {
    this.data = [];
    this.http
      .get(`https://reqres.in/api/users?page=${this.page}`)
      .subscribe((response) => {
        response["data"].map(obtainedData => {
          this.data.push(obtainedData)
        })
        this.dataSource = new MatTableDataSource<ObtainedData>(this.data);
      });
  }

  yourPageChangeLogic($event){
   if($event.previousPageIndex < $event.pageIndex){
     this.page = this.page + 1;
   } else {
     this.page = this.page - 1;
   }
   this.fetchData();
  }
}
