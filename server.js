const express = require('express');
const twilio = require('twilio');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// PRE-CONFIGURED TWILIO CREDENTIALS
const ACCOUNT_SID = 'ACf7654d09489f678637fa15d70db00e05';
const AUTH_TOKEN = 'C3f8cbe522f7e45bee2b2cc3dfa2a43b';

// INITIALIZE TWILIO CLIENT
const client = twilio(ACCOUNT_SID, AUTH_TOKEN);

// API ENDPOINT: PLACE LIVE OUTBOUND CALL
app.post('/api/make-call', async (req, res) => {
    const { phoneNumber } = req.body;

    if (!phoneNumber) {
        return res.status(400).json({ success: false, error: 'Phone number is required' });
    }

    try {
        console.log(`[Twilio] Initiating live outbound call to: ${phoneNumber}`);

        // Place Outbound Call via Twilio
        const call = await client.calls.create({
            twiml: `<Response><Say voice="alice">Connecting your lead pitch from Majikal LeadX Workplace Studio.</Say></Response>`,
            to: phoneNumber,
            from: '+18005550199' // Your assigned Twilio Virtual Phone Number
        });

        console.log(`[Twilio] Call successfully placed! SID: ${call.sid}`);
        res.json({ success: true, callSid: call.sid });

    } catch (error) {
        console.error('[Twilio Error]:', error.message);
        res.status(500).json({ success: false, error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Majikal LeadX Twilio Server is running on port ${PORT}`);
});
