import {NgModule} from '@angular/core';
import {MatButtonModule, MatIconModule, MatSidenavModule, MatToolbarModule} from '@angular/material';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule, Routes} from '@angular/router';
import {LANGUAGE_TOKEN, TranslationModule} from 'angular-lingua';

import {AppComponent} from './app.component';
import {ComponentExamplePageComponent} from './pages/component-example-page/component-example-page.component';
import {DirectiveExamplePageComponent} from './pages/directive-example-page/directive-example-page.component';
import {HomePageComponent} from './pages/home-page/home-page.component';
import {PipeExamplePageComponent} from './pages/pipe-example-page/pipe-example-page.component';
import {ServiceExamplePageComponent} from './pages/service-example-page/service-example-page.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomePageComponent
  },
  {
    path: 'pipe-example',
    component: PipeExamplePageComponent
  },
  {
    path: 'directive-example',
    component: DirectiveExamplePageComponent
  },
  {
    path: 'service-example',
    component: ServiceExamplePageComponent
  },
  {
    path: 'component-example',
    component: ComponentExamplePageComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    PipeExamplePageComponent,
    DirectiveExamplePageComponent,
    ServiceExamplePageComponent,
    ComponentExamplePageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    RouterModule.forRoot(routes),
    TranslationModule.forRoot(),
  ],
  providers: [
    {
      provide: LANGUAGE_TOKEN,
      useValue: 'ita'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
