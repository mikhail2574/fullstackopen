import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const mongodb_password = process.env.MONGODB_PASSWORD;
const url = `mongodb+srv://mikhail2574:${mongodb_password}@cluster.8rjbn1y.mongodb.net/?retryWrites=true&w=majority&appName=cluster`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minLength: 3,
  },
  number: {
    minLength: 8,
    validate: {
      validator: (v) => /\d{2,3}-\d+/.test(v),
      message: (props) => `${props.value} is not a valid phone number!`,
    },
    type: String,
    required: true,
  },
});

const Person = mongoose.model("Person", personSchema);

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
