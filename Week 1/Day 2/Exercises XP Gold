
# Exercise 1: Concatenate lists
first_list = [1, 2, 3]
second_list = [4, 5, 6]
concatenated_list = first_list.copy()
concatenated_list.extend(second_list)
print("Exercise 1:", concatenated_list)


# Exercise 2: Range of numbers
print("\nExercise 2:")
for number in range(1500, 2501):
	if number % 5 == 0 and number % 7 == 0:
		print(number)


# Exercise 3: Check the index
print("\nExercise 3:")
names = ["Samus", "Cortana", "V", "Link", "Mario", "Cortana", "Samus"]
searched_name = input("Enter a name: ")
if searched_name in names:
	print("First occurrence index:", names.index(searched_name))
else:
	print(f"{searched_name} is not in the names list.")


# Exercise 4: Greatest number
print("\nExercise 4:")
numbers = [
	float(input("Input the 1st number: ")),
	float(input("Input the 2nd number: ")),
	float(input("Input the 3rd number: ")),
]
print("The greatest number is:", max(numbers))


# Exercise 5: The alphabet
print("\nExercise 5:")
alphabet = "abcdefghijklmnopqrstuvwxyz"
vowels = "aeiou"
for letter in alphabet:
	kind = "vowel" if letter in vowels else "consonant"
	print(f"{letter} is a {kind}.")


# Exercise 6: Words and letters
print("\nExercise 6:")
words = []
for word_number in range(1, 8):
	words.append(input(f"Enter word {word_number}: "))

letter = input("Enter a single character: ")
while len(letter) != 1:
	print("Please enter exactly one character.")
	letter = input("Enter a single character: ")

for word in words:
	letter_index = word.find(letter)
	if letter_index == -1:
		print(f"The letter '{letter}' is not in '{word}'.")
	else:
		print(f"The first '{letter}' in '{word}' is at index {letter_index}.")


# Exercise 7: Min, max, and sum
print("\nExercise 7:")
million_numbers = list(range(1, 1_000_001))
print("Minimum:", min(million_numbers))
print("Maximum:", max(million_numbers))
print("Sum:", sum(million_numbers))


# Exercise 8: List and tuple
print("\nExercise 8:")
number_sequence = input("Enter comma-separated numbers: ")
number_list = number_sequence.split(",")
number_tuple = tuple(number_list)
print(number_list)
print(number_tuple)


# Exercise 9: Random number
print("\nExercise 9:")
import random

games_won = 0
games_lost = 0

while True:
	guess = input("Guess a number from 1 to 9, or type 'quit': ").strip()
	if guess.lower() == "quit":
		break
	if not guess.isdigit() or not 1 <= int(guess) <= 9:
		print("Please enter a whole number from 1 to 9.")
		continue

	random_number = random.randint(1, 9)
	if int(guess) == random_number:
		print("Winner")
		games_won += 1
	else:
		print(f"Better luck next time. The number was {random_number}.")
		games_lost += 1

print("Games won:", games_won)
print("Games lost:", games_lost)
