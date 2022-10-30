import { Component } from "@angular/core";
import dayjs from "dayjs";

@Component({
    selector: "app-about",
    templateUrl: "./about.component.html",
    styleUrls: ["./about.component.scss"],
})
export class AboutComponent {
    /**
     * The age of Matze
     */
    public readonly age = dayjs().diff("1999-08-26", "year");
}
