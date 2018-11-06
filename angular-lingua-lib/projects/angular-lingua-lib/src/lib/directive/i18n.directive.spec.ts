import {Component, DebugElement} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {TranslationService} from '../service/translation.service';
import {TranslationModule} from '../translation.module';
import {Translation} from '../translation.type';
import {I18nDirective} from './i18n.directive';

@Component({
  template: `<p [i18n]="locale"></p>`
})
class TestI18nComponent {
  locale: Translation;
}

@Component({
  template: `<p [i18n]="locale" [i18nParams]="params"></p>`
})
class TestI18nWithParamsComponent {
  public locale: Translation;
  public params: { [k: string]: string };
}


describe('I18nDirective', () => {
  const defaultLang = 'deu';
  describe('I18nDirective without Parameter', () => {
    let fixture: ComponentFixture<TestI18nComponent>;
    let component: TestI18nComponent;
    let pEl: DebugElement;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [TestI18nComponent],
        imports: [TranslationModule.forRoot(defaultLang)]
      });

      fixture = TestBed.createComponent(TestI18nComponent);
      component = fixture.componentInstance;
      pEl = fixture.debugElement.query(By.css('p'));
    });

    it('should translate text', () => {
      const smTranslation = 'Hello World';
      component.locale = {[defaultLang]: smTranslation};
      fixture.detectChanges();
      expect(pEl.nativeElement.textContent).toBe(smTranslation);
    });

    it('should throw error', () => {
      component.locale = {};
      expect(
        () => fixture.detectChanges()
      ).toThrowError(/.*translation not found.*/);
    });
  });

  describe('I18nDirective with Parameter', () => {
    let fixture: ComponentFixture<TestI18nWithParamsComponent>;
    let component: TestI18nWithParamsComponent;
    let pEl: DebugElement;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [TestI18nWithParamsComponent],
        imports: [TranslationModule.forRoot(defaultLang)]
      });

      fixture = TestBed.createComponent(TestI18nWithParamsComponent);
      component = fixture.componentInstance;
      pEl = fixture.debugElement.query(By.css('p'));
    });

    it('should translate text', () => {
      const smTranslation = 'Hello {{NAME}}';
      component.locale = {[defaultLang]: smTranslation};
      component.params = {NAME: 'Paul'};
      fixture.detectChanges();
      expect(pEl.nativeElement.textContent).toBe('Hello Paul');
    });

    it('should throw translation not found', () => {
      const smTranslation = 'Hello {{NAME}}';
      component.locale = {[defaultLang]: smTranslation};
      component.params = {};

      expect(
        () => fixture.detectChanges()
      ).toThrowError('could not replace variable: NAME');
    });
  });
});
