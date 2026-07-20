import { faker } from '@faker-js/faker';

export class RandomDataGenerator {
  static getFirstName(): string {
    return faker.person.firstName();
  }

  static getLastName(): string {
    return faker.person.lastName();
  }

  static getFullName(): string {
    return faker.person.fullName();
  }

  static getEmail(): string {
    return faker.internet.email();
  }

  static getPhoneNumber(): string {
    return faker.string.numeric(10);
  }

  static getJobTitle(): string {
    return faker.person.jobTitle();
  }

  static getRandomNumber(min: number, max: number): number {
    return faker.number.int({ min, max });
  }

  static getRandomString(length: number = 10): string {
    return faker.string.alphanumeric(length);
  }
}
