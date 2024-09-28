// ГОТОВОЕ;
const fs = require("fs/promises");
const path = require("path");
const { uid } = require("uid");

const contactsPath = path.resolve("./models/contacts.json");

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath, "utf8");
  const parsedContacts = JSON.parse(contacts);
  return parsedContacts;
};

// Мне не нужен для контактов моего Phonebook
const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const idContact = contacts.find(
    (contact) => contact.id === String(contactId)
  );

  return idContact;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const removedContact = contacts.find(
    (contact) => contact.id === contactId.toString()
  );
  const newListContacts = contacts.filter(
    (contact) => contact.id !== String(contactId)
  );
  await fs.writeFile(contactsPath, JSON.stringify(newListContacts));

  return removedContact;
};
//email мне ненужен для phоnebook
const addContact = async (body) => {
  const { name, phone } = body;

  const contacts = await listContacts();
  const newContacts = {
    id: uid(),
    name,
    phone,
  };
  contacts.push(newContacts);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return newContacts;
};

// Мне не нужен для контактов моего Phonebook
const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const necessaryContact = contacts.map((contact) => {
    const id = contact.id;

    if (id === contactId) {
      return {
        ...contact,
        ...body,
      };
    } else {
      return contact;
    }
  });
  await fs.writeFile(contactsPath, JSON.stringify(necessaryContact), "utf8");

  const newContact = necessaryContact.find(
    (contact) => contact.id === contactId
  );
  return newContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
