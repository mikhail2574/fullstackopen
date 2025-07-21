export const getAllPersons = () => Person.find({});
export const getPersonById = (id) => Person.findById(id);
export const countPersons = () => Person.countDocuments({});
export const createPerson = (data) => new Person(data).save();
export const deletePerson = (id) => Person.findByIdAndDelete(id);
export const updatePerson = (id, data) =>
  Person.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
    context: "query",
  });

export default Person;
