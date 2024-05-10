// scripts/example.js
console.log("Hello from the example JavaScript script!");

const { google } = require('googleapis');
const fs = require('node:fs');

const credentialsJsonString = process.env.EVENTS_SECRETS;
const key = JSON.parse(credentialsJsonString);

// Load the service account key file (in case of local credentials.json)
// const keyFile = 'credentials.json';
// const key = JSON.parse(fs.readFileSync(keyFile));

// Specify the required scope
const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];

// Create a JWT client to authorize the API call
const jwtClient = new google.auth.JWT(
    key.client_email,
    null,
    key.private_key,
    SCOPES
);

// Authorize the client and make the API request
jwtClient.authorize(function (err, tokens) {
    if (err) {
        console.error('Authorization error:', err);
        return;
    }

    const calendar = google.calendar({ version: 'v3', auth: jwtClient });

    // Specify parameters for calendar events list request
    const params = {
        calendarId: '99ebfacd872bfe9c5997ca8e697426abc51cd412dfe3c1cfd4cc125dcdbda871@group.calendar.google.com',
        timeMin: (new Date()).toISOString(),
        maxResults: 10,
        singleEvents: true,
        orderBy: 'startTime',
    };

    // Retrieve calendar events
    calendar.events.list(params, (err, res) => {
        if (err) {
            console.error('The API returned an error:', err);
            return;
        }

        const events = res.data.items;
        if (events.length) {
            console.log('Upcoming events:');
            const formattedEvents = events.map((event, i) => {
                const start = event.start.dateTime || event.start.date;
                return {
                    start,
                    summary: event.summary,
                    description: event.description || 'No notes available'
                };
            });
            // Convert the array of events to JSON
            const jsonOutput = JSON.stringify(formattedEvents, null, 2);

            // Write the JSON output to a file
            fs.writeFile('../client/src/assets/data/upcoming-events.json', jsonOutput, (err) => {
                if (err) {
                    console.error('Error writing JSON file:', err);
                } else {
                    console.log('JSON file saved successfully!');
                }
            });
        } else {
            console.log('No upcoming events found.');
        }
    });
});
