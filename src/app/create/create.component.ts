import { Component, OnInit } from '@angular/core';
import { Quiz } from '../quiz.model';
import { NgForm } from '@angular/forms';
import { QuizService } from '../quiz.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  quizzes: Quiz[] = [];
  isLoading = false;
  message: string;
  question = '';

  constructor(
    private quizService: QuizService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  add(form: NgForm) {
    const question: string = form.value.question;
    if (!question || question.trim().length === 0) {
      return;
    }
    const exists = this.quizzes.find(q => q.question.toLowerCase() === question.toLowerCase());
    if (exists) {
      return;
    }
    this.quizzes.unshift({
      question,
      id: null,
      satisfied: 0,
      happy: 0,
      sad: 0
    });
    form.reset();
  }

  remove(question: Quiz) {
    this.quizzes.splice(this.quizzes.indexOf(question), 1);
  }

  save() {
    this.isLoading = true;
    this.quizService.save(this.quizzes)
      .subscribe({
        next: (res) => {
          this.isLoading = false;
          this.quizzes = [];
          this.router.navigate(['statistics']);
        },
        error: (e) => {
          this.isLoading = false;
          this.message = 'Problem saving questions.';
        }
      });
  }

  edit(question: Quiz) {
    this.question = question.question;
    this.remove(question);
  }

}
