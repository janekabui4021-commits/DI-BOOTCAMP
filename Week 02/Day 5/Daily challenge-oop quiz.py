"""OOP quiz answers and deck of cards exercise."""

# Exercise 1: Quiz
# 1. What is a class?
# A class is a template that defines a set of attributes and methods. Any
# object made from that class follows the same structure and behavior.

# 2. What is an instance?
# An instance is one concrete object built from a class. It contains the real
# values assigned to the class attributes.

# 3. What is encapsulation?
# Encapsulation means keeping data and the logic that works with it together in
# one class, while limiting direct access from outside when needed.

# 4. What is abstraction?
# Abstraction focuses on showing only the important parts of an object and hiding
# the internal complexity behind a simpler interface.

# 5. What is inheritance?
# Inheritance allows a class to reuse the features of an existing class, which
# makes code more reusable and organized.

# 6. What is multiple inheritance?
# Multiple inheritance happens when a class inherits from more than one parent
# class and gains features from both.

# 7. What is polymorphism?
# Polymorphism allows different classes to use the same method name while
# implementing it in a way that suits each class.

# 8. What is method resolution order (MRO)?
# MRO is the order Python follows when checking parent classes to find a method
# or attribute, especially in cases of multiple inheritance.

# Exercise 2: Deck of cards
import random


class Card:
    def __init__(self, suit, value):
        self.suit = suit
        self.value = value

    def __repr__(self):
        return f"{self.value} of {self.suit}"


class Deck:
    def __init__(self):
        self.cards = []
        self.reset_deck()

    def reset_deck(self):
        suits = ["Hearts", "Diamonds", "Clubs", "Spades"]
        values = [
            "A", "2", "3", "4", "5", "6", "7", "8", "9", "10",
            "J", "Q", "K"
        ]
        self.cards = [Card(suit, value) for suit in suits for value in values]

    def shuffle(self):
        if len(self.cards) != 52:
            self.reset_deck()
        random.shuffle(self.cards)

    def deal(self):
        if len(self.cards) == 0:
            print("No cards left in the deck!")
            return None
        return self.cards.pop()


if __name__ == "__main__":
    deck = Deck()
    print(f"Initial deck size: {len(deck.cards)}")
    deck.shuffle()
    print("Deck shuffled successfully.")
    dealt_card = deck.deal()
    print(f"Dealt card: {dealt_card}")
    print(f"Remaining cards in deck: {len(deck.cards)}")
