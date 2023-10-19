import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/hereos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Hero } from '../../interfaces/hero.interface';
import { delay, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-hero-page',
  templateUrl: './hero-page.component.html',
  styleUrls: ['./hero-page.component.css'],
})
export class HeroPageComponent implements OnInit {
  public hero?: Hero;

  constructor(
    private heroesService: HeroesService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // delay(3000);

    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.heroesService.getHeroeById(id))
        //switchMap((par) => this.heroesService.getHeroeById(par['id']))
      )
      .subscribe(hero => {
        if (!hero) return this.router.navigate(['/heroes/list']);
        this.hero = hero;
        console.log({ hero });
         return;
      });
  }

  goBack():void{
    this.router.navigateByUrl('/heroes/list');
  }
}
