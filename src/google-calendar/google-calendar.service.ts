
import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';

@Injectable()
export class CalendarService {
  async createEvent(accessToken: string, refreshToken: string) {
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI,
    );

    oauth2Client.setCredentials({
      access_token: accessToken,
      refresh_token: refreshToken,
    });

    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

    await calendar.events.insert({
      calendarId: 'primary',
      requestBody: {
        summary: 'Call mom',
        start: {
          dateTime: '2025-07-31T17:00:00+05:00',
          timeZone: 'Asia/Karachi',
        },
        end: {
          dateTime: '2025-07-31T17:30:00+05:00',
          timeZone: 'Asia/Karachi',
        },
      },
    });

    return { success: true };
  }
}
