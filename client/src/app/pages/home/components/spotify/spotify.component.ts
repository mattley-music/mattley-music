import { AfterViewInit, Component } from "@angular/core";
import Glide from "@glidejs/glide";
import { ContentService } from "../../../../services/content.service";

@Component({
    selector: "app-spotify",
    templateUrl: "./spotify.component.html",
    styleUrls: ["./spotify.component.scss"],
})
export class SpotifyComponent implements AfterViewInit {
    /**
     * The playlists that shall be shown
     */
    public readonly playlists = ["playlist1", "playlist2", "playlist3", "playlist4", "playlist5"];
    /**
     * Track which iframes have been loaded
     */
    public loadedIframes: boolean[] = [true, false, false, false, false];
    /**
     * Pre-computed Spotify URLs (to avoid function calls in template)
     */
    public spotifyUrls: string[] = [];

    /**
     * Constructor
     */
    constructor(private contentService: ContentService) {}

    /**
     * Compute Spotify URLs after content is loaded
     */
    private computeSpotifyUrls(): void {
        this.spotifyUrls = this.playlists.map(
            (key) => `https://open.spotify.com/embed/playlist/${this.contentService.content[key]}?utm_source=generator&theme=0`
        );
    }

    /**
     * Initialize the carousel
     */
    public ngAfterViewInit(): void {
        // Compute Spotify URLs once
        this.computeSpotifyUrls();
        const glide: any = new Glide(".spotify-glider", {
            type: "carousel",
            startAt: 0,
            perView: 1,
            keyboard: true,
            swipeThreshold: 1,
            dragThreshold: 1,
            gap: 16,
            focusAt: "center",
        }).mount();

        // Load iframes as user navigates
        glide.on("run", () => {
            const nextIndex = glide.index;
            if (!this.loadedIframes[nextIndex]) {
                this.loadedIframes[nextIndex] = true;
            }
        });
    }
}
