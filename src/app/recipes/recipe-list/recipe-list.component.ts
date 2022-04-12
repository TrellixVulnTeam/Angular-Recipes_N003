import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';

import { Recipe } from '../recipe.model';
import {RecipeServices} from "../recipe.services";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  subscription: Subscription

  constructor(private recipeServices: RecipeServices,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.subscription = this.recipeServices.recipeChanged.subscribe(
        (recipes: Recipe[]) => {
          this.recipes = recipes;
        }
    );
    this.recipes = this.recipeServices.getRecipes();
  }

  onNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route})
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
