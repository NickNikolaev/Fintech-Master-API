const jsonTransform = require('node-json-transform');

const transform = (data, schema) => {
  // If schema contains one of the properties of map schema -> Transform data
  const mapSchemaProperties = ['item', 'remove', 'list', 'defaults', 'operate', 'each'];
  const singleTypeSchema = Object.keys(schema).some((key) => mapSchemaProperties.includes(key));
  if (singleTypeSchema) return jsonTransform.transform(data, schema);

  // If "data" is not array -> Turn it into one, else -> Leave it
  const arrayOfData = !Array.isArray(data) ? [data] : data;

  // Transform data, depending on schema type
  return arrayOfData.map((object) => {
    const objectSchema = schema[object.type];
    return jsonTransform.transform(object, objectSchema);
  });
};

module.exports = transform;
