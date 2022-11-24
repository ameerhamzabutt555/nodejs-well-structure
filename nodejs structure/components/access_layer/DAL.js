/**
 * this is the data access layer file this file will be used for
 * for interaction with the database
 */
const dataAccessLayer = (Model) => ({
  // create document in DB
  create: (body) => Model.create(body),

  // find document by id
  findById: (id) => Model.findById(id),

  // find specific document
  findOne: (query) => Model.findOne(query),

  // find all documents
  find: (query) => Model.find(query),

  // find by ID and update document
  findByIdAndUpdate: (id, body) => Model.findByIdAndUpdate(id, body, { new: true }),

  // find by ID and delete document
  findByIdAndDelete: (id) => Model.findByIdAndDelete(id),

  // find by specific doc and Update
  findOneAndUpdate: (id, body) => Model.findOneAndUpdate(id, body, { new: true }),
});

module.exports = {
  dataAccessLayer,
};
