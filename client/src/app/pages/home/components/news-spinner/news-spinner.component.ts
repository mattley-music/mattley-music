import { Component, OnDestroy, OnInit } from "@angular/core";
import gsap from "gsap";
import { ContentService } from "../../../../services/content.service";

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
    constructor(public readonly eventService: ContentService) {}

    /**
     * Start the animation of the news spinner
     */

    /**
     * Old Animation version
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
    **/

    public ngOnInit(): void {
        this.buyTimeline = gsap.timeline({
            repeat: -1,
            repeatDelay: 0,
            delay: 0,
        });
        this.buyTimeline.to("#news-spinner", {
            rotate: 360, // Rotate 360 degrees
            duration: 14, // Duration of rotation in seconds
            ease: "linear", // Linear easing for continuous rotation
        });
    }
    /**
     * Close the animation
     */
    public ngOnDestroy(): void {
        this.buyTimeline?.clear();
    }
}
