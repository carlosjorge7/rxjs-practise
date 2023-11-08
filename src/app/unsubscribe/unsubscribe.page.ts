import { Component, OnInit } from '@angular/core';
import { Subject, Subscription, interval, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-unsubscribe',
  templateUrl: './unsubscribe.page.html',
  styleUrls: ['./unsubscribe.page.scss'],
})
export class UnsubscribePage implements OnInit {
  /**
   * Hay varias maneras de hacer un unsubcribe
   * 1 - Array de subscriptions
   * 2 - Operadores: take(1) o first()
   * 3- takeUntil
   */

  /**
   * OJO: el pipe async completa la subscription
   */

  // Unsubscribe

  private destroy$ = new Subject<void>();

  // private subscriptions: Subscription[] = [];
  dataInterval$ = interval(1000);

  ngOnInit(): void {
    // Unsubcribe
    // this.subscriptions.push(
    //   this.dataInterval$.pipe(tap((res) => console.log(res))).subscribe()
    // );

    this.dataInterval$
      .pipe(
        takeUntil(this.destroy$),
        tap((res) => console.log(res))
      )
      .subscribe();
  }

  // test() {
  //   this.subscriptions.forEach((subscription: Subscription) =>
  //     subscription.unsubscribe()
  //   );
  // }

  ngOnDestroy(): void {
    // this.subscriptions.forEach((subscription: Subscription) =>
    //   subscription.unsubscribe()
    // );
    this.destroy$.next();
    this.destroy$.complete();
  }
}
