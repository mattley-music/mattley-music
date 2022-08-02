import { Component } from "@angular/core";

@Component({
    selector: "app-gallery",
    templateUrl: "./gallery.component.html",
    styleUrls: ["./gallery.component.scss"],
})
export class GalleryComponent {
    public images = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    public selectedImage?: number;
}
