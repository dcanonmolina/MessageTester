exports.handler = function(context, event, callback) {
    const password = context.password;
    const response = new Twilio.Response();
    response.appendHeader("Access-Control-Allow-Origin","*");
    if(event.pwd && event.pwd === password)
    {
      let jsonFileNumbers = [];
      const twilioClient =  context.getTwilioClient();
      twilioClient.incomingPhoneNumbers
      .list({limit: 20})
      .then(incomingPhoneNumbers => {
        incomingPhoneNumbers.forEach(i =>jsonFileNumbers.push({ "phoneNumberID": i.sid , "number":i.phoneNumber,"webhook":i.smsUrl}));
       response.appendHeader("Content-Type","application/json");
        response.setBody(jsonFileNumbers);
        return callback(null, response);
      });
  
  
    }
    else{
      response.setStatusCode(404)
      return callback(response)
    }
  
  };