import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { PrivacyPolicyComponent } from "./pages/privacy-policy/privacy-policy.component";

const routes: Routes = [
    {
        path: "home",
        component: HomeComponent,
    },
    {
        path: "privacy-policy",
        component: PrivacyPolicyComponent,
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
