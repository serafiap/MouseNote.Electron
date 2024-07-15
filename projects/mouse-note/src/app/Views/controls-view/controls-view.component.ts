import { Component, Input, OnInit } from '@angular/core';
import { PlayerControlService } from '../../Services/player-control.service';
import { SettingsService } from '../../Services/settings.service';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'controls-view',
  standalone: true,
  imports: [
    FormsModule,
    NgbModule 
  ],
  templateUrl: './controls-view.component.html',
  styleUrls: ['./controls-view.component.css']
})
export class ControlsViewComponent implements OnInit {

  @Input() num: number = 0;
  constructor(public playerControls: PlayerControlService, public settingsProvider: SettingsService) {

  }

  ngOnInit(): void {
  }

}
