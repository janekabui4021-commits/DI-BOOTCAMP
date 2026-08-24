
# Challenge 1: Multiples of a Number
number = int(input("Enter a number: "))
length = int(input("Enter the length: "))
multiples = []

for multiplier in range(1, length + 1):
	multiples.append(number * multiplier)

print("Multiples:", multiples)


# Challenge 2: Remove Consecutive Duplicate Letters
user_string = input("Enter a string: ")
without_consecutive_duplicates = ""

for character in user_string:
	if not without_consecutive_duplicates or character != without_consecutive_duplicates[-1]:
		without_consecutive_duplicates += character

print("Without consecutive duplicates:", without_consecutive_duplicates)
