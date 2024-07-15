import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { SettingsViewComponent } from '../settings-view/settings-view.component';
import { TimeEntry } from '../../Models/time-entry';
import { DetailsService } from '../../Services/details.service';
import { DataService } from '../../Services/data.service';
import { PlayerControlService } from '../../Services/player-control.service';
import { DetailViewComponent } from '../detail-view/detail-view.component';
import { VideoPlayerComponent } from '../../Components/video-player/video-player.component';
import { DataCanvasComponent } from '../../Components/data-canvas/data-canvas.component';
import { SettingsService } from '../../Services/settings.service';
import { DataInfoBarComponent } from '../../Components/data-info-bar/data-info-bar.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbar, MatToolbarModule } from '@angular/material/toolbar';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ControlsViewComponent } from '../controls-view/controls-view.component';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'main-view',
  standalone: true,
  imports: [
    SettingsViewComponent, 
    DetailViewComponent, 
    ControlsViewComponent, 
    VideoPlayerComponent, 
    DataCanvasComponent,
    DataInfoBarComponent,
    MatMenuModule,
    MatToolbarModule,
    MatToolbar, 
    MatButton,
    NgbModule 
  ],
  templateUrl: './main-view.component.html',
  styleUrl: './main-view.component.scss'
})
export class MainViewComponent  implements OnInit {

  @ViewChild('canvasdiv', { static: true }) canvasDiv?: ElementRef<HTMLDivElement>;
  @ViewChild('videoPlayer', { static: true }) videoPlayer?: VideoPlayerComponent;
  @ViewChild('dataCanvas', { static: true }) dataCanvas?: DataCanvasComponent;
  dialogOpen: boolean = false;

  videoSource: any;
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    this.onKeyDown(event);
  }

  ngOnInit(): void {
    this.data.RetrieveStoredData();

    let i = setInterval(() => { if (this.videoPlayer) this.data.UpdateActiveTimes(this.videoPlayer.currentTime) }, 10)
    this.data.SetDataCanvas(this.dataCanvas);

  }
  constructor(
    public dialog: MatDialog,
    private sanitizer: DomSanitizer,
    public details: DetailsService,
    public data: DataService,
    public playerControls: PlayerControlService,
    public settingsProvider: SettingsService,
  ) {
  }

  createMockData() {
    this.data.timeEntries = []
    for (let index = 0; index < 1000; index++) {
      const element = 100;
      var st = 1200 * Math.random();
      let entry = new TimeEntry();
      entry.setValues(st, (st + 5 * Math.random()), index % 5, index % 3);
      this.data.timeEntries.push(entry);
    }
    this.data.StoreData();
  }

  openDetailsDialog() {
    this.dialogOpen = true;
    let dialogRef = this.dialog.open(DetailViewComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.dialogOpen = false;
    });
  }

  openControlsDialog() {
    this.dialogOpen = true;
    let dialogRef = this.dialog.open(ControlsViewComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.dialogOpen = false;
    });
  }
  openSettingsDialog() {
    this.dialogOpen = true;
    let dialogRef = this.dialog.open(SettingsViewComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.dialogOpen = false;
    });
  }

  loadVideo(target: any) {
    let files = (<HTMLInputElement>target).files;
    var URL = window.URL || window.webkitURL
    if (files == null) {
      return;
    }
    let file = files[0]
    var fileUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(file));
    this.videoSource = fileUrl;
  }
  onKeyDown(event: KeyboardEvent) {
    let key = event.key;

    if (key == " ") {
      key = "SPACE";
    }
    if (!this.dialogOpen && this.videoPlayer) {
      //Check hotkeys
      this.settingsProvider.checkHotkeys(key);
      //Mark datapoint
      this.details.registerKeyPress(key, this.videoPlayer.currentTime);
    }
  }
}
