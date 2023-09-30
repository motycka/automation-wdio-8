class Course {

    constructor(name, teacher, date) {
        this._name = name;
        this._teacher = teacher;
        this._students = [];
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get teacher() {
        return this._teacher;
    }

    get students() {
        return this._students;
    }

    addStudent(studentName) {
        this._students.push(studentName);
    }
}


class AutomationCourse extends Course {

    constructor(start, end) {
        super('Automatizece WDIO', 'Monika');
        this.start = start
        this.end = end
    }

    get runDays() {
        const diff = Math.abs(Date.now() - startDate)
        return Math.ceil(diff / (1000 * 60 * 60 * 24));
    }

    get remainingDays() {
        const diff = Math.abs(endDate - Date.now())
        return Math.ceil( diff/ (1000 * 60 * 60 * 24));
    }
 }

const automation = new Course('Automatizace v testování: Webdriver.io', 'Monika', '2023-06-07');
console.log(automation);

const javaScript = new Course('JavaScript', 'Honza', '2023-06-07');
console.log(javaScript);

const testovani = new Course('Testovani', 'Honza', '2023-06-07');
console.log(testovani);

const automationCourse = new AutomationCourse('2023-06-07', '2023-06-07');
console.log(automationCourse);
