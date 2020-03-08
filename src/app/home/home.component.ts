import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Quiz } from '../quiz.model';
import { QuizService } from '../quiz.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  quizzes: Quiz[];
  isLoading = false;
  message: string;
  reacted: Quiz[] = [];
  responseSubmitted = false;

  constructor(
    private quizService: QuizService
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.quizService.list()
      .subscribe({
        error: (e) => {
          this.isLoading = false;
          this.message = 'Failed to load questions. Please retry';
        },
        next: (quizzes) => {
          this.quizzes = quizzes;
          this.isLoading = false;
          this.message = undefined;
        }
      });
  }

  onRespond(f: NgForm) {
    if (this.reacted.length === 0) {
      return;
    }
    this.isLoading = true;
    this.quizService.respond(this.reacted)
    .subscribe({
      next: (res) => {
        this.isLoading = false;
        this.reacted = [];
        this.responseSubmitted = true;
      },
      error: (e) => {
        this.isLoading = false;
      }
    });
  }

  react(id: number, reaction: 'happy' | 'satisfied' | 'sad') {
    const added = this.reacted.find(q => q.id === + id);
    if (added) {
      this.reacted.splice(this.reacted.indexOf(added), 1);
    }
    let satisfied = 0;
    let happy = 0;
    let sad = 0;
    if (reaction === 'happy') {
      happy = 1;
    } else if (reaction === 'sad') {
      sad = 1;
    } else {
      satisfied = 1;
    }
    this.reacted.push({
      id,
      satisfied,
      happy,
      sad,
      question: ''
    });
  }

  isSelected(id: number, reaction: 'happy' | 'satisfied' | 'sad'): boolean {
    const item = this.reacted.find(i => i.id === +id);
    if (!item) {
      return false;
    }
    if (item[reaction] === 1) {
      return true;
    }
    return false;
  }

  again() {
    this.responseSubmitted = false;
  }

}
