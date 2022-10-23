import * as dayjs from "dayjs";

/**
 * The data for an upcoming event
 */
interface GeneralEventsModel<T> {
    /**
     * The date of the event
     */
    date: T;
    /**
     * The name of the event
     */
    name: string;
    /**
     * The short description for the event
     */
    descriptionShort?: string;
    /**
     * The long description for the event
     */
    descriptionLong?: string;
}

/**
 * The data that comes from the google sheets
 */
export type ApiEventsModel = GeneralEventsModel<string>;

/**
 * The data that is used within the client
 */
export type EventsModel = GeneralEventsModel<dayjs.Dayjs>;
