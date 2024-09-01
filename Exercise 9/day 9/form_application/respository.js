const messages = [{ id: 0, message: "this is 0 message" }];

const getAll = () => messages;

const getById = (id) => messages[id];

const create = (message) => {
  messages.push({ id: messages.length, message });
};

const update = (id, updatedMessage) => {
  messages[id].message = updatedMessage;
};

const deleteMessage = (id) => {
  messages.splice(id, 1);
};

module.exports = { getAll, getById, create, update, delete: deleteMessage };
