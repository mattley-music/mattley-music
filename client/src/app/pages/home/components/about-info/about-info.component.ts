import { Component, Input } from "@angular/core";

@Component({
    selector: "app-about-info",
    templateUrl: "./about-info.component.html",
    styleUrls: ["./about-info.component.scss"],
})
export class AboutInfoComponent {
    /**
     * The description of the information
     */
    @Input() description = "";
    /**
     * True if the info should be right sided
     */
    @Input() right = false;
    /**
     * The height of the info point
     */
    @Input() height = 50;

    /**
     * True if the content is on bottom
     */
    public get bottom(): boolean {
        return this.height < 0;
    }

    /**
     * Returns the size of the diagonal line
     */
    public get size(): number {
        return Math.abs(this.height);
    }
}
