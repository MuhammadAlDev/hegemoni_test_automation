export const loginData = [
    {
        scenario: 'invalid email',
        email: 'wrong@example.com',
        password: 'Password123'
    },
    {
        scenario: 'invalid password',
        email: 'valid@example.com',
        password: 'wrongPassword'
    },
    {
        scenario: 'empty email',
        email: '',
        password: 'Password123'
    },
    {
        scenario: 'empty password',
        email: 'valid@example.com',
        password: ''
    }
];

