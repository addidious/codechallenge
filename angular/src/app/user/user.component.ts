import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: []
})
export class UserComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  openMenu(){
    const menuToggle = document.querySelector('.toggle');
    const showcase = document.querySelector('.showcase');
    menuToggle?.classList.toggle('active');
    showcase?.classList.toggle('active');
  }
}
