import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CachingPage } from './caching.page';

describe('CachingPage', () => {
  let component: CachingPage;
  let fixture: ComponentFixture<CachingPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CachingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
