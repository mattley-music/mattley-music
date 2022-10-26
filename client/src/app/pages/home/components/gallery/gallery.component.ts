import { Component } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import gsap from "gsap";

@Component({
    selector: "app-gallery",
    templateUrl: "./gallery.component.html",
    styleUrls: ["./gallery.component.scss"],
})
export class GalleryComponent {
    /**
     * The value for the selected image if nothing is selected
     */
    public readonly noSelection = -2;
    /**
     * The value for the selected image if video is selected
     */
    public readonly video = -1;
    /**
     * The images that are shown besides the video
     */
    public readonly images = [0, 1, 2, 3, 4, 5];
    /**
     * The currently selected image
     */
    public selectedImage = new BehaviorSubject<number>(this.noSelection);
    /**
     * The video player (required for animation)
     */
    private videoPlayer?: HTMLVideoElement;
    /**
     * The timeline for animating the gallery
     */
    private timeline?: gsap.core.Timeline;

    /**
     * Constructor
     */
    constructor() {
        this.selectedImage.subscribe(this.lockScrolling);
    }

    /**
     * Collect the video player for animation
     */
    public collectVideoPlayer = (): void => {
        this.videoPlayer = document.getElementById(`video-player`) as HTMLVideoElement;
        this.prepareAnimation();
    };

    /**
     * Prepare the gallery animation
     */
    private prepareAnimation = (): void => {
        this.timeline = gsap.timeline({
            scrollTrigger: {
                trigger: "#gallery",
                start: "top top+=100",
            },
        });
        this.timeline.to(`#video-player`, {
            duration: 0.1,
            onComplete: this.videoPlayer?.play.bind(this.videoPlayer) as () => void,
        });
    };

    /**
     * Disables scrolling while an image is selected
     */
    private lockScrolling = (value: number): void => {
        document.documentElement.style.overflow = value === this.noSelection ? "auto" : "hidden";
    };
}
