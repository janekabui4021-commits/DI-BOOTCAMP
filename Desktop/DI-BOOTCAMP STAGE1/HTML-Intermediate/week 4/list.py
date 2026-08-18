# Task 1: Print all values one by one
for num in [1, 2, 3, 4]:
    print(num)

# Task 2: Print all values multiplied by 20
for num in [1, 2, 3, 4]:
    print(num * 20)

# Task 3: First letter of each name
names = ["Elie", "Tim", "Matt"]
first_letters = [name[0] for name in names]
print(first_letters)

# Task 4: Filter even values
numbers = [1, 2, 3, 4, 5, 6]
evens = [num for num in numbers if num % 2 == 0]
print(evens)

# Task 5: Values present in both lists
list1 = [1, 2, 3, 4]
list2 = [3, 4, 5, 6]
intersection = [val for val in list1 if val in list2]
print(intersection)

# Task 6: Words reversed and in lowercase
words = ["Elie", "Tim", "Matt"]
reversed_words = [word[::-1].lower() for word in words]
print(reversed_words)

# Task 7: Letters present in both strings
s1, s2 = "first", "third"
common_letters = [letter for letter in s1 if letter in s2]
print(common_letters)

# Task 8: Numbers divisible by 12 between 1 and 100
divisible_by_12 = [num for num in range(1, 101) if num % 12 == 0]
print(divisible_by_12)

# Task 9: Remove vowels from "amazing"
no_vowels = [char for char in "amazing" if char not in "aeiou"]
print(no_vowels)

# Task 10: 3x3 nested list
nested_3x3 = [[i for i in range(3)] for _ in range(3)]
print(nested_3x3)

# Task 11: 10x10 nested list
nested_10x10 = [[i for i in range(10)] for _ in range(10)]
print(nested_10x10)