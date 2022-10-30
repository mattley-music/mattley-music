import { AfterViewInit, Component } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import gsap from "gsap";
import Glide from "@glidejs/glide";

@Component({
    selector: "app-gallery",
    templateUrl: "./gallery.component.html",
    styleUrls: ["./gallery.component.scss"],
})
export class GalleryComponent implements AfterViewInit {
    /**
     * The value for the selected image if video is selected
     */
    public readonly video = 6;
    /**
     * The images that are shown besides the video
     */
    public readonly images = [0, 1, 2, 3, 4, 5];
    /**
     * The currently selected image
     */
    public showGallery = new BehaviorSubject<boolean>(false);
    /**
     * The video player (required for animation)
     */
    private videoPlayer?: HTMLVideoElement;
    /**
     * The timeline for animating the gallery
     */
    private timeline?: gsap.core.Timeline;
    /**
     * GlideJS instance
     */
    private glide?: Glide.Properties;

    /**
     * Constructor
     */
    constructor() {
        this.showGallery.subscribe(this.lockScrolling);
    }

    /**
     * Initialize the carousel
     */
    public ngAfterViewInit(): void {
        this.glide = new Glide(".gallery-glider", {
            type: "carousel",
            startAt: 0,
            perView: 1,
            keyboard: true,
            swipeThreshold: 1,
            dragThreshold: 1,
            gap: 16,
            focusAt: "center",
        }).mount();
    }

    /**
     * Collect the video player for animation
     */
    public collectVideoPlayer = (): void => {
        this.videoPlayer = document.getElementById(`video-player`) as HTMLVideoElement;
        this.prepareAnimation();
    };

    /**
     * Show fullscreen at a given slide
     * @param startAt The index of the slide that shall be shown
     */
    public openGallery = (startAt: number): void => {
        this.showGallery.next(true);

        setTimeout(() =>
            this.glide?.update({
                startAt,
            }),
        );
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
    private lockScrolling = (showGallery: boolean): void => {
        document.documentElement.style.overflow = showGallery ? "hidden" : "auto";
    };
}
