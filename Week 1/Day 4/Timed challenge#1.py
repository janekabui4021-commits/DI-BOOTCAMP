def count_occurrence(text, char):
    return text.count(char)

# Inputs
user_string = input("String: ")
user_char = input("Character: ")

# Output
print(count_occurrence(user_string, user_char))