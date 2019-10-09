import * as ical from 'node-ical';

export default class KnkvIcal {
  private readonly DEFAULT_BASE_URL = 'https://data.sportlink.com/ical-team';

  private baseUrl: string;

  constructor(baseUrl?: string) {
    this.baseUrl = baseUrl || this.DEFAULT_BASE_URL;
  }

  public async getMatches(token: string): Promise<Match[]> {
    return await this.fetchIcal(`${this.baseUrl}?token=${token}`)
      .then(this.handleResponse)
      .then(events => events.map(this.convertToMatch));
  }

  private fetchIcal(url: string): Promise<any> {
    return new Promise((resolve, reject) => {
      ical.fromURL(url, undefined, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  private handleResponse(responseBody: ical.CalendarResponse): ical.VEvent[] {
    return Object.keys(responseBody)
      .filter(key => responseBody[key].type === 'VEVENT')
      .map(key => responseBody[key] as ical.VEvent);
  }

  private convertToMatch(event: ical.VEvent): Match {
    return {
      uid: event.uid,
      name: event.summary,
      location: event.location,
      start: event.start,
      end: event.end,
      description: event.description
    };
  }
}

export interface Match {
  uid: string;
  name: string;
  location: string;
  start: ical.DateWithTimeZone;
  end: ical.DateWithTimeZone;
  description: string;
}
