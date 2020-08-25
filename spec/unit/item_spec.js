//Unit testing checks a single component of an application.
var mongoose = require("mongoose");
require("../../db/models/User");
const User = mongoose.model("users");
require("../../db/models/Item");
const Item = mongoose.model("items");
var keys = require("../../config/keys/keys");
mongoose.connect(keys.mongoURI);

describe("Item", () => {
  beforeAll((done) => {
    this.user;
    this.item;
    new Item({
      product: "JasmineTest",
      qty: 1,
      unit: "ea",
      price: "$4.99",
      notes: "Some notes",
      dateAdded: "Dec 31, 2018 10:00am",
      _user: {
        googleId: 123,
        name: "Matt Outen",
        nickname: "Matt",
        image: "https://google.com/matt.jpg",
        token: "sampleToken",
      },
      purchased: true,
    })
      .save()
      .then((item) => {
        this.item = item;
        done();
      })
      .catch((err) => console.log(err));
    new User({
      googleId: 123,
      name: "Matt Outen",
      nickname: "Matt",
      image: "https://google.com/matt.jpg",
      token: "sampleToken",
    })
      .save()
      .then((user) => {
        this.user = user;
        done();
      })
      .catch((err) => {
        console.log(err);
      });
  });
  afterAll(async (done) => {
    await Item.deleteMany({ product: "JasmineTest" });
    await User.deleteMany({ googleId: 123 });
    try {
      done();
    } catch (err) {
      console.log(err);
    }
  });
  describe("#create()", () => {
    it("should create a new item with product name, quantity, unit, and price", async (done) => {
      const item = await new Item({
        product: "JasmineTest",
        qty: 2,
        unit: "ea",
        price: "$4.99",
        notes: "Some notes",
        dateAdded: "Dec 31, 2018 10:00am",
        _user: {
          googleId: 123,
          name: "Matt Outen",
          nickname: "Matt",
          image: "https://google.com/matt.jpg",
          token: "sampleToken",
        },
        purchased: false,
      }).save();
      try {
        expect(item.product).toBe("JasmineTest");
        done();
      } catch (err) {
        console.log(err);
      }
    });
    it("should throw an error if quantity is not a number", async (done) => {
      const item = await new Item({
        product: "JasmineTest",
        qty: "one",
      })
        .save()
        .then((item) => {
          //should be skipped
        })

        .catch((err) => {
          expect(err.message).toContain(
            'items validation failed: qty: Cast to Number failed for value "one" at path "qty"'
          );
          done();
        });
    });
  });
  describe("#show()", () => {
    it("should show all the items", async (done) => {
      const item = await Item.find({ product: "JasmineTest" });
      try {
        expect(item.length).toBe(2);
        done();
      } catch (err) {
        console.log(err);
      }
    });
    it("should show list of purchased items", async (done) => {
      const item = await Item.find({ product: "JasmineTest", purchased: true });
      try {
        expect(item.length).toBe(1);
        expect(item[0].purchased).toBe(true);
        done();
      } catch (err) {
        console.log(err);
      }
    });
    it("should show list of non-purchased items", async (done) => {
      const item = await Item.find({
        product: "JasmineTest",
        purchased: false,
      });
      try {
        expect(item.length).toBe(1);
        expect(item[0].purchased).toBe(false);
        done();
      } catch (err) {
        console.log(err);
      }
    });
    it("should show the name of the user who created the item", async (done) => {
      const item = await Item.find({ product: "JasmineTest" });
      try {
        expect(item[0]._user.name).toBe("Matt Outen");
        done();
      } catch (err) {
        console.log(err);
      }
    });
  });
});
