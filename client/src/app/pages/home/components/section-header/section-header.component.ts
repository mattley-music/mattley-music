import { Component, Input } from "@angular/core";

@Component({
    selector: "app-section-header",
    templateUrl: "./section-header.component.html",
    styleUrls: ["./section-header.component.scss"],
})
export class SectionHeaderComponent {
    /**
     * The title of the section header
     */
    @Input() text = "";
    /**
     * The color of the title
     */
    @Input() color: "white" | "blue" | "purple" = "purple";
}
