const { Schema, model } = require("mongoose");

const handleSchemaErrors = require("../helpers/handleSchemaErrors");

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  // в базе будет отображаться дата создания и удаления
  { versionKey: false, timestamps: true }
);

contactSchema.post("save", handleSchemaErrors);

const Contact = model("contact", contactSchema);

module.exports = Contact;
