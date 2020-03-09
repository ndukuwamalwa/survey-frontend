import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from '../quiz.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  id: number;
  question: string;
  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private quizService: QuizService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (!params || !params.id || !params.q) {
        this.router.navigate(['statistics']);
        return;
      }
      this.id = +params.id;
      this.question = params.q;
    });
  }

  save() {
    this.isLoading = true;
    this.quizService.update(this.id, this.question)
    .subscribe(res => {
      this.isLoading = false;
      this.router.navigate(['statistics']);
    }, e => {
      this.isLoading = false;
    });
  }

  delete() {
    this.isLoading = true;
    this.quizService.delete(this.id)
    .subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['statistics']);
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

}
