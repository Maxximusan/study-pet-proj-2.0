const Contact = require("../../models/contacts");

const getAllContacts = async (req, res, next) => {
  const contacts = await Contact.find({}, "name phone"); // получаем только нужные поля (если нужны все - пусто в find); также есть альтернативные варианты!

  res.json({
    status: "success",
    code: 200,
    data: {
      result: contacts,
    },
  });
};

const contactByIdGet = async (req, res, next) => {
  // console.log(req.params);
  // console.log(req.params.contactId);

  const { contactId } = req.params;
  const result = await Contact.findById(contactId);

  if (!result) {
    const error = new Error(`Contact with id=${contactId} not found`);
    error.status = 404;
    throw error;
    //понесет ошибку в app.js в обработчик (где 4 параметра) - это вместо:
    // res.status(404).json({
    //   status: "error",
    //   code: 404,
    //   message: `Contact with id=${contactId} not found`,
    // });
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

const contactRemove = async (req, res, next) => {
  const { contactId } = req.params;
  const necessaryContact = await Contact.findByIdAndDelete(contactId);

  if (!necessaryContact) {
    const error = new Error(
      `Contact with id=${contactId} not found for delete`
    );
    error.status = 404;
    throw error;
  }

  res.status(200).json({
    status: "success",
    code: 200,
    message: "contact deleted",
    data: {
      necessaryContact,
    },
  });
};

const contactAdd = async (req, res, next) => {
  const contact = await Contact.create(req.body);
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      contact,
    },
  });
};

const contactUpdate = async (req, res, next) => {
  const { contactId } = req.params;
  const necessaryContact = await Contact.findByIdAndUpdate(
    contactId,
    req.body,
    { new: true }
  );

  if (!necessaryContact) {
    const error = new Error(
      `Contact with id=${contactId} not found for update`
    );
    error.status = 404;
    throw error;
  }

  res.status(200).json({
    status: "success",
    code: 200,
    data: {
      necessaryContact,
    },
  });
};

const contactUpdateFavorite = async (req, res, next) => {
  const { contactId } = req.params;
  const necessaryContact = await Contact.findByIdAndUpdate(
    contactId,
    req.body,
    { new: true }
  );

  if (!necessaryContact) {
    const error = new Error(
      `Contact with id=${contactId} not found for update`
    );
    error.status = 404;
    throw error;
  }

  res.status(200).json({
    status: "success",
    code: 200,
    data: {
      necessaryContact,
    },
  });
};

module.exports = {
  getAllContacts,
  contactByIdGet,
  contactRemove,
  contactAdd,
  contactUpdate,
  contactUpdateFavorite,
};
