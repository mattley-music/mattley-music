import { Component } from "@angular/core";
import { ContentService } from "../../../../services/content.service";

@Component({
    selector: "app-others",
    templateUrl: "./others.component.html",
    styleUrls: ["./others.component.scss"],
})
export class OthersComponent {
    /**
     * Constructor
     * @param eventService
     */
    constructor(public readonly eventService: ContentService) {}
}
