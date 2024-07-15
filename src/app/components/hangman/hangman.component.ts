import { Component, computed, effect, Signal, signal } from "@angular/core";
import { HangmanButtonComponent } from "./hangman-button.component";
import { NgFor } from "@angular/common";
import { randomWord } from "../../data/words.data";

const img0 = '/images/0.jpg';
const img1 = '/images/1.jpg';
const img2 = '/images/2.jpg';
const img3 = '/images/3.jpg';
const img4 = '/images/4.jpg';
const img5 = '/images/5.jpg';
const img6 = '/images/6.jpg';

@Component({
    standalone: true,
    selector: "app-hangman",
    template: `
        <div class="Hangman">
            <h1>Hangman</h1>
            <img [src]="getCurrentImage()"/>
            <p class="Hangman-word">{{guessedWord()}}</p>
            @if (gameIsPlayable()) {
                <ng-container *ngFor="let button of generateButtons()">
                    <app-hangman-button
                        [label]="button.label"
                        [disabled]="button.disabled"
                        (outValue)="handleGuess($event)"
                    ></app-hangman-button>
                </ng-container>
            } @else {
                <button class="Hangman-play-again" (click)="handlePlayAgain()">
                    Play Again
                </button>
            }
        </div>
    `,
    styleUrls: ["./hangman.component.scss"],
    imports: [HangmanButtonComponent, NgFor],
})
export class HangmanComponent {
    maxWrong = signal<number>(6);
    numberOfWrong = signal<number>(0);
    images = signal<string[]>([img0, img1, img2, img3, img4, img5, img6]);
    answer = signal<string>(randomWord());
    guessed = signal<string[]>([]);
    incomingValue = signal<string>("");
    gameIsPlayable = signal<boolean>(true);

    constructor() {
        effect(() => {
            console.log("Answer: ", this.answer());
        })
    }

    handlePlayAgain() {
        this.answer.set(randomWord());
        this.numberOfWrong.set(0);
        this.guessed.set([]);
        this.gameIsPlayable.set(true);
    }

    getCurrentImage: Signal<string> = computed(() => {
        return this.images()[this.numberOfWrong()];
    });

    guessedWord = computed(() => {
        return this.answer()
            .split("")
            .map(ltr => (this.guessed().includes(ltr) ? ltr : "_"))
            .join("");
    });

    handleGuess(event: string) {
        const ltr = event;
        if (!this.guessed().includes(ltr)) {
            this.guessed.set([...this.guessed(), ltr]); 
            if (!this.answer().includes(ltr)) {
                this.numberOfWrong.set(this.numberOfWrong() + 1);
            }
        }

        if (this.guessedWord() === this.answer() || this.numberOfWrong() >= this.maxWrong()) {
            this.gameIsPlayable.set(false);
        }
    }

    generateButtons = computed(() => {
        return "abcdefghijklmnopqrstuvwxyz".split("").map(ltr => {
            return {
                label: ltr,
                disabled: this.guessed().includes(ltr) || this.numberOfWrong() >= this.maxWrong() || !this.gameIsPlayable(),
            };
        });
    });
}
