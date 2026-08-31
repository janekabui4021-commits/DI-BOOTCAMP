from pathlib import Path

from Anagram_checker import AnagramChecker


def main():
    dictionary_path = Path(__file__).with_name("words.txt")
    checker = AnagramChecker(dictionary_path)

    while True:
        print("\n" + "=" * 30)
        print("     ANAGRAM CHECKER MENU     ")
        print("=" * 30)
        print("1. Find anagrams for a word")
        print("2. Exit")

        user_choice = input("Select an option (1 or 2): ").strip()

        if user_choice == "2":
            print("\nThank you for using Anagram Checker. Goodbye!")
            break
        elif user_choice == "1":
            user_input = input("\nEnter a single word: ").strip()

            # Validation 1: Check for multiple words
            if len(user_input.split()) > 1:
                print("Error: Please enter only a single word, not multiple.")
                continue

            # Validation 2: Check if string contains non-alphabetic characters
            if not user_input.isalpha():
                print(
                    "Error: Invalid word. Please enter alphabetic characters only."
                )
                continue

            # Check if word exists in dictionary/word list
            if not checker.is_valid_word(user_input):
                print(
                    f"Error: '{user_input}' is not a recognized word in the word list."
                )
                continue

            # Retrieve and display anagrams
            anagrams = checker.get_anagrams(user_input)
            clean_word = user_input.lower()

            print("\n" + "-" * 30)
            print(f"YOUR WORD : \"{clean_word.upper()}\"")
            print("this is a valid English word.")

            if anagrams:
                print(f"Anagrams for your word: {', '.join(anagrams)}.")
            else:
                print("No anagrams found for this word.")
            print("-" * 30)

        else:
            print("Invalid selection. Please enter 1 or 2.")


if __name__ == "__main__":
    main()