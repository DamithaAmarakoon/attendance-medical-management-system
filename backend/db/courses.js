const courses = [
  {
    code: 'CSC2213',
    name: 'Rapid Application Development',
    schedule: {
      day: 5,
      startTime: 15,
      duration: 2
    },
    lecturer: 'lec1'
  },
  {
    code: 'CSC2222',
    name: 'Computer Systems 2',
    schedule: {
      day: 4,
      startTime: 10,
      duration: 2
    },
    lecturer: 'lec2'
  },
  {
    code: 'CSC2233',
    name: 'Internet Programming',
    schedule: {
      day: 4,
      startTime: 15,
      duration: 2
    },
    lecturer: 'lec1'
  },
  {
    code: 'CSC2242',
    name: 'Advanced Database Management',
    schedule: {
      day: 4,
      startTime: 10,
      duration: 2
    },
    lecturer: 'lec2'
  },
  {
    code: 'CSC2252',
    name: 'Project Management',
    schedule: {
      day: 4,
      startTime: 10,
      duration: 2
    },
    lecturer: 'lec1'
  },
  {
    code: 'CSC2263',
    name: 'Multimedia and Video Production',
    schedule: {
      day: 4,
      startTime: 13,
      duration: 2
    },
    lecturer: 'lec2'
  },
  {
    code: 'CSC2272',
    name: 'Data and Network Security',
    schedule: {
      day: 4,
      startTime: 10,
      duration: 2
    },
    lecturer: 'lec1'
  }
];

const getCourses = () => courses;

const getCourse = code => courses.find(c => c.code === code);

const addCourse = course => courses.push(course);

module.exports = { getCourses, getCourse, addCourse };