import { SubjectPartial, SubjectsPartial } from '../../prisma/zod';
import { MapToOpject } from '../Levenshtein/mapToObject';

// Returns the subject name matching the subject's id
export const getSubjectNameFromId = (id: string, subjects: SubjectsPartial) => {
  // If the id is not present, return an empty string
  if (!id) return '';

  // Finds the subject in the subjects list
  // Where the subject id matches the id parameter
  const subject = subjects.find(subject => subject.id === id);

  // If the subject is not found, return an empty string
  // Else return the subject name
  return subject ? subject.name : '';
};

// Returns the subject id matching the subject's name
export const getSubjectsIdFromName = (name: string, subjects: SubjectsPartial) => {
  // If the name is not present, return an empty string
  if (!name) return '';

  // Finds the subject in the subjects list
  // Where the subject name matches the name parameter
  const subject = subjects.find(subject => subject.name === name);

  // If the subject is not found, return an empty string
  // Else return the subject id
  return subject ? subject.id : '';
};

// Returns an array of subjects matching the search term
export const filterFunction = (searchTerm: string, subjects: SubjectsPartial) => {
  // If the search term is not present, return the whole subjects list
  if (!searchTerm) return subjects;

  // Maps the subjects list to an object containing the subject and the levenshtein distance
  const mapped = MapToOpject<SubjectPartial>(subjects, (subject) => subject.name, searchTerm);

  // Returns the subjects list filtered by the levenshtein distance
  // The levenshtein distance is less than 3
  // Or if the name includes the search term
  const filtered = mapped.filter(subject => 
    subject.levDistance < 3 ||
    subject.data.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sorts the filtered subjects list by the levenshtein distance
  const sorted = filtered.sort((a, b) => a.levDistance - b.levDistance);

  // Returns the sorted filtered subjects list
  // Removes the levenshtein distance from the object
  return sorted.map(subject => subject.data);
};

// Uses a class to store the subjects array
// Makes it easier to use the subjects array in the component
export default class SubjectSelectHandler {
  // Takes the subjects array as a parameter
  // Stores it as a private class property
  constructor(private subjects: SubjectsPartial) {}

  // Exports the functions as public class methods
  getSubjectNameFromId = (id: string) => getSubjectNameFromId(id, this.subjects);
  getSubjectsIdFromName = (name: string) => getSubjectsIdFromName(name, this.subjects);
  filterFunction = (searchTerm: string) => filterFunction(searchTerm, this.subjects);
}