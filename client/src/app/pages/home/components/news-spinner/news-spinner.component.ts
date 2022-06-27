import { Component, OnDestroy, OnInit } from "@angular/core";
import gsap from "gsap";
import { EventsService } from "../../../../services/events.service";

@Component({
    selector: "app-news-spinner",
    templateUrl: "./news-spinner.component.html",
    styleUrls: ["./news-spinner.component.scss"],
})
export class NewsSpinnerComponent implements OnInit, OnDestroy {
    /**
     * The timeline for the buy sign
     */
    private buyTimeline?: gsap.core.Timeline;

    /**
     * Constructor
     */
    constructor(public readonly eventService: EventsService) {}

    /**
     * Start the animation of the news spinner
     */
    public ngOnInit(): void {
        this.buyTimeline = gsap.timeline({
            repeat: -1,
            repeatDelay: 2,
            delay: 2,
        });
        this.buyTimeline.to("#news-spinner", {
            rotate: "180deg",
            duration: 4,
        });
        this.buyTimeline.to("#news-spinner", {
            delay: 2,
            rotate: "360deg",
            duration: 4,
        });
    }

    /**
     * Close the animation
     */
    public ngOnDestroy(): void {
        this.buyTimeline?.clear();
    }
}
