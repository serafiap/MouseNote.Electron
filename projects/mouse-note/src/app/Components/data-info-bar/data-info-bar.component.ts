import { Component, Input, OnInit } from '@angular/core';
import { DataService } from '../../Services/data.service';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'data-info-bar',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    CommonModule,
    NgbModule 
  ],
  templateUrl: './data-info-bar.component.html',
  styleUrls: ['./data-info-bar.component.css']
})
export class DataInfoBarComponent implements OnInit {

  @Input() currentTime: number = 0;
  constructor(public data: DataService) { }

  ngOnInit(): void {
  }
  adjustStart(){
    this.data.timeEntries[this.data.activeDataIndex].start = this.currentTime;
    if (this.data.timeEntries[this.data.activeDataIndex].start > this.data.timeEntries[this.data.activeDataIndex].end)
    {
      let start = this.data.timeEntries[this.data.activeDataIndex].start;
      this.data.timeEntries[this.data.activeDataIndex].start = this.data.timeEntries[this.data.activeDataIndex].end;
      this.data.timeEntries[this.data.activeDataIndex].end = start;
    }
    this.data.StoreData();
  }
  adjustEnd(){
    this.data.timeEntries[this.data.activeDataIndex].end = this.currentTime;
    if (this.data.timeEntries[this.data.activeDataIndex].start > this.data.timeEntries[this.data.activeDataIndex].end)
    {
      let start = this.data.timeEntries[this.data.activeDataIndex].start;
      this.data.timeEntries[this.data.activeDataIndex].start = this.data.timeEntries[this.data.activeDataIndex].end;
      this.data.timeEntries[this.data.activeDataIndex].end = start;
    }
    this.data.StoreData();
  }
  delete(){

  }
}
