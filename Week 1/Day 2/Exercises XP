"""Solutions for the Day 2 Exercises XP."""


# Exercise 1: Favorite Numbers
my_fav_numbers = {3, 7, 12}
my_fav_numbers.add(21)
my_fav_numbers.add(42)
my_fav_numbers.remove(42)

friend_fav_numbers = {5, 7, 18}
our_fav_numbers = my_fav_numbers.union(friend_fav_numbers)

print("My favorite numbers:", my_fav_numbers)
print("My friend's favorite numbers:", friend_fav_numbers)
print("Our favorite numbers:", our_fav_numbers)


# Exercise 2: Tuple
numbers = (1, 2, 3)
try:
	numbers[0] = 4
except TypeError as error:
	print("Tuples are immutable:", error)

# Concatenation creates a new tuple; it does not change the original tuple.
new_numbers = numbers + (4, 5)
print("New tuple:", new_numbers)


# Exercise 3: List Manipulation
basket = ["Banana", "Apples", "Oranges", "Blueberries"]
basket.remove("Banana")
basket.remove("Blueberries")
basket.append("Kiwi")
basket.insert(0, "Apples")
print("Apples count:", basket.count("Apples"))
basket.clear()
print("Final basket:", basket)


# Exercise 4: Floats
# A float can contain a fractional part; an integer is a whole number.
mixed_numbers = [number / 2 for number in range(3, 11)]
print("Mixed numbers:", mixed_numbers)


# Exercise 5: For Loop
for number in range(1, 21):
	print(number)

for index, number in enumerate(range(1, 21)):
	if index % 2 == 0:
		print("Even index:", number)


# Exercise 6: While Loop
while True:
	name = input("Enter your name: ").strip()
	if name.isalpha() and len(name) >= 3:
		print("thank you")
		break
	print("Please enter a proper name.")


# Exercise 7: Favorite Fruits
favorite_fruits = input("Enter your favorite fruits, separated by spaces: ").lower().split()
chosen_fruit = input("Enter the name of any fruit: ").strip().lower()

if chosen_fruit in favorite_fruits:
	print("You chose one of your favorite fruits! Enjoy!")
else:
	print("You chose a new fruit. I hope you enjoy it!")


# Exercise 8: Pizza Toppings
toppings = []
total_cost = 10.0

while True:
	topping = input("Enter a pizza topping (or 'quit'): ").strip()
	if topping.lower() == "quit":
		break
	toppings.append(topping)
	total_cost += 2.50
	print(f"Adding {topping} to your pizza.")

print("Toppings:", toppings)
print(f"Total cost: ${total_cost:.2f}")


# Exercise 9: Cinemax Tickets
ages = []
while True:
	age_input = input("Enter an age for a movie ticket (or 'done'): ").strip()
	if age_input.lower() == "done":
		break
	if age_input.isdigit():
		ages.append(int(age_input))

total_ticket_cost = 0
for age in ages:
	if age < 3:
		total_ticket_cost += 0
	elif age <= 12:
		total_ticket_cost += 10
	else:
		total_ticket_cost += 15

print("Total ticket cost:", total_ticket_cost)


# Exercise 9 bonus: Restricted Movie
teenager_ages = []
while True:
	age_input = input("Enter an age for the restricted movie (or 'done'): ").strip()
	if age_input.lower() == "done":
		break
	if age_input.isdigit():
		teenager_ages.append(int(age_input))

allowed_attendees = [age for age in teenager_ages if 16 <= age <= 21]
print("Allowed attendees:", allowed_attendees)
