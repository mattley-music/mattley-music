import { AfterViewInit, Component } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import Glide from "@glidejs/glide";

@Component({
    selector: "app-gallery",
    templateUrl: "./gallery.component.html",
    styleUrls: ["./gallery.component.scss"],
})
export class GalleryComponent implements AfterViewInit {
    /**
     * The images that are shown in the gallery
     */
    public readonly images = [0, 1, 2, 3, 4, 5, 6];
    /**
     * True if the fullscreen is shown
     */
    public $showFullscreen = new BehaviorSubject<boolean>(false);
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
    private onFullscreenToggle = (showGallery: boolean): void => {
        // Enable/Disable scrolling
        document.documentElement.style.overflow = showGallery ? "hidden" : "auto";
    };
}
