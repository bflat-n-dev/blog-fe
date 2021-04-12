import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AllBlogsModel } from '../interfaces/all-blogs-model';
import { BlogService } from '../services/blog.service';

@Component({
  selector: 'app-all-blogs',
  templateUrl: './all-blogs.component.html',
  styleUrls: ['./all-blogs.component.scss']
})
export class AllBlogsComponent implements OnInit {

  allBlogs: AllBlogsModel = {
    sub: null,
    error: null,
    loading: false,
    items: [],
    totalBlogs: 0,
    totalPages: [],
    currentPage: 0
  }

  currentCategoryId: 'all';
  
  constructor(
    private _blogService: BlogService,
    private _route: ActivatedRoute
    ) { }
    
  ngOnInit(): void {

      this._route.params.subscribe((params) => {
        if( !params.categoryId ) {
          this.currentCategoryId = 'all';
        } else {
          this.currentCategoryId = params.categoryId;
        }
        this.getAllBlogs();
      });

      // this.categoryId = this._route.snapshot.paramMap.get('categoryId');
      // if( !this.categoryId ) {
      //   this.categoryId = 'all'
      // }
      // this.getAllBlogs();

  }

  getAllBlogs() {

    this.allBlogs.loading = true;
    this.allBlogs.error = null;
    
    this.allBlogs.sub = this._blogService.getAllBlogs(this.currentCategoryId)
    .subscribe((res:any) => {

      this.allBlogs.items = res.result;
      this.allBlogs.totalBlogs = res.totalBlogs;
      this.allBlogs.currentPage = res.currentPage;
      this.allBlogs.totalPages = Array(res.totalPages).fill(5).map((x,i)=>i);

      this.allBlogs.loading = false;
      this.allBlogs.sub.unsubscribe();

    }, err => {
      
      this.allBlogs.error = err;
      this.allBlogs.loading = false;
      this.allBlogs.sub.unsubscribe();

    })
  }

  changePage(page) {

    this.allBlogs.loading = true;
    this.allBlogs.error = null;

    this._blogService.getAllBlogs(this.currentCategoryId, page)
    .subscribe((res:any) => {

      this.allBlogs.items = res.result;
      this.allBlogs.totalBlogs = res.totalBlogs;
      this.allBlogs.currentPage = res.currentPage;
      this.allBlogs.totalPages = Array(res.totalPages).fill(5).map((x,i)=>i);

      this.allBlogs.loading = false;
      this.allBlogs.sub.unsubscribe();

    }, err => {
      
      this.allBlogs.error = err;
      this.allBlogs.loading = false;
      this.allBlogs.sub.unsubscribe();

    })
  }

}
