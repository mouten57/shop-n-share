//Unit testing checks a single component of an application.

var mongoose = require("mongoose");
require("../../db/models/User");
const User = mongoose.model("users");
var keys = require("../../config/keys/keys");
mongoose.connect(keys.mongoURI);

describe("Create a instance of testModel", function () {
  beforeEach(function () {});

  it("should create a User object with a valid profile from Google OAuth20", (done) => {
    const user = new User({
      googleId: 123,
      name: "Matt Outen",
      nickname: "Matt",
      image: "https://google.com/matt.jpg",
      token: "sampleToken",
    })
      .save()
      .then((user) => {
        expect(user.name).toBe("Matt Outen");
        expect(user.nickname).toBe("Matt");
        expect(user.googleId).toBe(123);
        expect(user.image).toBe("https://google.com/matt.jpg");
        done();
      })
      .then((user) => User.deleteOne({ googleId: 123 }))
      .catch((err) => {
        console.log(err);
        done();
      });
  });
  it("should not create a User with an invalid Google ID", (done) => {
    const user = new User({
      googleId: "string_not_numbers!",
      name: "This should fail",
      nickname: "fail",
    })
      .save()
      .then((user) => {
        //code here will not be evaluated
      })
      .catch((err) => {
        expect(err.message).toContain(
          "validation failed: googleId: Cast to Number failed"
        );
        done();
      });
  });
});
