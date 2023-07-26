import { NextApiRequest, NextApiResponse } from "next";
import AccessToken, { VoiceGrant } from "twilio/lib/jwt/AccessToken";

const account_sid = process.env.TWILIO_ACCOUNT_SID;
const application_sid = process.env.TWILIO_TWIML_APP_SID;
const api_key = process.env.API_KEY;
const api_secret = process.env.API_SECRET;


export default function handler(req: NextApiRequest, res: NextApiResponse) {
    // Generate a random user name and store it
    const identity = "coolbeans";
  
    // Create access token with credentials
    const token = new AccessToken(account_sid!, api_key!, api_secret!, { identity });
  
    // Create a Voice grant and add it to the token
    const voice_grant = new VoiceGrant({
      outgoingApplicationSid: application_sid,
      incomingAllow: true,
    });
    token.addGrant(voice_grant);
  
    // Return token info as JSON
    const tokenResponse = {
      identity: identity,
      token: token.toJwt(),
    };
    res.json(tokenResponse);
  }
  