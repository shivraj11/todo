import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router, private auth: AuthService, public storage: StorageService) { }

  ngOnInit(): void {
  }

  logout(): void {
    this.auth.logout()
      .subscribe(data => console.log(data),
        error => {
          console.log(error);
        });
    this.router.navigate(['/']);
  }

}
