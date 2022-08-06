# NgrxGLoadObject

_This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.0._

## What does it do?

This package makes the usage of standard NGRX usage faster and smaller. A standard usage is an object that is retrieved by an effect (e.g. back-end call). This object also contains a loading and error observable to check when the object is still loading into the application and if there were any errors along the way. This package will compress the code from 5 scripts to 1 config and reducer file for multiple object and actions (e.g. delete or get)

## Usage

In your +state folder you can add a config and reducer file. Inside the config file you need to extend the ObjectStateConfig and fill it with the desired objects and actions inside the object. Each action will give a function callback which can be a back-end call.

```
@Injectable({
  providedIn: 'root',
})
export class ExampleConfig extends ObjectStateConfig {
  constructor(readonly exampleService: ExampleService) {
    super({
      ['Example']: [
        new WithLoadingActions(
          Example,
          (id: string) => exampleService.getExampleById(id),
          'get'
        ),
        new WithLoadingActions(
          Example,
          (id: string, force: boolean) =>
            exampleService.deleteExampleById(id, force),
          'delete'
        ),
      ],
      ['Explanation']: [
        new WithLoadingActions(
          Explanation,
          (id: string) => exampleService.getExampleById(id),
          'get'
        ),
      ],
    });

    console.log(exampleService);
  }
}
```

The reducer file needs to contain an exported function of type ActionReducerMap. Inside the function you return an object made with an action reducer map with the config that is stated above as injection.

```
const option: ConstructorProvider = { provide: ExampleConfig, deps: [] };
const options: StaticProvider[] = [option];
const injector = Injector.create(options);
export function exampleModuleReducer(): ActionReducerMap<any> {
  const actionReducerMap = createWithLoadingObjectReducers(
    injector.get(ExampleConfig)
  );

  const keys = [...actionReducerMap.keys()];

  return {
    [keys[0]]: actionReducerMap.get(keys[0])!,
    [keys[1]]: actionReducerMap.get(keys[1])!,
    [keys[2]]: actionReducerMap.get(keys[2])!,
  };
}

```

After the 2 files are made you need to setup all the imports in your .module.ts file:

```
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    StoreModule.forRoot({ example: fromExample.exampleModuleReducer }),
    EffectsModule.forRoot([WithLoadingObjectEffects]),
  ],
  providers: [
    ExampleService,
    ExplanationService,
    LoadObjectFacade,
    { provide: ObjectStateConfig, useExisting: ExampleConfig },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

## Code scaffolding

Run `ng generate component component-name --project ngrx-g-load-object` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module --project ngrx-g-load-object`.

> Note: Don't forget to add `--project ngrx-g-load-object` or else it will be added to the default project in your `angular.json` file.

## Build

Run `ng build ngrx-g-load-object` to build the project. The build artifacts will be stored in the `dist/` directory.

## Publishing

After building your library with `ng build ngrx-g-load-object`, go to the dist folder `cd dist/ngrx-g-load-object` and run `npm publish`.

## Running unit tests

Run `ng test ngrx-g-load-object` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
