import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { StorageKeys } from 'src/app/services/storage/storage-keys.enum';
import { StorageService } from 'src/app/services/storage/storage.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public id: string;

  constructor(private router: Router, private authService: AuthService, public storage: StorageService) {
  }

  ngOnInit(): void {
    this.storage.get(StorageKeys.AuthUser).subscribe((val: any) => this.id = val.email);
  }
}
