// 1. Define Types
type User = {
  type: 'user';
  name: string;
  age: number;
};

type Product = {
  type: 'product';
  id: number;
  price: number;
};

type Order = {
  type: 'order';
  orderId: string;
  amount: number;
};

type DataItem = User | Product | Order;

function isUser(item: DataItem): item is User {
  return item.type === 'user';
}

function isProduct(item: DataItem): item is Product {
  return item.type === 'product';
}

function isOrder(item: DataItem): item is Order {
  return item.type === 'order';
}

// 2. Implementation with unexpected case handling
function handleData(data: DataItem[]): string[] {
  return data.map((item) => {
    if (isUser(item)) {
      return `Hello ${item.name}, you are ${item.age} years old.`;
    } 
    
    if (isProduct(item)) {
      return `Product ID: ${item.id}, Price: $${item.price}.`;
    } 
    
    if (isOrder(item)) {
      return `Order ${item.orderId}: Total amount is $${item.amount}.`;
    }

    return 'Invalid data type encountered.';
  });
}

const sampleData: DataItem[] = [
  { type: 'user', name: 'Alice', age: 28 },
  { type: 'product', id: 101, price: 49.99 },
  { type: 'order', orderId: 'ORD-992', amount: 150.00 }
];

console.log(handleData(sampleData));