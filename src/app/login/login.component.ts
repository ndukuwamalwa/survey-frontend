import { Component, OnInit } from '@angular/core';
import { QuizService } from '../quiz.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isLoading = false;
  message: string;

  constructor(
    private quizService: QuizService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  login(data: { username: string, password: string }) {
    this.isLoading = true;
    this.quizService.login(data)
      .subscribe({
        next: (res) => {
          this.isLoading = false;
          window.sessionStorage.setItem('token', res.token);
          this.router.navigate(['statistics']);
        },
        error: e => {
          this.isLoading = false;
          if (e.status === 401) {
            this.message = 'Invalid username or password.'
          } else {
            this.message = 'Problem loggin in';
          }
        }
      });
  }

}
