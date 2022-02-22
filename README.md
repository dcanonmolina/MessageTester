# MessageTester
This project connects to your Twilio Account and allows you to send and receive SMS or Whatsapp Messages

## Structure
This project runs using Twilio Functions and React. Some of the functionalities are:

## Functionalities
- List account Phone numbers
- Send SMS/Whatsapp (Outbound Whatsapp messages are conditioned to approved templates)
- Receive messages, if the incoming webhook are set to the project 

## Configuration
Please make a copy of .env.example and name it as .env
The variables to set are:
* ACCOUNT_SID
* AUTH_TOKEN

* TWILIO_API_SECRET
* TWILIO_API_KEY
* TWILIO_ACCOUNT_SID
* TWILIO_SYNC_SERVICE_SID
* ExpirationSeconds
* password

## Test and Deploy
To run on local, you will need to build the project 

- `npm run build`: To compile the react files
- `npm start`: To start the project on local

To deploy, please:
- `npm run predeploy`: To compile the react files and references
- `twilio serverless:deploy --override-existing-project --force --runtime=node14`: To deploy the project in your Twilio account
