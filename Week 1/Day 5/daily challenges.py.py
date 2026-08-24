"""
Daily Challenges - Sorting and String Manipulation
Challenge 1: Sorting comma-separated words
Challenge 2: Finding the longest word in a sentence
"""

#  CHALLENGE 1: SORTING 
print("=" * 60)
print("CHALLENGE 1: Sorting Comma-Separated Words")
print("=" * 60)

# Step 1: Get Input from the user
user_input = input("Enter words separated by commas (e.g., 'apple,banana,cherry'): ")

# Step 2: Split the string by comma
words = user_input.split(',')

# Remove leading/trailing whitespace from each word (optional but cleaner)
words = [word.strip() for word in words]

# Step 3: Sort the list alphabetically
words.sort()

# Step 4: Join the sorted list back with commas
result = ','.join(words)

# Step 5: Print the result
print(f"Sorted words: {result}")

print("\n" + "=" * 60)
print("Example Output:")
print("=" * 60)
# Demonstration with example
example_input = "without,hello,bag,world"
example_words = example_input.split(',')
example_words.sort()
example_result = ','.join(example_words)
print(f"Input:  {example_input}")
print(f"Output: {example_result}")


#  CHALLENGE 2: LONGEST WORD 
print("\n" + "=" * 60)
print("CHALLENGE 2: Finding the Longest Word in a Sentence")
print("=" * 60)

def longest_word(sentence):
    """
    Find the longest word in a sentence.
    If there are multiple longest words, return the first one encountered.
    
    Args:
        sentence (str): The input sentence
        
    Returns:
        str: The longest word in the sentence
    """
    # Step 1: Function is defined
    
    # Step 2: Split the sentence into words
    words = sentence.split()
    
    # Step 3: Initialize variables
    longest = words[0]  # Assume first word is longest
    max_length = len(words[0])
    
    # Step 4: Iterate through the words
    for word in words:
        # Step 5: Compare word lengths
        if len(word) > max_length:
            max_length = len(word)
            longest = word
    
    # Step 6: Return the longest word
    return longest


# Test cases
print("\nTest Case 1:")
test1 = "Margaret's toy is a pretty doll."
result1 = longest_word(test1)
print(f"Input:  '{test1}'")
print(f"Output: '{result1}'")
print(f"Expected: 'Margaret's'")
print(f"Match: {result1 == 'Margaret\'s'}")

print("\nTest Case 2:")
test2 = "A thing of beauty is a joy forever."
result2 = longest_word(test2)
print(f"Input:  '{test2}'")
print(f"Output: '{result2}'")
print(f"Expected: 'forever.'")
print(f"Match: {result2 == 'forever.'}")

print("\nTest Case 3:")
test3 = "Forgetfulness is by all means powerless!"
result3 = longest_word(test3)
print(f"Input:  '{test3}'")
print(f"Output: '{result3}'")
print(f"Expected: 'Forgetfulness'")
print(f"Match: {result3 == 'Forgetfulness'}")

# Interactive test
print("\n" + "-" * 60)
user_sentence = input("Enter your own sentence to find the longest word: ")
user_result = longest_word(user_sentence)
print(f"The longest word is: '{user_result}'")
