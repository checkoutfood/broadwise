import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { FlashMessagesService } from 'angular2-flash-messages';
import { ToastrService } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {Renderer2 } from '@angular/core';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})

export class CourseComponent implements OnInit {
  products: any;
  videos: any;
  videosTest: any;
course: any;

  name: String;
  product_id:String;
  img: String;
  price: 350;
  added: boolean;

//  @ViewChild('myDiv') myDiv: ElementRef;

constructor(public authService: AuthService,
    private router: Router, private flashMessage: FlashMessagesService,
    private toastr: ToastrService,
    private renderer: Renderer2) {
     }

  ngOnInit() {

    this.course = localStorage.getItem("navigateToCourseTarget");

this.authService.getIndividualCourseAllDetails(this.course).subscribe((data: any[]) =>{
  
this.videos = data;

});



    // this.videosTest = [
    //          {
    //         "name" : "How to sell yourself as a DBT PM or BA",
    //         "description": "Learn how to create your unique selling point and market yourself as as DBT professional",
    //         "author": "Ryan Mel",
    //         "content" : "<iframe src=\"https://player.vimeo.com/video/163231140\" frameborder=\"0\" allow=\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>"
                    
    //       },
    //       {
    //         "name" : "How to sell yourself as a DBT PM or BA",
    //         "description": "Learn how to create your unique selling point and market yourself as as DBT professional",
    //         "author": "Ryan Mel",
    //         "content" : "<iframe src=\"https://player.vimeo.com/video/163231140\" frameborder=\"0\" allow=\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>"
            
    //       }      
    //   ];

     
  }

  onEditProduct(product: any) {
    this.authService.storeProductData(product);
    this.router.navigate(['editproduct']);
  }
  onDeleteProduct(product: any) {
    this.authService.deleteProduct(product._id).subscribe(data => {
      if (data.success) {
        this.toastr.success('Successfully Deleted!', 'Delete!', {timeOut: 2000,});
        this.router.navigate(['/products']);
      } else {
        this.toastr.error('Something went wrong!', 'Error!', { timeOut: 2000, });
        this.router.navigate(['/products']);
      }
    });
  }

}
