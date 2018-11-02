import {storiesOf} from '@storybook/angular';
import {TranslationDirectiveExampleComponent} from '../app/examples/translation-directive-example/translation-directive-example.component';
import {TranslationPipeExampleComponent} from '../app/examples/translation-pipe-example/translation-pipe-example.component';
import {TranslationModule} from '@cssinsurance/angular-lingua';
import {TranslationServiceExampleComponent} from '../app/examples/translation-service-example/translation-service-example.component';

storiesOf('Angular Lingua', module)
  .add('translation pipe', () => ({
    component: TranslationPipeExampleComponent,
    moduleMetadata: {
      imports: [TranslationModule.forRoot('deu')],
      schemas: [],
      declarations: [],
      providers: [],
    }
  }))
  .add('translation directive', () => ({
    component: TranslationDirectiveExampleComponent,
    moduleMetadata: {
      imports: [TranslationModule.forRoot('deu')],
      schemas: [],
      declarations: [],
      providers: [],
    }
  }))
  .add('translation service', () => ({
    component: TranslationServiceExampleComponent,
    moduleMetadata: {
      imports: [TranslationModule.forRoot('deu')],
      schemas: [],
      declarations: [],
      providers: [],
    }
  }));
