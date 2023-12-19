const course = {
    id: 123,
    organizer: 'Czechitas',
    name: 'Automatizace v testování: Webdriver.io',
    teacher: 'Monika',
    students: [
        'Adéla', 'Jana', 'Míša', 'Terka', 'Petr',
    ],
    greetAllStudents: function (greeting) {
        this.students.forEach(student => {
            console.log(`${greeting} ${student}`)
        });
    },
    greetTeacher: function(greeting) {
        console.log(`${greeting} ${this.teacher}`);
    }
}

console.log(course);
console.log(course.name);
course.greetTeacher('Nazdar');
course.greetAllStudents('Nazdar');
