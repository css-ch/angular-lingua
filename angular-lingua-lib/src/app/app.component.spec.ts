import {TestBed, async} from '@angular/core/testing';
import {MatIconModule, MatSidenavModule, MatToolbarModule} from '@angular/material';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterTestingModule} from '@angular/router/testing';
import {TranslationModule} from '../../projects/angular-lingua-lib/src/lib/translation.module';
import {AppComponent} from './app.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        TranslationModule.forRoot('deu'),
        MatSidenavModule,
        MatIconModule,
        MatToolbarModule,
        RouterTestingModule,
        BrowserModule,
        BrowserAnimationsModule,
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });


});
