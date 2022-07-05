import { Component, Input } from "@angular/core";

@Component({
    selector: "app-button",
    templateUrl: "./button.component.html",
    styleUrls: ["./button.component.scss"],
})
export class ButtonComponent {
    /**
     * The text of the button
     */
    @Input() text = "";
    /**
     * The href the button leads to
     */
    @Input() href?: string;
    /**
     * The color of the button
     */
    @Input() color: "purple" | "blue" = "purple";
}
