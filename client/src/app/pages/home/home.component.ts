import { Component } from "@angular/core";
import { ContentService } from "../../services/content.service";
import { trigger, state, style, animate, transition } from '@angular/animations';


@Component({
    selector: "app-home",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.scss"],
    animations: [
        trigger('slideInFromTop', [
            state('true', style({
                opacity: 1,
                transform: 'translateY(0)'
            })),
            state('false', style({
                opacity: 0,
                transform: 'translateY(-100%)'
            })),
            transition('false <=> true', animate('0.5s ease-in-out'))
        ])
    ]
})
export class HomeComponent {
    /**
     * The shown sections
     */
    private sections = ["events", "about", "youtube", "clothes", "gallery", "spotify", "others"];
    /**
     * The timeout reference for the scroll snapping
     */
    private scrollTimeout = NaN;
    isMenuOpen: boolean = false;


    /**
     * Constructor
     */
    constructor(public contentService: ContentService) {
        document.addEventListener("scroll", () => {
            clearTimeout(this.scrollTimeout);
            this.scrollTimeout = setTimeout(this.scrollToSection, 1000);
        });
    }

    /**
     * Scroll into a section
     */
    public scrollTo(section: string, behavior: ScrollBehavior = "smooth"): void {
        const element = document.getElementById(section);
        if (element) element.scrollIntoView({ behavior: behavior, block: "start" });
    }

    /**
     * Try to scroll to the nearest section
     */
    private scrollToSection = () => {
        for (const sectionId of this.sections) {
            const section = document.getElementById(sectionId) as HTMLElement;
            const relativePosition = section.offsetTop - document.documentElement.scrollTop;
            if (Math.abs(relativePosition) < 200) this.scrollTo(sectionId);
        }
    };

    toggleMenu() {
        this.isMenuOpen = !this.isMenuOpen;
    }

}
