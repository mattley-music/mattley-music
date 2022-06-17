import { Component, ElementRef } from "@angular/core";
import createScrollSnap from "scroll-snap";

@Component({
    selector: "app-home",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.scss"],
})
export class HomeComponent {
    /**
     * Constructor
     */
    constructor(private readonly elementRef: ElementRef) {
        createScrollSnap(elementRef.nativeElement, {
            snapDestinationY: "100%",
            threshold: 0.01,
            timeout: 0.01,
        });
    }
}
