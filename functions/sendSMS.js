exports.handler = function(context, event, callback) {
 
    const password = context.password;
    const response = new Twilio.Response();
    response.appendHeader("Access-Control-Allow-Origin","*");
    response.appendHeader("Content-Type","application/json");
  
    if(event.pwd && event.pwd === password){
      let FromNumber = event.From;
      let ToNumber = event.To;
      let message = event.Message;
  
  
      if(FromNumber && ToNumber && message){
         const twilioClient =  context.getTwilioClient();
  
         twilioClient.messages
         .create({body: message, from: FromNumber, to: ToNumber})
         .then(message => {
           response.setBody({"messageSID":message.sid });
           return callback(null,response)
         })
         .catch(error => {
           response.setStatusCode(404)
           return callback(response)
         });
      }
    }
    else{
      response.setBody({});
      response.setStatusCode(404)
      return callback(response)
    }
  };