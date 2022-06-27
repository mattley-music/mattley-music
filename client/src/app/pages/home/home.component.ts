import { Component, ElementRef, OnDestroy } from "@angular/core";
import createScrollSnap from "scroll-snap";

@Component({
    selector: "app-home",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnDestroy {
    /**
     * The reference to the scroll snap
     */
    private scrollSnap?: { unbind: () => void };
    /**
     * The media query to enable/disable scroll snapping
     */
    private readonly mediaQuery: MediaQueryList = window.matchMedia("(max-width: 760px)");

    /**
     * Constructor
     */
    constructor(private readonly elementRef: ElementRef) {
        this.updateScrollSnapping();
        this.mediaQuery.addEventListener("change", this.updateScrollSnapping);
    }
    /**
     * Remove the media query
     */
    public ngOnDestroy(): void {
        this.mediaQuery.removeEventListener("change", this.updateScrollSnapping);
    }

    /**
     * Enable/Disable scroll snapping
     */
    private updateScrollSnapping = (): void => {
        if (this.mediaQuery.matches) {
            if (this.scrollSnap) this.scrollSnap.unbind();
        } else {
            this.scrollSnap = createScrollSnap(this.elementRef.nativeElement, {
                snapDestinationY: "100%",
                threshold: 0.01,
                timeout: 0.01,
            });
        }
    };

    /**
     * Scroll into a section
     */
    public scrollTo(section: string): void {
        const element = document.getElementById(section);
        if (element) element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
}
