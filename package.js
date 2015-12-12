Package.describe({
  name:"lucidprogrammer:meteor-watson",
  summary : "IBM Watson for usage from meteor applications.",
  version: "0.1.0",
  git: "https://github.com/lucidprogrammer/meteor-watson.git",
  documentation: "README.md"
});
// https://www.npmjs.com/package/watson-developer-cloud
Npm.depends({
  "watson-developer-cloud" : "1.0.5"
});


Package.onUse(function(api){
  api.versionsFrom("1.2.1");
  var packages = [
    "ecmascript"
  ];
  api.use(packages,["server"]);
  api.imply(packages,["server"]);
  api.addFiles(["lib/server/watson.js"],["server"]);
  api.export("watson",["server"]);
  api.addFiles(["lib/server/methods.js"],["server"]);
});

Package.onTest(function(api) {
  api.use("sanjo:jasmine@0.20.3");
  //package to be tested
  api.use("lucidprogrammer:meteor-watson");
  api.use("practicalmeteor:sinon@1.14.1_2")
  // https://meteor-testing.readme.io/docs/jasmine-testing-modes
  // Server Unit Test Mode not working yet, so in integration mode
  api.addFiles("tests/server/watson-spec.js", "server");
});
