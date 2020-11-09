import {RouterTestingModule} from '@angular/router/testing';
import {AppComponent} from './app.component';
import {createComponentFactory, mockProvider, Spectator} from "@ngneat/spectator/jest";
import {ActivatedRoute, Router} from "@angular/router";
import {ActivatedRouteStub, SpectatorOverrides} from "@ngneat/spectator";
import {TestBed} from "@angular/core/testing";

describe('AppComponent', () => {
  let spectator: Spectator<AppComponent>;
  const createComponent = createComponentFactory({
    component: AppComponent,
    imports: [RouterTestingModule],
    providers: [{provide: ActivatedRoute, useValue: new ActivatedRouteStub({queryParams: {shouldCreateAccount: 'true'}})},
      mockProvider(Router),
    ]
  });


  const createComponentWithMockCookie = (cookie: string, options?: SpectatorOverrides<AppComponent>) => {
    try {
      jest.spyOn(document, 'cookie', 'get').mockReturnValue(cookie);
      return createComponent(options);
    } catch (e) {
      console.error(e);
    }
  };

  beforeEach(() => {
  });

  it('should create the app', () => {
    spectator = createComponentWithMockCookie('');
    expect(spectator.component).toBeTruthy();
  });

  it(`should have as title 'activated-route-test-issue'`, () => {
    spectator = createComponentWithMockCookie('cookie');
    const app = spectator.component;
    expect(app.title).toEqual('activated-route-test-issue');
  });

  it('should render title', () => {
    spectator = createComponentWithMockCookie('cookie');
    const compiled = spectator.element;
    expect(compiled.querySelector('.content span').textContent).toContain('activated-route-test-issue app is running!');
  });

  it('should render params in route', () => {
    const spyRouter = jest.spyOn(TestBed.inject(Router), 'navigate').mockReturnValue(Promise.resolve(true));
    spectator = createComponentWithMockCookie('cookie');
    const compiled = spectator.element;
    expect(compiled.querySelector('.activated-route').textContent).toContain('{"shouldCreateAccount":"true"}');
  })

  it('we should be able to test with different value for activatedRoute', () => {
    const spyRouter = jest.spyOn(TestBed.inject(Router), 'navigate').mockReturnValue(Promise.resolve(true));

    spectator = createComponentWithMockCookie('cookie', {
      providers: [{
        provide: ActivatedRoute,
        useValue: new ActivatedRouteStub({queryParams: {shouldCreateAccount: 'false'}})
      }]
    });
    const compiled = spectator.element;
    expect(compiled.querySelector('.activated-route').textContent).toContain('{"shouldCreateAccount":"false"}');
  })
});
