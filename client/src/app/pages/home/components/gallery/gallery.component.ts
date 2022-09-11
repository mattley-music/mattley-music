import { Component } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import galleryConfig from "./gallery.config.json";
import gsap from "gsap";
import { Linear, Expo } from "gsap";

/**
 * The configuration used for displaying the images and videos
 */
interface GalleryConfig {
    index: number;
    isVideo: boolean;
    videoIndex?: number;
}

@Component({
    selector: "app-gallery",
    templateUrl: "./gallery.component.html",
    styleUrls: ["./gallery.component.scss"],
})
export class GalleryComponent {
    /**
     * The amount of columns in the gallery
     */
    private readonly amountOfColumns = 4;
    /**
     * The shown images
     */
    public config: GalleryConfig[] = galleryConfig;
    /**
     * The currently selected image
     */
    public selectedImage = new BehaviorSubject<GalleryConfig | undefined>(undefined);
    /**
     * The video players (required for animation)
     */
    private videoPlayers: HTMLVideoElement[] = [];
    /**
     * The timeline for animating the gallery
     */
    private timeline?: gsap.core.Timeline;
    /**
     * The amount of initialized videos
     */
    private initializedVideos = 0;

    /**
     * Constructor
     */
    constructor() {
        this.selectedImage.subscribe(this.lockScrolling);
    }

    /**
     * Collect the video players for animation
     * @param videoIndex The index of the loaded video player
     */
    public collectVideoPlayer = (videoIndex: number | undefined): void => {
        this.videoPlayers[videoIndex as number] = document.getElementById(`video-${videoIndex}`) as HTMLVideoElement;
        this.initializedVideos++;
        if (this.initializedVideos >= this.amountOfColumns) this.prepareAnimation();
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
        for (let i = 0; i < this.videoPlayers.length; i++) {
            this.timeline.to(`#video-${i}`, {
                duration: 0,
                filter: "grayscale(0)",
                onComplete: this.videoPlayers[i].play.bind(this.videoPlayers[i]) as () => void,
            });
            this.timeline.to(
                "#progress-bar",
                {
                    duration: this.videoPlayers[i].duration,
                    width: `${25 * (i + 1)}%`,
                    ease: Linear.easeNone,
                },
                "<",
            );
        }
        this.timeline.to("#progress-bar", {
            delay: 2,
            duration: 1,
            width: "0%",
            left: "50%",
            ease: Expo.easeIn,
        });
        this.timeline.to("#progress-bar", {
            duration: 0,
            opacity: 0,
        });
        this.timeline.to(".img-responsive", {
            delay: 1,
            filter: "grayscale(0)",
            duration: 3,
        });
    };

    /**
     * Disables scrolling while an image is selected
     */
    private lockScrolling = (value: GalleryConfig | undefined): void => {
        document.documentElement.style.overflow = value ? "hidden" : "auto";
    };
}
