import { Component, VERSION } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HangmanComponent } from "./components/hangman/hangman.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HangmanComponent],
  template: `
    <app-hangman />
  `,
  styles: [`
        :host {
          text-align: center;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: url("https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/intermediary/f/61f7685f-47e5-49a0-b5cb-ca6b8cab4228/drok89-a7a2a550-ba87-40a6-9701-b635550d55b3.jpg");
          background-position: center center;
        }
      
    `]
})
export class AppComponent {
  title = `Hangman Game App - Angular ${VERSION.major}`;
}
