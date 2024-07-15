import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainViewComponent } from './Views/main-view/main-view.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MainViewComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'MouseNote';
}
