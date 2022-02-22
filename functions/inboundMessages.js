// This is your new function. To start, set the name and path on the left.

let syncService;
let expirationTime;
let twilioClient;
let fileName;

exports.handler = async function(context, event, callback) {

  console.log('start')
  twilioClient = context.getTwilioClient();
  syncService = context.TWILIO_SYNC_SERVICE_SID;
  expirationTime = context.ExpirationSeconds;

  let date = new Date();
  fileName = `incoming_${date.toISOString().slice(0, 10)}`;

  try{
    console.log('fetching',syncService, fileName )
    let document = await twilioClient.sync.services(syncService)
                    .syncLists(fileName)
                    .fetch();
     await processInputDocument(document, event, callback)
  }
  catch(error){
    console.error(error);
    if(error.status ===404){
      await createDocument(event, callback);
    }
  }
};

async function processInputDocument(document, event, callback){

  let dateToday = new Date();
  let newInput = {
      "date": dateToday,
      "SID": event.MessageSid,
      "phoneNumber" : event.To,
      "from":event.From,
      "message":event.Body
  };

  try{
   
    await twilioClient.sync.services(syncService)
             .syncLists(document.sid)
             .syncListItems
             .create({data:newInput});
           
    const twiml = new Twilio.twiml.MessagingResponse();

    return  callback(
          null,
           twiml
        );
  }
  catch(error){
    return callback(error);
  }
}

async function createDocument(event, callback){
  try{
   
    let document = await twilioClient.sync.services(syncService)
             .syncLists
             .create({uniqueName: fileName, ttl:expirationTime});
    await processInputDocument(document, event, callback);
  }
  catch(error){
    return callback(error);
  }
}