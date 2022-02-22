const AccessToken = require('twilio').jwt.AccessToken;
const MAX_ALLOWED_SESSION_DURATION = 14400;

exports.handler = function(context, event, callback) {
  // Here's an example of setting up some TWiML to respond to with this function
	let twiml = new Twilio.twiml.VoiceResponse();
  const response = new Twilio.Response();

  // Create an access token which we will sign and return to the client,
  // containing the grant we just created.
  const token = new AccessToken(
    context.TWILIO_ACCOUNT_SID,
    context.TWILIO_API_KEY,
    context.TWILIO_API_SECRET,
    { ttl: MAX_ALLOWED_SESSION_DURATION }
  );

  // Assign the generated identity to the token.
  token.identity = event.identity;
  
  const SyncGrant = AccessToken.SyncGrant;

  
  const syncGrant = new SyncGrant({
        serviceSid: process.env.TWILIO_SYNC_SERVICE_SID,
    });

  token.addGrant(syncGrant);
  
  // Serialize the token to a JWT string.
  response.appendHeader("Access-Control-Allow-Origin","*");
  response.setBody(token.toJwt());

  return callback(null, response);
};