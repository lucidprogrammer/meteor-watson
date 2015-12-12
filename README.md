
## Text to Speech
Provide a text, "How are you?", it gets converted to corresponding voice using IBM Watson Text to Speech Service.
## Setting up.
Go to IBM Bluemix and setup an account (it is free for 30 days) and enable Text to Speech.
meteor add lucidprogrammer:meteor-watson
Following environment variables are needed.
WatsonSpeechFromTextUsername
WatsonSpeechFromTextPassword
WatsonSpeechFromTextDirectory  (this is where the voice files will get saved.)

From the client, you can just call, Meteor.call("text/to-speech","Hello how are you");

## Contributing - Additional Watson features.
It is easy to add additional features supporting all other watson services, refer to watson.js.
