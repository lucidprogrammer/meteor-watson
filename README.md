[![wercker status](https://app.wercker.com/status/20f397f1d478891979d4b3acff73ea18/s/master "wercker status")](https://app.wercker.com/project/bykey/20f397f1d478891979d4b3acff73ea18)

## Overview

A meteor package for IBM Watson service.

## Text to Speech
Provide a text, "How are you?", it gets converted to corresponding voice using IBM Watson Text to Speech Service.
## Setting up.
Go to IBM Bluemix and setup an account (it is free for 30 days) and enable Text to Speech.

```
meteor add lucidprogrammer:meteor-watson
```
Following environment variables are needed.
```
export WatsonSpeechFromTextUsername="username"
export WatsonSpeechFromTextPassword="pwd"
//(this is where the voice files will get saved.)
export WatsonSpeechFromTextDirectory="/path/to/dir"
```

From the client, you can just call, Meteor.call("text/to-speech","Hello how are you");

## Additional Watson features.
It is easy to add additional features supporting all other watson services, refer to watson.js.
