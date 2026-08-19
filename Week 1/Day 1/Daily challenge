import random

user_string = input("Enter a string: ")

if len(user_string) < 10:
	print("String not long enough.")
elif len(user_string) > 10:
	print("String too long.")
else:
	print("Perfect string")
	print("First character:", user_string[0])
	print("Last character:", user_string[-1])

	progressive_string = ""
	for character in user_string:
		progressive_string += character
		print(progressive_string)

	jumble = list(user_string)
	random.shuffle(jumble)
	print("Jumbled string:", "".join(jumble))
