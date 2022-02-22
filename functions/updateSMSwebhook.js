exports.handler = function(context, event, callback) {


    const password = context.password;
    const response = new Twilio.Response();
    response.appendHeader("Access-Control-Allow-Origin","*");
  
    if(event.pwd && event.pwd === password)
    {
      const twilioClient =  context.getTwilioClient();
  
      twilioClient.incomingPhoneNumbers(event.phoneNumberID)
      .update({smsUrl: event.SmsUrl})
      .then(incoming_phone_number =>{
        console.log(incoming_phone_number.friendlyName)
        response.setStatusCode(200);
        return callback(null, response);
      } );
  
      
  
    }
    else{
      response.setStatusCode(404)
      return callback(response)
    }
    
  
  };