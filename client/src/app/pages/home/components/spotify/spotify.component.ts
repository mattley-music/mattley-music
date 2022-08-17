import { AfterViewInit, Component } from "@angular/core";
import Glide from "@glidejs/glide";

@Component({
    selector: "app-spotify",
    templateUrl: "./spotify.component.html",
    styleUrls: ["./spotify.component.scss"],
})
export class SpotifyComponent implements AfterViewInit {
    /**
     * The playlists that shall be shown
     */
    public readonly playlists = [
        "5zD1Omh2VmrNGsKeB8gfob",
        "2wwzCQnxslrV1Phqrky7Zo",
        "0oSmSUsSR9jDO5C0gl5Xbm",
        "0A0SyCbhsX2sNV4RAw5kfc",
        "0edbTDrtFiVwn8czqXAl9M",
    ];

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
