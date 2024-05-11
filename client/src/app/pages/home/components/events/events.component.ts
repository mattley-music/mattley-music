import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Component({
    selector: "app-events",
    templateUrl: "./events.component.html",
    styleUrls: ["./events.component.scss"],
})
export class EventsComponent implements OnInit {
    @Output() scrollToEvents = new EventEmitter<void>();
    events: any[] = [];
    showAllEvents: boolean = false;

    constructor(private http: HttpClient) {}

    ngOnInit(): void {
        this.http.get<any[]>("assets/data/upcoming-events.json").subscribe((data) => {
            this.events = data;
        });
    }

    toggleEvents = () => {
        this.showAllEvents = !this.showAllEvents;
        if (!this.showAllEvents) {
            this.scrollToEvents.emit();
        }
    };
}
