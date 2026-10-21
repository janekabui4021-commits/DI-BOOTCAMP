def get_full_name(first_name, last_name, middle_name=""):
    if middle_name:
        full_name = f"{first_name} {middle_name} {last_name}"
    else:
        full_name = f"{first_name} {last_name}"
    return full_name.title()

# Examples
print(get_full_name(first_name="john", middle_name="hooker", last_name="lee"))
# Output: John Hooker Lee

print(get_full_name(first_name="bruce", last_name="lee"))
# Output: Bruce Lee

#2 From English to Morse
MORSE_CODE_DICT = {
    'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
    'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
    'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
    'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
    'Y': '-.--', 'Z': '--..', '1': '.----', '2': '..---', '3': '...--',
    '4': '....-', '5': '.....', '6': '-....', '7': '--...', '8': '---..',
    '9': '----.', '0': '-----'
}

# Reverse mapping for Morse to English
ENGLISH_DICT = {v: k for k, v in MORSE_CODE_DICT.items()}

def english_to_morse(text):
    words = text.upper().split(' ')
    morse_words = []
    
    for word in words:
        morse_chars = [MORSE_CODE_DICT[char] for char in word if char in MORSE_CODE_DICT]
        morse_words.append(' '.join(morse_chars))
        
    return ' / '.join(morse_words)

def morse_to_english(morse):
    words = morse.split(' / ')
    english_words = []
    
    for word in words:
        chars = word.split(' ')
        translated = ''.join(ENGLISH_DICT[char] for char in chars if char in ENGLISH_DICT)
        english_words.append(translated)
        
    return ' '.join(english_words)

# 3 Box of stars
morse = english_to_morse("HELLO WORLD")
print(morse)  # Output: .... . .-.. .-.. --- / .-- --- .-. .-.. -..

english = morse_to_english(morse)
print(english)  # Output: HELLO WORLD
#3
def box_printer(*words):
    # Find the longest word to determine box width
    max_length = max(len(word) for word in words)
    
    # Border width = max word length + 2 spaces padding + 2 asterisks
    border = "*" * (max_length + 4)
    
    print(border)
    for word in words:
        print(f"* {word.ljust(max_length)} *")
    print(border)

box_printer("Hello", "World", "in", "reallylongword", "a", "frame")