from collections import Counter
import re
import string


class Text:

    def __init__(self, text):
        self.text = text

    def word_frequency(self, word):
        """Counts occurrences of a specific word (case-insensitive)."""
        words = self.text.lower().split()
        count = words.count(word.lower())
        if count == 0:
            return f"The word '{word}' was not found in the text."
        return count

    def most_common_word(self):
        """Returns the word with the highest frequency."""
        words = self.text.lower().split()
        if not words:
            return None

        frequencies = {}
        for word in words:
            frequencies[word] = frequencies.get(word, 0) + 1

        # Find the word with the maximum frequency
        most_common = max(frequencies, key=frequencies.get)
        return most_common

    def unique_words(self):
        """Returns a list of all unique words in the text."""
        words = self.text.lower().split()
        unique_set = set(words)
        return list(unique_set)

    @classmethod
    def from_file(cls, file_path):
        """Reads content from a file and returns a new Text instance."""
        with open(file_path, "r", encoding="utf-8") as file:
            content = file.read()
        return cls(content)


class TextModification(Text):

    def remove_punctuation(self):
        """Removes all standard punctuation characters from self.text."""
        # Using str.translate with string.punctuation
        translator = str.maketrans("", "", string.punctuation)
        cleaned_text = self.text.translate(translator)
        return cleaned_text

    def remove_stop_words(self):
        """Removes common English stop words from self.text."""
        stop_words = {
            "a",
            "about",
            "above",
            "after",
            "again",
            "against",
            "all",
            "am",
            "an",
            "and",
            "any",
            "are",
            "aren't",
            "as",
            "at",
            "be",
            "because",
            "been",
            "before",
            "being",
            "below",
            "between",
            "both",
            "but",
            "by",
            "can't",
            "cannot",
            "could",
            "couldn't",
            "did",
            "didn't",
            "do",
            "does",
            "doesn't",
            "doing",
            "don't",
            "down",
            "during",
            "each",
            "few",
            "for",
            "from",
            "further",
            "had",
            "hadn't",
            "has",
            "hasn't",
            "have",
            "haven't",
            "having",
            "he",
            "he'd",
            "he'll",
            "he's",
            "her",
            "here",
            "here's",
            "hers",
            "herself",
            "him",
            "himself",
            "his",
            "how",
            "how's",
            "i",
            "i'd",
            "i'll",
            "i'm",
            "i've",
            "if",
            "in",
            "into",
            "is",
            "isn't",
            "it",
            "it's",
            "its",
            "itself",
            "let's",
            "me",
            "more",
            "most",
            "mustn't",
            "my",
            "myself",
            "no",
            "nor",
            "not",
            "of",
            "off",
            "on",
            "once",
            "only",
            "or",
            "other",
            "ought",
            "our",
            "ours",
            "ourselves",
            "out",
            "over",
            "own",
            "same",
            "shan't",
            "she",
            "she'd",
            "she'll",
            "she's",
            "should",
            "shouldn't",
            "so",
            "some",
            "such",
            "than",
            "that",
            "that's",
            "the",
            "their",
            "theirs",
            "them",
            "themselves",
            "then",
            "there",
            "there's",
            "these",
            "they",
            "they'd",
            "they'll",
            "they're",
            "they've",
            "this",
            "those",
            "through",
            "to",
            "too",
            "under",
            "until",
            "up",
            "very",
            "was",
            "wasn't",
            "we",
            "we'd",
            "we'll",
            "we're",
            "we've",
            "were",
            "weren't",
            "what",
            "what's",
            "when",
            "when's",
            "where",
            "where's",
            "which",
            "while",
            "who",
            "who's",
            "whom",
            "why",
            "why's",
            "with",
            "won't",
            "would",
            "wouldn't",
            "you",
            "you'd",
            "you'll",
            "you're",
            "you've",
            "your",
            "yours",
            "yourself",
            "yourselves",
        }

        words = self.text.split()
        filtered_words = [
            word for word in words if word.lower() not in stop_words
        ]
        return " ".join(filtered_words)

    def remove_special_characters(self):
        """Removes characters that are not letters, digits, or whitespace using regex."""
        # Keeps only alphanumeric characters and spaces
        cleaned_text = re.sub(r"[^\w\s]", "", self.text)
        return cleaned_text