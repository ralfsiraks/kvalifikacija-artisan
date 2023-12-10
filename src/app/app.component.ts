import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  encapsulation: ViewEncapsulation.Emulated,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    HeaderComponent,
    FooterComponent,
  ],
})
export class AppComponent {
  title = 'artisan';
}
