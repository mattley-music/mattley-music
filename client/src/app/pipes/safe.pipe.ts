import { Pipe, PipeTransform, SecurityContext } from "@angular/core";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";

@Pipe({
    name: "safe",
})
export class SafePipe implements PipeTransform {
    /**
     * Constructor
     */
    constructor(private readonly domSanitizer: DomSanitizer) {}

    /**
     * Ensures safe urls
     * @param url The url to be sanitized
     */
    public transform(url: string): SafeResourceUrl {
        const sanitizedUrl = this.domSanitizer.sanitize(SecurityContext.URL, url) ?? "";
        return this.domSanitizer.bypassSecurityTrustResourceUrl(sanitizedUrl);
    }
}
