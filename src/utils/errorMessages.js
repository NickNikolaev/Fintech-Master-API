const errorMessages = {
  NOT_FOUND: (objectType, objectId) => `${objectType.toUpperCase()} ${objectId} is not found`,
};

module.exports = errorMessages;
