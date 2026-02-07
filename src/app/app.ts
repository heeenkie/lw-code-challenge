import { Component, signal } from '@angular/core';
import { PlotComponent } from './plot/plot.component';

@Component({
  selector: 'app-root',
  imports: [PlotComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
