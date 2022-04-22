import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import * as fromApp from "../store/app.reducer"
import {Store} from "@ngrx/store";
import * as AuthActions from '../auth/store/auth.actions'
import * as RecipeActions from '../recipes/store/recipe.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
  private userSub: Subscription;
  isAuthenticated = false;

  constructor(
      private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    this.userSub = this.store.select('auth', 'user').subscribe( user => {
      this.isAuthenticated = !!user;
    });
  }


  onSaveData() {
    this.store.dispatch(new RecipeActions.StoreRecipes());
  }

  onFetchData() {
    this.store.dispatch(new RecipeActions.FetchRecipes());
  }

  onLogOut() {
    this.store.dispatch(new AuthActions.LogOut());
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
