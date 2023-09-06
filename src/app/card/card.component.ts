
import { Component, OnInit } from '@angular/core';
import { MainserviceService } from 'src/mainservice.service';
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  count: number = 0; 

  constructor(private mainserve:MainserviceService) { }

  ngOnInit(): void {
    this.mainserve.countData().subscribe(
      response => {
        this.count = response;
      },
      error => {
        console.error('Error retrieving count:', error);
      }
    );
  }

}
