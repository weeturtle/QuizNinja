import { SubjectPartial, SubjectsPartial } from '../../prisma/zod';
import { MapToOpject } from '../Levenshtein/mapToObject';

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

  const mapped = MapToOpject<SubjectPartial>(subjects, (subject) => subject.name, searchTerm);

  const filtered = mapped.filter(subject => 
    subject.levDistance < 3 ||
    subject.data.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sorted = filtered.sort((a, b) => a.levDistance - b.levDistance);

  return sorted.map(subject => subject.data);
};


export default class SubjectSelectHandler {
  constructor(private subjects: SubjectsPartial) {}

  getSubjectNameFromId = (id: string) => getSubjectNameFromId(id, this.subjects);
  getSubjectsIdFromName = (name: string) => getSubjectsIdFromName(name, this.subjects);
  filterFunction = (searchTerm: string) => filterFunction(searchTerm, this.subjects);
}