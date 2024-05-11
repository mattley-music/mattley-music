import { APP_INITIALIZER, Injector, LOCALE_ID, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./pages/home/home.component";
import { SectionHeaderComponent } from "./pages/home/components/section-header/section-header.component";
import { TranslateLoader, TranslateModule, TranslateService } from "@ngx-translate/core";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { LOCATION_INITIALIZED, registerLocaleData } from "@angular/common";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { AboutComponent } from "./pages/home/components/about/about.component";
import { AboutInfoComponent } from "./pages/home/components/about-info/about-info.component";
import { ContentService } from "./services/content.service";
import { ClothesComponent } from "./pages/home/components/clothes/clothes.component";
import { ButtonComponent } from "./components/button/button.component";
import { OthersComponent } from "./pages/home/components/others/others.component";
import { GalleryComponent } from "./pages/home/components/gallery/gallery.component";
import { SpotifyComponent } from "./pages/home/components/spotify/spotify.component";
import { SafePipe } from "./pipes/safe.pipe";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import localeDe from "@angular/common/locales/de";
import dayjs from "dayjs";
import { PrivacyPolicyComponent } from "./pages/privacy-policy/privacy-policy.component";
// Matze Module
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { EventsComponent } from "./pages/home/components/events/events.component";

// Register additional languages (required for angular pipes, e.g. date pipe)
registerLocaleData(localeDe);

// Get the current browser language
// const availableLanguages = ["de", "en"];
let browserLanguage = "de"; // navigator.language.split("-")[0];
// if (!availableLanguages.includes(browserLanguage)) browserLanguage = "en";

// GSAP Plugins
gsap.registerPlugin(ScrollTrigger);

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        SectionHeaderComponent,
        AboutComponent,
        AboutInfoComponent,
        ClothesComponent,
        ButtonComponent,
        OthersComponent,
        GalleryComponent,
        SpotifyComponent,
        SafePipe,
        PrivacyPolicyComponent,
        EventsComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        HttpClientModule,
        TranslateModule.forRoot({
            defaultLanguage: "de",
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient],
            },
        }),
    ],
    providers: [
        {
            provide: APP_INITIALIZER,
            useFactory: AppInitializerFactory,
            deps: [ContentService, TranslateService, Injector],
            multi: true,
        },
        { provide: LOCALE_ID, useValue: browserLanguage },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}

/**
 * Required for translations
 */
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, "./assets/i18n/", `.json?hash=${dayjs().format()}`);
}

/**
 * Wait for the application to load the translations and events first
 */
export function AppInitializerFactory(contentService: ContentService, translate: TranslateService, injector: Injector) {
    return () =>
        new Promise<any>((resolve: any) => {
            const eventsInitialized = contentService.initialize();
            const locationInitialized = injector.get(LOCATION_INITIALIZED, Promise.resolve(null));
            Promise.allSettled([eventsInitialized, locationInitialized]).then(() => {
                translate.setDefaultLang("de");
                translate.use(browserLanguage).subscribe({
                    complete: () => resolve(),
                });
            });
        });
}
