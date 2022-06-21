import { APP_INITIALIZER, Injector, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./pages/home/home.component";
import { SectionHeaderComponent } from "./pages/home/components/section-header/section-header.component";
import { TranslateLoader, TranslateModule, TranslateService } from "@ngx-translate/core";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { LOCATION_INITIALIZED, LocationStrategy } from "@angular/common";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { AboutComponent } from "./pages/home/components/about/about.component";
import { AboutInfoComponent } from "./pages/home/components/about-info/about-info.component";

@NgModule({
    declarations: [AppComponent, HomeComponent, SectionHeaderComponent, AboutComponent, AboutInfoComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        TranslateModule.forRoot({
            defaultLanguage: "en",
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient, LocationStrategy],
            },
        }),
    ],
    providers: [
        {
            provide: APP_INITIALIZER,
            useFactory: AppInitializerFactory,
            deps: [TranslateService, Injector],
            multi: true,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}

/**
 * Required for translations
 */
export function HttpLoaderFactory(http: HttpClient, locationStrategy: LocationStrategy) {
    const loader = new TranslateHttpLoader(http);
    loader.prefix = `${locationStrategy.getBaseHref()}assets/i18n/`;
    return loader;
}

/**
 * Wait for the application to load the translations first
 */
export function AppInitializerFactory(translate: TranslateService, injector: Injector) {
    return () =>
        new Promise<any>((resolve: any) => {
            const locationInitialized = injector.get(LOCATION_INITIALIZED, Promise.resolve(null));
            locationInitialized.then(() => {
                const language = navigator.language.split("-")[0];
                translate.setDefaultLang("en");
                translate.use(language).subscribe({
                    complete: () => resolve(),
                });
            });
        });
}
