import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideTranslateService } from '@ngx-translate/core';
import { App } from './app';
describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({imports:[App],providers:[provideRouter([]),provideTranslateService()]}).compileComponents();
  });
  it('renders the shared FleetSafe application shell', () => {
    const fixture=TestBed.createComponent(App);fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('app-layout')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('router-outlet')).toBeTruthy();
  });
});
