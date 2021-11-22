const mongoose = require("mongoose");
const { Schema } = mongoose;
const Review = require("./review");

const opts = { toJSON: { virtuals: true } };
const ImageSchema = new Schema({
  url: String,
  filename: String,
});

ImageSchema.virtual("thumbnail").get(function () {
  return this.url.replace("/upload", "/upload/w_200");
});

const PlaceSchema = new Schema(
  {
    title: String,
    images: [ImageSchema],
    description: String,
    location: String,
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
  },
  opts
);

PlaceSchema.virtual("properties.popUpMarker").get(function () {
  return `
    <strong><a href="/places/${this._id}">${this.title}</a></strong>
    <p>${this.description.substring(0, 20)}...</p`;
});

PlaceSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    await Review.remove({
      _id: {
        $in: doc.reviews,
      },
    });
  }
});

module.exports = mongoose.model("Place", PlaceSchema);
