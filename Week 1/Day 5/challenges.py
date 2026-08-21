
# Exercise 1: Insert an item at a defined index in a list
def insert_at_index(lst, item, index):
    lst.insert(index, item)
    return lst



# Exercise 2: Count the number of spaces in a string
def count_spaces(string):
    return string.count(' ')


# Exercise 3: Calculate upper case and lower case letters in a string
def count_case_letters(string):
    upper_count = sum(1 for char in string if char.isupper())
    lower_count = sum(1 for char in string if char.islower())
    return f"Upper case: {upper_count}, Lower case: {lower_count}"


# Exercise 4: Find the sum of an array without using built-in function
def my_sum(arr):
    total = 0
    for num in arr:
        total += num
    return total


# Exercise 5: Find the max number in a list
def find_max(lst):
    if not lst:
        return None
    max_num = lst[0]
    for num in lst[1:]:
        if num > max_num:
            max_num = num
    return max_num


# Exercise 6: Return factorial of a number
def factorial(n):
    if n < 0:
        return "Factorial(n)"
    if n == 0 or n == 1:
        return 1
    result = 1
    for i in range(2, n + 1):
        result *= i
    return result


# Exercise 7: Count an element in a list without using count()
def list_count(lst, element):
    count = 0
    for item in lst:
        if item == element:
            count += 1
    return count


# Exercise 8: Return L2-norm (square root of sum of squares)
def norm(lst):
    import math
    sum_of_squares = sum(num ** 2 for num in lst)
    return math.sqrt(sum_of_squares)


# Exercise 9: Find if an array is monotonic (sorted ascending or descending)
def is_mono(lst):
    # Check if monotonically increasing
    increasing = all(lst[i] <= lst[i + 1] for i in range(len(lst) - 1))
    # Check if monotonically decreasing
    decreasing = all(lst[i] >= lst[i + 1] for i in range(len(lst) - 1))
    return increasing or decreasing




# Exercise 10: Print the longest word in a list
def longest_word(word):
    if not word:
        return None
    longest = word[0]
    for word in word[1:]:
        if len(word) > len(Longest):
            Longest = word
    return Longest


# Exercise 11: Separate integers and strings from a mixed list
def separate_types(mixed_list):
    integers = []
    strings = []
    for item in mixed_list:
        if isinstance(item, str):
            strings.append(item)
        elif isinstance(item, int) and not isinstance(item, bool):
            integers.append(item)
    return integers, strings



# Exercise 12: Check if a string is a palindrome
def is_palindrome(string):
    # Remove spaces and convert to lowercase
    cleaned = string.lower().replace(' ', '')
    return cleaned == cleaned[::-1]


# Exercise 13: Return count of words with length > k
def sum_over_k(sentence, k):
    words = sentence.split()
    count = 0
    for word in words:
        if len(word) > k:
            count += 1
    return count


# Exercise 14: Return average value in a dictionary
def dict_avg(dictionary):
    if not dictionary:
        return 0
    total = sum(dictionary.values())
    return total / len(dictionary)


# Exercise 15: Return common divisors of 2 numbers
def common_div(num1, num2):
    divisors = []
    # Find the smaller number
    smaller = min(num1, num2)
    for i in range(1, smaller + 1):
        if num1 % i == 0 and num2 % i == 0:
            divisors.append(i)
    return divisors


# Exercise 16: Test if a number is prime
def is_prime(num):
    if num < 2:
        return False
    for i in range(2, int(num ** 0.5) + 1):
        if num % i == 0:
            return False
    return True


# Exercise 17: Print elements if index and value are both even
def weird_print(lst):
    result = []
    for index, value in enumerate(lst):
        if index % 2 == 0 and value % 2 == 0:
            result.append(value)
    return result


# Exercise 18: Count different types in keyworded arguments
def type_count(**kwargs):
    type_counts = {}
    for value in kwargs.values():
        type_name = type(value).__name__
        type_counts[type_name] = type_counts.get(type_name, 0) + 1
    
    # Format output
    result = []
    for type_name, count in sorted(type_counts.items()):
        result.append(f"{type_name}: {count}")
    return ", ".join(result)


# Exercise 19: Mimic the built-in .split() method
def my_split(string, separator=None):
    if separator is None:
        # Split by whitespace (default behavior)
        separator = ' '
        # Handle multiple consecutive spaces
        string = ' '.join(string.split())
    
    result = []
    current_word = ""
    for char in string:
        if char == separator:
            if current_word:
                result.append(current_word)
                current_word = ""
        else:
            current_word += char
    
    if current_word:
        result.append(current_word)
    
    return result


# Exercise 20: Convert string into password format
def password_format(string):
    return "*" * len(string)


# Test cases
if __name__ == "__main__":
    print("Exercise 1: Insert at index")
    print(insert_at_index([1, 2, 3], 99, 1))  # [1, 99, 2, 3]
    
    print("\nExercise 2: Count spaces")
    print(count_spaces("Hello world this is Python"))  # 4
    
    print("\nExercise 3: Count case letters")
    print(count_case_letters("Hello World"))  # Upper case: 2, Lower case: 8
    
    print("\nExercise 4: Sum of array")
    print(my_sum([1, 5, 4, 2]))  # 12
    
    print("\nExercise 5: Find max")
    print(find_max([0, 1, 3, 50]))  # 50
    
    print("\nExercise 6: Factorial")
    print(factorial(4))  # 24
    
    print("\nExercise 7: List count")
    print(list_count(['a', 'a', 't', 'o'], 'a'))  # 2
    
    print("\nExercise 8: L2-norm")
    print(norm([1, 2, 2]))  # 3.0
    
    print("\nExercise 9: Is monotonic")
    print(is_mono([7, 6, 5, 5, 2, 0]))  # True
    print(is_mono([2, 3, 3, 3]))  # True
    print(is_mono([1, 2, 0, 4]))  # False
    
    print("\nExercise 10: Longest word")
    print(longest_word(['cat', 'elephant', 'dog']))  # elephant
    
    print("\nExercise 11: Separate types")
    print(separate_types([1, 'hello', 2, 'world', 3]))  # ([1, 2, 3], ['hello', 'world'])
    
    print("\nExercise 12: Is palindrome")
    print(is_palindrome('radar'))  # True
    print(is_palindrome('John'))  # False
    
    print("\nExercise 13: Sum over k")
    sentence = 'Do or do not there is no try'
    print(sum_over_k(sentence, 2))  # 3
    
    print("\nExercise 14: Dictionary average")
    print(dict_avg({'a': 1, 'b': 2, 'c': 8, 'd': 1}))  # 3.0
    
    print("\nExercise 15: Common divisors")
    print(common_div(10, 20))  # [1, 2, 5, 10]
    
    print("\nExercise 16: Is prime")
    print(is_prime(11))  # True
    
    print("\nExercise 17: Weird print")
    print(weird_print([1, 2, 2, 3, 4, 5]))  # [2, 4]
    
    print("\nExercise 18: Type count")
    print(type_count(a=1, b='string', c=1.0, d=True, e=False))
    
    print("\nExercise 19: My split")
    print(my_split("Hello world from Python"))  # ['Hello', 'world', 'from', 'Python']
    print(my_split("a,b,c,d", ","))  # ['a', 'b', 'c', 'd']
    
    print("\nExercise 20: Password format")
    print(password_format("mypassword"))  # ***********
