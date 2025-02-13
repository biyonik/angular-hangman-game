import { Component, input, output } from "@angular/core";

@Component({
    standalone: true,
    selector: "app-hangman-button",
    template: `
        <button
            class="Hangman-button"
            [disabled]="disabled()"
            (click)="outValue.emit(label())"
        >
            {{label()}}
        </button>
    `,
    styles: [`
  .Hangman-button {
    border: none;
    font-family: inherit;
    font-size: 1rem;
    cursor: pointer;
    width: 30px;
    margin: 5px 2px 2px 2px;
    letter-spacing: 1px;
    outline: none;
    background: #ffc107;
    color: #fff;
    box-shadow: 0 6px #ff9800;
    border-radius: 5px;
    padding-top: 4px;
  }
  
  .Hangman-button:hover {
    background-color: #ff9800;
  }
  
  .Hangman-button:disabled {
    background: #bdbdbd;
    color: #eeeeee;
    box-shadow: 0 6px #9e9e9e;
  }    
    `]
})
export class HangmanButtonComponent {
    label = input.required<string>();
    disabled = input<boolean>(false);
    outValue = output<string>();
}