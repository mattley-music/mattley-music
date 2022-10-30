import { Injectable } from "@angular/core";
// @ts-ignore
import * as SheetReader from "g-sheets-api";
import { ApiEventsModel, EventsModel } from "../models/api-events.model";
import * as dayjs from "dayjs";

@Injectable({
    providedIn: "root",
})
export class ContentService {
    /**
     * The upcoming events
     */
    public events: EventsModel[] = [];
    /**
     * The dynamic content (used for spotify and yt embeds)
     */
    public content: { [key: string]: string } = {};

    /**
     * Constructor
     */
    public async initialize(): Promise<void> {
        const events = await this.loadSheetData<ApiEventsModel[]>("Events");
        this.transformEventData(events);
        this.content = (await this.loadSheetData<{ [key: string]: string }[]>("Dynamic Content"))[0];
    }

    /**
     * Load sheet data
     */
    private loadSheetData<T>(sheetName: string): Promise<T> {
        return new Promise((resolve) => {
            SheetReader(
                {
                    sheetId: "1C-UVXCoMXOL4aQo4u5QgohGxqBDPst9zvHvXLb2kVy8",
                    apiKey: "AIzaSyC7AhpCBFGM3u2967xINiu09pBg8zxlSEI",
                    sheetName,
                },
                (data: T) => {
                    resolve(data);
                },
                (error: unknown) => {
                    console.error("ContentService", error);
                    resolve({} as T);
                },
            );
        });
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
    private transformEventData = (data: ApiEventsModel[]) => {
        // Map the data
        const now = dayjs().hour(-1);
        for (const event of data) {
            const newEvent: EventsModel = {
                ...event,
                date: dayjs(event.date, "YYYY-MM-DD"),
            };
            if (newEvent.date && newEvent.date.isValid() && newEvent.date.valueOf() > now.valueOf())
                this.events.push(newEvent);
        }

        // Sort the array
        this.events = this.events.sort((a, b) => (a.date.isBefore(b.date) ? -1 : 1));
    };
}
