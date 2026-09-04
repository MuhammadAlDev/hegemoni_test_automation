export function generateUser() {
  const timestamp = Date.now();

  return {
    name: `Playwright User ${timestamp}`,

    email: `playwright_${timestamp}@example.com`,

    password: 'Password123!',

    firstName: 'Playwright',

    lastName: 'Tester',

    company: 'QA Automation',

    address: '123 Automation Street',

    address2: 'Building A',

    country: 'Canada',

    state: 'Ontario',

    city: 'Toronto',

    zipcode: '12345',

    mobileNumber: '081234567890',
  };
}