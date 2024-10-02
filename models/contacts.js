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
  },
  // в базе будет отображаться дата создания и удаления
  { versionKey: false, timestamps: true }
);

contactSchema.post("save", handleSchemaErrors);

const Contact = model("contact", contactSchema);

module.exports = Contact;
