import {Component, DebugElement} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {TranslationModule} from '../translation.module';
import {Translation} from '../translation.type';

@Component({
  template: `
    <span>i am an Icon</span>
  `,
  selector: 'app-icon'
})
class IconComponent {
}

@Component({
  template: `
    <translate [key]="key"></translate>`
})
class TestTranslateComponent {
  key: Translation;
}

@Component({
  template: `
    <translate [key]="key">
      <app-icon *translateParams="'FLAG'">flag</app-icon>
    </translate>
  `
})
class TestTranslateWithParamsComponent {
  public key: Translation;
}


describe('TranslateComponent', () => {
  const defaultLang = 'deu';
  describe('TranslateComponent without Parameter', () => {
    let fixture: ComponentFixture<TestTranslateComponent>;
    let component: TestTranslateComponent;
    let translateEl: DebugElement;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [TestTranslateComponent],
        imports: [TranslationModule.forRoot(defaultLang)]
      });

      fixture = TestBed.createComponent(TestTranslateComponent);
      component = fixture.componentInstance;
      translateEl = fixture.debugElement.query(By.css('translate'));
    });

    it('should translate text', () => {
      const smTranslation = 'Hello World';
      component.key = {[defaultLang]: smTranslation};
      fixture.detectChanges();

      expect(translateEl.nativeElement.textContent.trim()).toBe(smTranslation);
    });

    it('should throw error', () => {
      component.key = {};

      expect(
        () => fixture.detectChanges()
      ).toThrowError(/.*translation not found.*/);
    });

  });

  describe('TranslateComponent with Parameter', () => {
    let fixture: ComponentFixture<TestTranslateWithParamsComponent>;
    let component: TestTranslateWithParamsComponent;
    let translateEl: DebugElement;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [TestTranslateWithParamsComponent, IconComponent],
        imports: [TranslationModule.forRoot(defaultLang)]
      });

      fixture = TestBed.createComponent(TestTranslateWithParamsComponent);
      component = fixture.componentInstance;
      translateEl = fixture.debugElement.query(By.css('translate'));
    });

    it('should translate text', () => {
      const smTranslation = 'Hello World';
      component.key = {[defaultLang]: smTranslation};
      fixture.detectChanges();

      expect(translateEl.nativeElement.textContent.trim()).toBe(smTranslation);
    });

    it('should throw error', () => {
      component.key = {};

      expect(
        () => fixture.detectChanges()
      ).toThrowError(/.*translation not found.*/);
    });

    it('should put element in translation', () => {
      const smTranslation = 'This is a {{FLAG}}';
      component.key = {[defaultLang]: smTranslation};
      fixture.detectChanges();

      expect(translateEl.query(By.css('app-icon'))).toBeTruthy();
    });

    it('should throw error can not replace variable', () => {
      const smTranslation = 'This is a {{NOT_EXISTING}}';
      component.key = {[defaultLang]: smTranslation};

      expect(
        () => fixture.detectChanges()
      ).toThrowError('could not find Key: NOT_EXISTING');
    });


  });
});
