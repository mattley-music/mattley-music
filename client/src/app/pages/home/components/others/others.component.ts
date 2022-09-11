import { Component } from "@angular/core";
import { EventsService } from "../../../../services/events.service";

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
    constructor(public readonly eventService: EventsService) {}
}
