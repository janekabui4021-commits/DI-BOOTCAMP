# Exercise 1: Birthday Look-up

# 1 & 2. Create and initialize the birthdays dictionary
birthdays = {
    "Alice": "1995/04/12",
    "Bob": "1988/11/23",
    "Charlie": "2001/01/05",
    "Diana": "1992/07/19",
    "Ethan": "1999/09/30",
}

# 3. Print a welcome message
print("Welcome! You can look up the birthdays of the people in the list!")

# Ask the user for a name
name = input("Please enter a person's name: ")

# Get and print the birthday
birthday = birthdays[name]
print(f"{name}'s birthday is {birthday}.")
# Exercise 2: Birthdays Advanced

birthdays = {
    "Alice": "1995/04/12",
    "Bob": "1988/11/23",
    "Charlie": "2001/01/05",
    "Diana": "1992/07/19",
    "Ethan": "1999/09/30",
}

print("Welcome! You can look up the birthdays of the following people:")
# Print all names in the dictionary
for name in birthdays.keys():
    print(f"- {name}")

search_name = input("\nPlease enter a person's name: ")

# Check if name exists before accessing
if search_name in birthdays:
    print(f"{search_name}'s birthday is {birthdays[search_name]}.")
else:
    print(f"Sorry, we don't have the birthday information for {search_name}")

# Exercise 3: Add Your Own Birthday

birthdays = {
    "Alice": "1995/04/12",
    "Bob": "1988/11/23",
    "Charlie": "2001/01/05",
    "Diana": "1992/07/19",
    "Ethan": "1999/09/30",
}

# Ask user to add a new person first
new_name = input("Enter a person's name to add: ")
new_birthday = input("Enter their birthday (YYYY/MM/DD): ")

# Add the new entry into the dictionary
birthdays[new_name] = new_birthday

# Print all names (includes the newly added one)
print("\nYou can look up the birthdays of the following people:")
for name in birthdays.keys():
    print(f"- {name}")

# Look up a name
search_name = input("\nPlease enter a person's name to look up: ")

if search_name in birthdays:
    print(f"{search_name}'s birthday is {birthdays[search_name]}.")
else:
    print(f"Sorry, we don’t have the birthday information for {search_name}")
# Exercise 4: Fruit Shop

# Part 1: Print items and prices in a sentence
items_simple = {"banana": 4, "apple": 2, "orange": 1.5, "pear": 3}

for item, price in items_simple.items():
    print(f"The price of a {item} is ${price}.")

print("\n" + "=" * 30 + "\n")

# Part 2: Calculate total cost of everything in stock
items_nested = {
    "banana": {"price": 4, "stock": 10},
    "apple": {"price": 2, "stock": 5},
    "orange": {"price": 1.5, "stock": 24},
    "pear": {"price": 3, "stock": 1},
}

total_cost = 0

for item, info in items_nested.items():
    item_total = info["price"] * info["stock"]
    total_cost += item_total

print(f"The total cost to buy everything in stock is ${total_cost}")