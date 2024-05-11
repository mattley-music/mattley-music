import { google } from "googleapis";
import fs from "node:fs";
import { execa } from "execa";

const credentialsJsonString = process.env.JSON_CREDENTIALS;
const key = JSON.parse(credentialsJsonString);

/**
 * Push the freshly generated events json
 */
const pushEventFile = async () => {
    try {
        const cwd = "../gh-pages";
        await execa("git", ["config", "user.name", "Matthisbot"], { cwd });
        await execa("git", ["config", "user.email", "contact@mattleymusic.de"], { cwd });
        await execa("git", ["add", "--all"], { cwd });
        await execa("git", ["commit", "-m", "update events"], { cwd });
        console.log("Pushing to gh-pages...");
        await execa("git", ["push", "origin", "HEAD:gh-pages", "--force"], { cwd });
    } catch (e) {
        console.log(e.message);
        process.exit(1);
    }
};

// Load the service account key file (in case of local credentials.json)
// const keyFile = 'credentials.json';
// const key = JSON.parse(fs.readFileSync(keyFile));

// Specify the required scope
const SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"];

// Create a JWT client to authorize the API call
const jwtClient = new google.auth.JWT(key.client_email, null, key.private_key, SCOPES);

// Authorize the client and make the API request
jwtClient.authorize(function (err) {
    if (err) {
        console.error("Authorization error:", err);
        return;
    }

    const calendar = google.calendar({ version: "v3", auth: jwtClient });

    // Specify parameters for calendar events list request
    const params = {
        calendarId: "99ebfacd872bfe9c5997ca8e697426abc51cd412dfe3c1cfd4cc125dcdbda871@group.calendar.google.com",
        timeMin: new Date().toISOString(),
        maxResults: 10,
        singleEvents: true,
        orderBy: "startTime",
    };

    // Retrieve calendar events
    calendar.events.list(params, (err, res) => {
        if (err) {
            console.error("The API returned an error:", err);
            return;
        }

        const events = res.data.items;
        if (events.length) {
            console.log("Upcoming events:");
            const formattedEvents = events.map((event) => {
                const start = event.start.dateTime || event.start.date;
                return {
                    start,
                    summary: event.summary,
                    description: event.description || "No notes available",
                };
            });
            // Convert the array of events to JSON
            const jsonOutput = JSON.stringify(formattedEvents, null, 2);

            // Write the JSON output to a file
            const targetDir = "../gh-pages/assets/data";
            if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });
            fs.writeFileSync(`${targetDir}/upcoming-events.json`, jsonOutput);
            void pushEventFile();
        } else {
            console.log("No upcoming events found.");
        }
    });
});
