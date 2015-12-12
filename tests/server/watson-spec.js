
var fs = Npm.require("fs");
describe("getExtensionFromType", function() {
  it("wav", function() {
    var w = new watson();
    expect(w.getExtensionFromType("audio/wav")).toBe(".wav");
  });
  it("ogg", function() {
    var w = new watson();
    expect(w.getExtensionFromType("audio/ogg; codecs=opus")).toBe(".ogg");
  });
  it("flac", function() {
    var w = new watson();
    expect(w.getExtensionFromType("audio/flac")).toBe(".flac");
  });
});


// Asynchronous getSpeechFromText function tests
describe("getSpeechFromText", function(){
  var username = process.env.WatsonSpeechFromTextUsername;
  var password = process.env.WatsonSpeechFromTextPassword;
  var file;
  if (typeof(username) !== "undefined" && typeof(password) !== "undefined") {
    //This spec will not start until the done function is called in the call to beforeEach.
    beforeEach(function(done) {
      var w = new watson();
      w.text_to_speech_init(username,password);
      var callback = Meteor.bindEnvironment(function (result) {
        file = result;
        //specs will start now - it() blocks
        done();
      });
      //We are not passing an extension, so it should be saved as .wav file
      w.getSpeechFromText("hello",{directory:"./"},callback);
    });
    afterEach(function() {
      fs.unlinkSync(file);
    });

    it("convert text to voice", function(done) {
      var fstats = fs.statSync(file);
      expect(fstats.isFile()).toBe(true);
      //spec will not complete until its done is called.
      done();
    });
    it("file extension check", function(done) {
      expect(file.endsWith(".wav")).toBe(true);
      //spec will not complete until its done is called.
      done();
    });
  }else {
    it("convert text to voice - not tested - no env",function(){
      expect(true).toBe(true);
    });
    it("file extenstion check - not tested - no env",function(){
      expect(true).toBe(true);
    });
  }
});
