import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './services/auth/auth.service';
import { TodoService } from './services/todo/todo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    public auth: AuthService,
    private todoService: TodoService
  ) {
  }

  /**
   * ngOnInit
   */
  public ngOnInit(): void {
    this.auth.setupUsersList();
    this.todoService.setupTasksList();

  }

  isAuthenticated(): Observable<boolean> {
    return this.auth.user()
      .pipe(map(user => !!user));
  }

}
