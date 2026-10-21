

import math
import random


# Exercise 1: Formula
print("Exercise 1: Formula")
data = input("Enter comma-separated values for D: ")
values = [float(value.strip()) for value in data.split(",") if value.strip()]
results = [round(math.sqrt((2 * 50 * value) / 30)) for value in values]
print("Results:", ",".join(str(result) for result in results))


# Exercise 2: List of integers
print("\nExercise 2: List of integers")
numbers = [3, 47, 99, -80, 22, 97, 54, -23, 5, 7]
print("Numbers:", numbers)
print("Descending:", sorted(numbers, reverse=True))
print("Sum:", sum(numbers))
print("First and last:", [numbers[0], numbers[-1]])
print("Greater than 50:", [number for number in numbers if number > 50])
print("Smaller than 10:", [number for number in numbers if number < 10])
print("Squared:", [number ** 2 for number in numbers])
unique_numbers = list(dict.fromkeys(numbers))
print("Without duplicates:", unique_numbers)
print("Number of unique values:", len(unique_numbers))
print("Average:", sum(numbers) / len(numbers))
print("Largest:", max(numbers))
print("Smallest:", min(numbers))


# Exercise 2 bonus: calculate statistics without built-in sum, max, or min.
total = 0
largest = numbers[0]
smallest = numbers[0]
for number in numbers:
	total += number
	if number > largest:
		largest = number
	if number < smallest:
		smallest = number
print("Bonus sum:", total)
print("Bonus average:", total / len(numbers))
print("Bonus largest:", largest)
print("Bonus smallest:", smallest)


# Exercise 2 bonuses: generate a random list of at least 50 integers.
random_count = random.randint(50, 100)
random_numbers = [random.randint(-100, 100) for _ in range(random_count)]
print("Random numbers:", random_numbers)
print("Random count:", len(random_numbers))
print("Random list works with a count other than 10:", len(random_numbers) != 10)


# Exercise 3: Working on a paragraph
print("\nExercise 3: Working on a paragraph")
paragraph = (
	"Learning to program is a creative process. "
	"Small experiments help us understand how ideas become working software. "
	"With practice, careful questions and useful feedback, difficult problems become manageable."
)
words = paragraph.split()
normalized_words = [word.strip(".,!?;:").lower() for word in words]
sentences = [sentence for sentence in paragraph.split(".") if sentence.strip()]
unique_words = set(normalized_words)
non_whitespace_characters = sum(not character.isspace() for character in paragraph)
print("Characters:", len(paragraph))
print("Sentences:", len(sentences))
print("Words:", len(words))
print("Unique words:", len(unique_words))
print("Non-whitespace characters:", non_whitespace_characters)
print("Average words per sentence:", len(words) / len(sentences))
print("Non-unique words:", len(words) - len(unique_words))


# Exercise 4: Frequency of the words
print("\nExercise 4: Frequency of the words")
text = input("Enter a sentence: ")
frequencies = {}
for word in text.split():
	frequencies[word] = frequencies.get(word, 0) + 1

for word in sorted(frequencies):
	print(f"{word}:{frequencies[word]}")
