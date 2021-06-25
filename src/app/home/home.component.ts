import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription, Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  private firstObsSubscription: Subscription;
  private customSubscription: Subscription;
  constructor() { }

  ngOnInit() {
    /* this.firstObsSubscription = interval(1000).subscribe(count => {
      console.log(count);
    }); */

    const customObservable = Observable.create((observer) => {
      let count = 0;
      setInterval(() => {
        observer.next(count);

        if (count == 4) {
          observer.complete();
        }

        if (count > 5) {
          observer.error(new Error('count is greater than 3'));
        }

        count++;
      }, 1000);
    });

    this.customSubscription = customObservable.pipe(filter(data => {
      return data > 1;
    }),map((data: number) => {
      return 'Round: ' + (data + 1);
    })).subscribe(data => {
      console.log(data);
    }, error => {
      alert(error);
    }, () => {
      console.log('ob completed');
    });
  }

  ngOnDestroy() {
    //this.firstObsSubscription.unsubscribe();
    this.customSubscription.unsubscribe();
  }
}
