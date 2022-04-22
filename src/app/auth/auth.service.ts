import {Injectable} from "@angular/core";
import {Store} from "@ngrx/store";
import * as fromApp from "./store/auth.reducer";
import * as fromActions from "./store/auth.actions";

@Injectable({ providedIn: 'root'})
export class AuthService {
    private tokenExpirationTime: any

    constructor(private store: Store<fromApp.State>
    ) {}

    setLogoutTimer(expirationDuration: number) {
        this.tokenExpirationTime = setTimeout(() => {
            this.store.dispatch(new fromActions.LogOut());
        }, expirationDuration);
    }

    clearLogoutTimer() {
        if(this.tokenExpirationTime) {
            clearTimeout(this.tokenExpirationTime);
            this.tokenExpirationTime = null;
        }
    }
}
