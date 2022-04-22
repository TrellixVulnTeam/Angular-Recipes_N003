import {Actions, Effect, ofType} from "@ngrx/effects";
import * as RecipesActions from "./recipe.actions";
import {map, switchMap, withLatestFrom} from "rxjs";
import {Recipe} from "../recipe.model";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import * as fromApp from "../../store/app.reducer";
import {Store} from "@ngrx/store";

@Injectable()
export class RecipeEffects {
    @Effect()
    fetchRecipes = this.actions$.pipe(
        ofType(RecipesActions.FETCH_RECIPES),
        switchMap(fettActions => {
            return this.httpClient.get<Recipe[]>('https://ng-course-recipe-book-1a031-default-rtdb.firebaseio.com/recipes.json');
        }),
        map(recipes => {
            return recipes.map( recipe => {
                return {
                    ...recipe,
                    ingredients: recipe.ingredients ? recipe.ingredients : []};
            });
        }),
        map(recipes => {
            return new RecipesActions.SetRecipes(recipes);
        })
    );

    @Effect({ dispatch: false})
    storeRecipes = this.actions$.pipe(ofType(RecipesActions.STORE_RECIPES),
        withLatestFrom(this.store.select('recipes')),
        switchMap(([actionData, recipesState]) => {
            return this.httpClient.put(
                'https://ng-course-recipe-book-1a031-default-rtdb.firebaseio.com/recipes.json',
                recipesState.recipes
            )
        }));

    constructor(private actions$: Actions, private httpClient: HttpClient, private store: Store<fromApp.AppState>) {
    }
}
