class AnagramChecker:

    def __init__(self, file_path="words.txt"):
        """Reads the word list file and stores the words in lowercase in a set."""
        self.words = set()
        try:
            with open(file_path, "r", encoding="utf-8") as file:
                for line in file:
                    cleaned_word = line.strip().lower()
                    if cleaned_word:
                        self.words.add(cleaned_word)
        except FileNotFoundError:
            print(f"Error: The file '{file_path}' was not found.")

    def is_valid_word(self, word):
        """Checks if the word consists of valid letters and exists in the word list."""
        word_clean = word.strip().lower()
        return word_clean.isalpha() and word_clean in self.words

    def is_anagram(self, word1, word2):
        """Checks if two words have the exact same sorted characters."""
        w1 = word1.strip().lower()
        w2 = word2.strip().lower()
        return sorted(w1) == sorted(w2)

    def get_anagrams(self, word):
        """Finds all valid anagrams for a given word from the word list."""
        target_word = word.strip().lower()
        anagrams = []

        for candidate in self.words:
            # Must be an anagram and not the exact same word
            if candidate != target_word and self.is_anagram(
                target_word, candidate
            ):
                anagrams.append(candidate)

        return anagrams