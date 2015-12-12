Future = Npm.require("fibers/future");
Meteor.methods({
  "text/to-speech": function(text){
    var fut = new Future();
    var username = process.env.WatsonSpeechFromTextUsername;
    var password = process.env.WatsonSpeechFromTextPassword;
    var directory = process.env.WatsonSpeechFromTextDirectory?process.env.WatsonSpeechFromTextDirectory:"./";
    if(username && password){
      var w = new watson();
      w.text_to_speech_init(username,password);
      w.getSpeechFromText(text,{directory:directory},function(result){fut.return(result);});
      return fut.wait();
  } else {
      throw new Meteor.Error( 500, "WatsonSpeechFromTextUsername, WatsonSpeechFromTextPassword - not found in environment." );
    }
  }//text/to-speech
});
