import { Injectable } from "@angular/core";
// @ts-ignore
import * as SheetReader from "g-sheets-api";
import { ApiEventsModel, EventsModel } from "../models/api-events.model";
import * as dayjs from "dayjs";

@Injectable({
    providedIn: "root",
})
export class EventsService {
    /**
     * The upcoming events
     */
    public events: EventsModel[] = [];

    /**
     * Constructor
     */
    constructor() {
        SheetReader(
            {
                sheetId: "1C-UVXCoMXOL4aQo4u5QgohGxqBDPst9zvHvXLb2kVy8",
                apiKey: "AIzaSyC7AhpCBFGM3u2967xINiu09pBg8zxlSEI",
                sheetName: "Events",
            },
            this.transformData,
            this.handleError,
        );
    }

    /**
     * The next upcoming event
     */
    public get nextEvent(): EventsModel {
        return this.events[0];
    }

    /**
     * Transforms the event data
     */
    private transformData = (data: ApiEventsModel[]) => {
        // Map the data
        const now = dayjs();
        for (const event of data) {
            const newEvent: EventsModel = {
                ...event,
                date: dayjs(event.date, "YYYY-MM-DD"),
            };
            if (newEvent.date && newEvent.date.isValid() && newEvent.date.valueOf() > now.valueOf())
                this.events.push(newEvent);
        }

        // Sort the array
        this.events = this.events.sort((a, b) => a.date.date() - b.date.date());
    };

    /**
     * Print an unknown/unexpected error
     */
    private handleError = (error: unknown) => {
        console.error("EventsService", error);
    };
}
