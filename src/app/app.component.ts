import { Component, VERSION } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: ``,
  styles: [':host { display: block; min-height: 100vh; padding: 0; margin: 0; }']
})
export class AppComponent {
  title = `Hangman Game App - Angular ${VERSION.major}`;
}
