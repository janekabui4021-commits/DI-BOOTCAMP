# Exercise 1: Return the Largest Number
def find_largest(numbers):
    return max(numbers)
print(find_largest([3, 7, 2, 9, 1]))

# Exercise 2: Check for Letter in Word
def check_letter(word, letter):
    return letter in word
print(check_letter("hello", "e"))


# Exercise 3: Count to a Number
def count_to_number(n):
    for i in range(1, n + 1):
        print(i)

print(count_to_number(5))