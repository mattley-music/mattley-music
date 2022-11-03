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
     * True if the fullscreen is shown
     */
    public $showFullscreen = new BehaviorSubject<boolean>(false);
    /**
     * The preview video player (required for animation)
     */
    private previewVideoPlayer?: HTMLVideoElement;
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
        this.$showFullscreen.subscribe(this.onFullscreenToggle);
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
     * Collect the preview video player for animation
     */
    public preparePreviewVideo = (): void => {
        this.previewVideoPlayer = document.getElementById(`preview-video-player`) as HTMLVideoElement;
        this.timeline = gsap.timeline({
            scrollTrigger: {
                trigger: "#gallery",
                start: "top top+=100",
            },
        });
        this.timeline.to(`#video-player`, {
            duration: 0.1,
            onComplete: this.previewVideoPlayer?.play.bind(this.previewVideoPlayer) as () => void,
        });
    };

    /**
     * Show fullscreen at a given slide
     * @param startAt The index of the slide that shall be shown
     */
    public openGallery = (startAt: number): void => {
        this.$showFullscreen.next(true);

        setTimeout(async () => {
            this.glide?.update({
                startAt,
            });
        });
    };

    /**
     * React to fullscreen toggles
     */
    private onFullscreenToggle = async (showGallery: boolean): Promise<void> => {
        // Enable/Disable scrolling
        document.documentElement.style.overflow = showGallery ? "hidden" : "auto";

        // Pause all videos and start/pause the preview depending on the state
        const videos = document.getElementsByTagName("video");
        for (let i = 0; i < videos.length; i++) {
            await videos[i]?.pause();
        }
        showGallery ? await this.previewVideoPlayer?.pause() : await this.previewVideoPlayer?.play();
    };
}
