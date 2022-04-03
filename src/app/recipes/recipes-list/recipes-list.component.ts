import { Component, OnInit } from '@angular/core';
import {Recipe} from "../recipe.model";

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe(
      'A test Recipe',
      'This is simpli test',
      'https://i.guim.co.uk/img/media/8bd1746d9f24327ba9fe23319d17cb4670c59c45/89_525_5165_3858/master/5165.jpg?width=1020&quality=45&auto=format&fit=max&dpr=2&s=e15ea593e8cb873132135d440067d6e3'),
    new Recipe(
      'A test risee',
      'This is simply test22',
      'https://i.guim.co.uk/img/media/8bd1746d9f24327ba9fe23319d17cb4670c59c45/89_525_5165_3858/master/5165.jpg?width=1020&quality=45&auto=format&fit=max&dpr=2&s=e15ea593e8cb873132135d440067d6e3')
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
