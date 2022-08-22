import { Component } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Component({
    selector: "app-gallery",
    templateUrl: "./gallery.component.html",
    styleUrls: ["./gallery.component.scss"],
})
export class GalleryComponent {
    /**
     * The shown images
     */
    public images = [1, 2, 3, 4, 5, 6, 7, 8];
    /**
     * The currently selected image
     */
    public selectedImage = new BehaviorSubject<number | undefined>(undefined);

    /**
     * Constructor
     */
    constructor() {
        this.selectedImage.subscribe(this.lockScrolling);
    }

    /**
     * Disables scrolling while an image is selected
     */
    private lockScrolling = (value: number | undefined): void => {
        document.documentElement.style.overflow = value ? "hidden" : "auto";
    };
}
