import { AfterViewInit, Component } from "@angular/core";
import Glide from "@glidejs/glide";
import { TranslateService } from "@ngx-translate/core";

@Component({
    selector: "app-clothes",
    templateUrl: "./clothes.component.html",
    styleUrls: ["./clothes.component.scss"],
})
export class ClothesComponent implements AfterViewInit {
    /**
     * The ids of the clothing images
     */
    public images = [0, 1, 2, 3];
    /**
     * The available sizes
     */
    public sizes = ["S", "M", "L", "XL"];
    /**
     * The selected size
     */
    public selectedSize = "S";
    /**
     * The content for the prefilled E-Mail
     */
    public mailToData = "";

    /**
     * Constructor
     */
    constructor(private readonly translate: TranslateService) {
        this.updateEmail();
    }

    /**
     * Initialize the carousel
     */
    public ngAfterViewInit(): void {
        new Glide(".clothes-glider", {
            type: "slider",
            startAt: 0,
            perView: 1,
            keyboard: true,
            swipeThreshold: 0,
            dragThreshold: 0,
            gap: 16,
            focusAt: "center",
        }).mount();
    }

    /**
     * Update the selected T-Shirt size
     * @param selectedSize The new size
     */
    public updateSelectedSize(selectedSize: string): void {
        this.selectedSize = selectedSize;
        this.updateEmail();
    }

    /**
     * Returns the prepared text for the E-Mail
     */
    public updateEmail(): void {
        const subject = this.translate.instant("home.clothes.subject");
        const body = this.translate.instant("home.clothes.body", { selectedSize: this.selectedSize });
        this.mailToData = `subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    }
}
