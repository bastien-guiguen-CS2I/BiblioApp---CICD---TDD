import { Component, signal } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RessourceListComponent } from './components/ressource-list.component';

@Component({
  selector: 'app-root',
  imports: [HttpClientModule, RessourceListComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('BiblioFront');
}
