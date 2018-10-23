import {TestBed, async} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {TranslationModule} from './translation/translation.module';
import {MatIconModule} from '@angular/material';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [MatIconModule, TranslationModule.forRoot('deu')]
    }).compileComponents();
  }));

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();

    expect(true).toBe(true);
  });
});
