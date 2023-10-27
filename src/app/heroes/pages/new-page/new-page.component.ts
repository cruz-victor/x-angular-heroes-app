import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styleUrls: ['./new-page.component.css']
})
export class NewPageComponent implements OnInit {

  constructor(private heroesService:HeroesService,
    private activatedRoute:ActivatedRoute,
    private router:Router,
    private snackbar:MatSnackBar){
  }

  ngOnInit(): void {
    //When is pressed Create option then It does nothing
    if(!this.router.url.includes('edit')) return;

    //When is pressed Edit option next Retrieve Hero by its ID
    this.activatedRoute.params
    .pipe(
      switchMap(({id})=>this.heroesService.getHeroById(id))
    )
    .subscribe(hero=>{
      if (!hero) {
        return this.router.navigateByUrl('/');
      }

      this.heroForm.reset(hero);
      return;
    });

    throw new Error('Method not implemented.');
  }

  //Form's fields
  public heroForm=new FormGroup({
    id: new FormControl<string>(''),
    superhero: new FormControl<string>('',{nonNullable:true}),
    publisher: new FormControl<Publisher>(Publisher.DCComics),
    alter_ego: new FormControl(''),
    first_appearance: new FormControl(''),
    characters: new FormControl(''),
    alt_img: new FormControl(''),
  });

  public publishers=[
    {id:'DC Comics', desc:'DC-Comics'},
    {id:'Marvel Comics', desc:'Marvel Comics'}
  ];

  //Property Hero. It's get of from Form Hero
  get currentHero():Hero{
    const hero=this.heroForm.value as Hero;

    return hero;
  }

  //Submit is option to send from data. This method works with Create option and Edit option
  onSubmit():void{
    if (!this.heroForm.valid) return;

    //Update. It works when the option is update
    if(this.currentHero.id){
      this.heroesService.updateHero(this.currentHero)
      .subscribe(hero=>{
        //TODO: mostrar snackbar
        console.log('...update hero');
        this.showSnackbar(`${hero.superhero} updated!`)
      });

      return;
    }

    //Create. It works when the option is create
    this.heroesService.addHero(this.currentHero)
    .subscribe(hero=>{
      //TODO: mostrar snackbar
      console.log('...insert hero');
      this.router.navigate(['/heroes/edit', hero.id]);
      this.showSnackbar(`${hero.superhero} created!`);
    });

  }

  showSnackbar(message:string):void{
    this.snackbar.open(message, 'done', {duration:2500});
  }

}
