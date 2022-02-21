import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
homebgcolor = environment.homeBackgroundColor;

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

}
