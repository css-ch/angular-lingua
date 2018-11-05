import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {filter} from 'rxjs/operators';
import {WebSocketSubject} from 'rxjs/webSocket';
import {environment} from '../../environments/environment';
import {
  EventName,
  LANGUAGES_EVENT_NAME,
  LanguagesEvent,
  SocketEvent,
  TRANSLATIONS_EVENT_NAME,
  TranslationsEvent
} from '../events';
import {HostService} from './host.service';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  public socket$: WebSocketSubject<SocketEvent>;
  public translationEvent$: Observable<TranslationsEvent>;
  public languageEvent$: Observable<LanguagesEvent>;

  constructor(private hostService: HostService) {
    const socketUrl = (environment.production) ?
      `ws://${hostService.get()}` : `ws://${environment.host}`;

    this.socket$ = new WebSocketSubject(socketUrl);
    this.translationEvent$ = this.listenOnSocketEvent<TranslationsEvent>(TRANSLATIONS_EVENT_NAME);
    this.languageEvent$ = this.listenOnSocketEvent<LanguagesEvent>(LANGUAGES_EVENT_NAME);

    this.socket$.subscribe((event) => {
      console.log("received event: ", event)
    })
  }


  public listenOnSocketEvent<E>(eventName: EventName): Observable<E> {
    return this.socket$.pipe(
      filter((data: any): boolean => data.event === eventName)
    );
  }

  public send(socketEvent: SocketEvent) {
    console.log("send event: ", socketEvent);
    this.socket$.next(socketEvent);
  }
}
