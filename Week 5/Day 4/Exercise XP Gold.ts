// Exercise 1: TypeScript Generics and Intersection Types

class Container<T> {
  private items: T[] = [];

  add(item: T): void {
    this.items.push(item);
  }

  remove(item: T): void {
    this.items = this.items.filter((i) => i !== item);
  }

  list(): T[] {
    return this.items;
  }
}

type Identifiable = { id: number };
type Nameable = { name: string };

type User = Identifiable & Nameable;

const userContainer = new Container<User>();
userContainer.add({ id: 1, name: "Alice" });
userContainer.add({ id: 2, name: "Bob" });

console.log(userContainer.list());

// Exercise 2: Generic Interfaces and Type Casting
interface ResponseData<T> {
  status: number;
  message: string;
  data: unknown;
}

function parseResponse<T>(response: ResponseData<T>): T {
  return response.data as T;
}

interface UserProfile {
  id: number;
  username: string;
}

const apiResponse: ResponseData<UserProfile> = {
  status: 200,
  message: "Success",
  data: { id: 101, username: "dev_ninja" }
};

const profile = parseResponse<UserProfile>(apiResponse);
console.log(profile.username);

// Exercise 3: Generic Classes and Type Assertions
class Repository<T> {
  private items: unknown[] = [];

  add(item: T): void {
    this.items.push(item);
  }

  retrieve(index: number): T {
    const item = this.items[index];
    if (item === undefined) {
      throw new Error("Item not found");
    }
    return item as T;
  }
  list(): T[] {
    return this.items as T[];
  }
}
interface Product {
  id: string;
  price: number;
}

const repo = new Repository<Product>();
repo.add({ id: "P123", price: 99.99 });

const item = repo.retrieve(0);
console.log(item.id, item.price);