import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/hereos.service';
import { Hero } from '../../interfaces/hero.interface';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.css'],
})
export class ListPageComponent implements OnInit {
  public heroes: Hero[] = [];

  constructor(private heroesService: HeroesService) {}

  ngOnInit(): void {
    this.heroesService
      .getHerores()
      .subscribe((heores) => (this.heroes = heores));
  }
}
