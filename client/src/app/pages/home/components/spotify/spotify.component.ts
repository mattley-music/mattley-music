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
     * Constructor
     */
    constructor(private contentService: ContentService) {}

    /**
     * Get the spotify link for given playlist
     */
    public getSpotifyLink(key: string): string {
        return `https://open.spotify.com/embed/playlist/${this.contentService.content[key]}?utm_source=generator&theme=0`;
    }

    /**
     * Initialize the carousel
     */
    public ngAfterViewInit(): void {
        new Glide(".spotify-glider", {
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
}
