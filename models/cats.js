const { Schema, model } = require("mongoose");

const handleSchemaErrors = require("../helpers/handleSchemaErrors");

const likedCatsSchema = new Schema(
  {
    imageUrl: {
      type: String,
      required: true,
    },
    breed: {
      type: String,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: true }
);

likedCatsSchema.post("save", handleSchemaErrors);

const Cat = model("cat", likedCatsSchema);

module.exports = Cat;
