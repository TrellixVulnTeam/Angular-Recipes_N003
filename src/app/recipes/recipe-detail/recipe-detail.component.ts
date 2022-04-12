import {Component, OnInit} from '@angular/core';
import {Recipe} from "../recipe.model";
import {RecipeServices} from "../recipe.services";
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;

  constructor(private recipeServices: RecipeServices,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.route.params
        .subscribe(
            (params: Params) => {
              this.id = +params['id'];
              this.recipe = this.recipeServices.getRecipe(this.id)
            }
        );
  }

  onAddToShoppingList() {
    this.recipeServices.addIngredientsToShoppingList(this.recipe.ingredients);
  }

  onEditRecipe() {
      this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDeleteRecipe() {
      this.recipeServices.deleteRecipe(this.id);
      this.router.navigate(['/recipes']);
  }

}
