import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SettingsService } from '../../Services/settings.service';

@Component({
  selector: 'app-settings-view',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
  ],
  templateUrl: './settings-view.component.html',
  styleUrl: './settings-view.component.scss'
})
export class SettingsViewComponent {
  
  constructor(public settingsProvider: SettingsService) { }

  ngOnInit(): void {
  }

}
