import { SubjectsPartial } from '../../prisma/zod';
import levenshteinDistance from '../Levenshtein';

export const getSubjectNameFromId = (id: string, subjects: SubjectsPartial) => {
  if (!id) return '';

  const subject = subjects.find(subject => subject.id === id);
  return subject ? subject.name : '';
};

export const getSubjectsIdFromName = (name: string, subjects: SubjectsPartial) => {
  if (!name) return '';

  const subject = subjects.find(subject => subject.name === name);
  return subject ? subject.id : '';
};

export const filterFunction = (searchTerm: string, subjects: SubjectsPartial) => {
  if (!searchTerm) return subjects;

  const filteredSubjects = subjects.filter(subject =>
    levenshteinDistance(subject.name.slice(0, searchTerm.length).toLowerCase(), searchTerm.toLowerCase()) < 2 ||
    subject.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return filteredSubjects;
};

export default class SubjectSelectHandler {
  constructor(private subjects: SubjectsPartial) {}

  getSubjectNameFromId = (id: string) => getSubjectNameFromId(id, this.subjects);
  getSubjectsIdFromName = (name: string) => getSubjectsIdFromName(name, this.subjects);
  filterFunction = (searchTerm: string) => filterFunction(searchTerm, this.subjects);
}