import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Observable, of } from 'rxjs';
import IUser from '../models/IUser';
import { delay, filter, map, switchMap } from 'rxjs/operators';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private usersCollection: AngularFirestoreCollection<IUser>;
  public isAuthentication$: Observable<boolean>;
  private isRedirect = false;

  constructor(
    private auth: AngularFireAuth,
    private db: AngularFirestore,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.usersCollection = db.collection('users');
    this.isAuthentication$ = auth.user.pipe(delay(1000)).pipe(map((x) => !!x));
    this.router.events
      .pipe(
        filter((e) => e instanceof NavigationEnd), //
        map((e) => this.route.firstChild), //
        switchMap((route) => route?.data ?? of({}))
      )
      .subscribe((data) => {
        this.isRedirect = data.authOnly ?? false;
      });
  }

  public async createUser(userData: IUser) {
    const userCredential = await this.auth.createUserWithEmailAndPassword(
      userData.email as string,
      userData.password as string
    );

    await this.usersCollection.doc(userCredential.user?.uid).set({
      name: userData.name,
      email: userData.email,
      age: userData.age,
      phoneNumber: userData.phoneNumber,
      password: userData.password,
    });

    await userCredential.user?.updateProfile({
      displayName: userData.name,
    });
  }

  public async logout($event?: Event) {
    if ($event) {
      $event.preventDefault();
    }
    await this.auth.signOut();
    if (this.isRedirect) {
      await this.router.navigateByUrl('/');
    }
  }
}
