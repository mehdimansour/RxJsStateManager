import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

interface Event<T> {
  type: T;
  payload?: any;
}

export abstract class StateService<T> {
  private state$: BehaviorSubject<T>;

  private eventDispatcher = new Subject<Event<any>>();
  protected handlers: Map<string, (state: T, payload: any) => T> = new Map();

  constructor(initialState: T) {
    this.state$ = new BehaviorSubject<T>(initialState);
    this.eventDispatcher.subscribe(({ type, payload }) => {
      console.log({ type, payload });
      const handler = this.handlers.get(type);
      if (handler) {
        var state = handler(this.state, payload);
        this.setState(state);
      }
    });
  }

  public get state(): T {
    return this.state$.getValue();
  }

  public select<K>(mapFn: (state: T) => K): Observable<K> {
    return this.state$.asObservable().pipe(
      map((state: T) => mapFn(state)),
      distinctUntilChanged()
    );
  }

  public dispatch(event: Event<string>) {
    this.eventDispatcher.next(event);
  }

  protected setState(newState: Partial<T>) {
    this.state$.next({
      ...this.state,
      ...newState,
    });
  }

  abstract setDispatchers(): void;
}
