import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AsyncPipePage } from './async-pipe.page';

describe('AsyncPipePage', () => {
  let component: AsyncPipePage;
  let fixture: ComponentFixture<AsyncPipePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AsyncPipePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
