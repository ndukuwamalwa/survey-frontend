import { Component, OnInit } from '@angular/core';
import { QuizService } from '../quiz.service';
import { Quiz } from '../quiz.model';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {
  isLoading = false;
  quizzes: Quiz[];
  message: string;
  totals: { happy: number, sad: number, satisfied: number };
  accoumulated: number;

  constructor(
    private quizService: QuizService
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.quizService.list()
      .subscribe(quizzes => {
        this.isLoading = false;
        this.quizzes = quizzes;
        this.message = undefined;
        this.computeTotals();
      }, e => {
        this.isLoading = false;
        this.message = 'Error loading questions';
      });
  }

  computeTotals() {
    if (!this.quizzes) {
      return;
    }
    const happies: number[] = [];
    const sads: number[] = [];
    const satisfieds: number[] = [];
    this.quizzes.forEach(q => {
      happies.push(q.happy);
      sads.push(q.sad);
      satisfieds.push(q.satisfied);
    });
    this.totals = {
      happy: happies.reduce((a, b) => a + b),
      sad: sads.reduce((a, b) => a + b),
      satisfied: satisfieds.reduce((a, b) => a + b)
    };
    this.accoumulated = this.totals.happy + this.totals.sad + this.totals.satisfied;
  }

}
