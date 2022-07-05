import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { LegalNoticeComponent } from "./pages/legal-notice/legal-notice.component";

const routes: Routes = [
    {
        path: "home",
        component: HomeComponent,
    },
    {
        path: "legal-notice",
        component: LegalNoticeComponent,
    },
    { path: "**", redirectTo: "home" },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            useHash: true,
            scrollPositionRestoration: "top",
        }),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
