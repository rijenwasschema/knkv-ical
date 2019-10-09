declare module 'node-ical' {
    import { CoreOptions } from "request";
    
    export function fromURL(url: string, options: CoreOptions | undefined, callback: Callback): void;

    export function parseICS(body: string, callback: (err: any, data: CalendarResponse) => void): void;

    export function parseFile(filename: string, callback: (err: any, data: CalendarResponse) => void): void;

    export type Callback = (err: any, data: CalendarResponse) => void;

    export interface CalendarResponse {
        [key: string]: CalendarComponent;
    }

    export type CalendarComponent = VTimeZone | VEvent; 

    export type VTimeZone = TimeZoneProps & TimeZoneDictionary;
  
    interface TimeZoneProps extends BaseComponent {
        type: 'VTIMEZONE';
        tzid: string;
        tzurl: string;
    }

    interface TimeZoneDictionary {
        [key: string]: TimeZoneDef | undefined;
    }

    export interface VEvent extends BaseComponent {
        type: 'VEVENT';
        dtstamp: DateWithTimeZone;
        uid: string;
        sequence: string;
        transparency: Transparency;
        class: Class;
        summary: string;
        start: DateWithTimeZone;
        datetype: DateType;
        end: DateWithTimeZone;
        location: string;
        description: string;
        url: string;
        completion: string;
        created: DateWithTimeZone;
        lastmodified: DateWithTimeZone;

        // I am not entirely sure about these, leave them as any for now..
        organizer: any;
        exdate: any;
        geo: any;
        recurrenceid: any; 
    }

    export interface BaseComponent {
        params: Array<any>;
    }

    export interface TimeZoneDef {
        type: 'DAYLIGHT' | 'STANDARD';
        params: Array<any>;
        tzoffsetfrom: string;
        tzoffsetto: string;
        tzname: string;
        start: DateWithTimeZone;
        dateType: DateType;
        rrule: string;
        rdate: string | Array<string>;
    }

    export type DateWithTimeZone = Date & { tz: string };
    export type DateType = 'date-time' | 'date';
    export type Transparency = 'TRANSPARENT' | 'OPAQUE';
    export type Class = 'PUBLIC' | 'PRIVATE' | 'CONFIDENTIAL';
}
