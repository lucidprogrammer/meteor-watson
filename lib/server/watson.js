var fs = Npm.require("fs");
watson = class watson {

  constructor(options) {
    this.watson = Npm.require('watson-developer-cloud');
  }//constructor

  /**
  * @summary Initialise the Text to Speech watson facility.
  * @locus server
  * @method text_to_speech
  * @memeberOf watson
  * @param username watson text_to_speech service username
  * @param password watson text_to_speech service password
  */
  text_to_speech_init(username, password){
    this.text_to_speech = this.watson.text_to_speech({
      username: username,
      password: password,
      version: 'v1'
    });
    return this.text_to_speech;
  }//text_to_speech initialisation

  /**
  * @summary get the voice format from a given text
  * @locus server
  * @method text_to_speech
  * @memeberOf watson
  * @param text text which you want to convert to voice
  * @param {Object} options
  * @param {String} options.voice. Provide a watson voice type, default is en-GB_KateVoice. Refer to https://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/text-to-speech/api/v1/#synthesize
  * @param {String} options.accept. Default is audio/wav. Available "audio/ogg; codecs=opus" , "audio/wav" , "audio/flac"
  * @param {String} options.directory
  * @param {String} options.fileName
  */
  getSpeechFromText(text,options,callback){
    var params = {
      text: text,
      // voice: 'en-US_AllisonVoice', // Optional voice
      voice : options.voice || "en-GB_KateVoice",
      accept: options.accept || "audio/wav"
    };
    if(options.directory){
      var fstats = fs.statSync(options.directory);
      if(fstats.isDirectory()){
        if(this.text_to_speech){
          var extension = this.getExtensionFromType(params.accept);
          var file = options.fileName || new Meteor.Collection.ObjectID()._str + extension;
          file = options.directory + file;
          var stream = this.text_to_speech.synthesize(params).pipe(fs.createWriteStream(file));
          stream.on('finish', function () { callback(file); });
        } else{
          throw new Meteor.Error( 500, "Initialise text_to_speech service with your valid credentials first.Usage watson.text_to_speech_init(username, password)" );
        }

      } else {
        throw new Meteor.Error( 500, "options.directory "+options.directory+" does not exist. Provide a valid directory path." );
      }
    } else {
      throw new Meteor.Error( 500, "options.directory is not provided." );
    }


  }//getSpeechFromText

  getExtensionFromType(accept){
    var options = {accept:accept};
    var extension = options.accept === "audio/wav"? ".wav": (options.accept === "audio/ogg; codecs=opus" ? ".ogg" : (options.accept === "audio/flac"?".flac":null));
    return extension;
  }
}; //class watson
