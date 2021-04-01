const Employee = require('../lib/Employee');

test('Employee instance', () => {
    const e = new Employee();
    expect(typeof(e)).toBe('object');
});

test('Can set name via constructor arguments', () => {
    const name = 'Sofia';
    const e = new Employee(name);
    expect(e.name).toBe(name);
});