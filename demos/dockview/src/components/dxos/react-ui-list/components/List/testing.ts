import { faker } from "@faker-js/faker"

export const TestItemSchema: any = {
  id: "fake-id",
  name: "fake-name",
}

export const TestList = [TestItemSchema]

export const createList = (n = 10) => ({
  items: faker.helpers.multiple(
    () => ({
      id: faker.string.uuid(),
      name: faker.commerce.productName(),
    }),
    { count: n },
  ),
})
