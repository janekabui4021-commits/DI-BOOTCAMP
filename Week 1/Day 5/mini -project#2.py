"""
Hangman Game
The computer picks a random word and the player guesses letters.
Guess correctly to reveal letters. Guess wrong and body parts appear on the gallows.
"""

import random

wordslist = ['correction', 'childish', 'beach', 'python', 'assertive', 'interference', 'complete', 'share', 'credit card', 'rush', 'south']
word = random.choice(wordslist)

### YOUR CODE STARTS FROM HERE ###


def display_hangman(wrong_guesses):
    """Display the hangman figure based on number of wrong guesses."""
    stages = [  # Final state: head, torso, both arms, and both legs
        """
           --------
           |      |
           |      
           |     
           |      
           |     
           -
        """,
        # Head
        """
           --------
           |      |
           |      O
           |     
           |      
           |     
           -
        """,
        # Body
        """
           --------
           |      |
           |      O
           |      |
           |      
           |     
           -
        """,
        # Left Arm
        """
           --------
           |      |
           |      O
           |     \\|
           |      
           |     
           -
        """,
        # Right Arm
        """
           --------
           |      |
           |      O
           |     \\|/
           |      
           |     
           -
        """,
        # Left Leg
        """
           --------
           |      |
           |      O
           |     \\|/
           |      |
           |     / 
           -
        """,
        # Right Leg
        """
           --------
           |      |
           |      O
           |     \\|/
           |      |
           |     / \\
           -
        """
    ]
    return stages[wrong_guesses]


def display_word(word, guessed_letters):
    """Display the word with guessed letters revealed and others as stars."""
    display = ""
    for letter in word:
        if letter.lower() in guessed_letters or letter == ' ':
            display += letter + " "
        else:
            display += "* "
    return display.strip()


def is_word_complete(word, guessed_letters):
    """Check if the player has guessed all letters in the word."""
    for letter in word.lower():
        if letter != ' ' and letter not in guessed_letters:
            return False
    return True


def play():
    """Main game loop for Hangman."""
    guessed_letters = set()
    wrong_guesses = 0
    max_wrong = 6
    
    print("Welcome to Hangman!")
    print("Guess the word by guessing letters one at a time.")
    print(f"The word has {len(word)} characters.\n")
    
    # Game loop
    while wrong_guesses < max_wrong:
        # Display current state
        print(display_hangman(wrong_guesses))
        print("\nWord: ", display_word(word, guessed_letters))
        print(f"Wrong guesses: {wrong_guesses}/{max_wrong}")
        print(f"Guessed letters: {', '.join(sorted(guessed_letters)) if guessed_letters else 'None'}")
        
        # Check if player won
        if is_word_complete(word, guessed_letters):
            print("\n" + display_hangman(wrong_guesses))
            print(f"\nCongratulations! The word was: {word}")
            print("You win!")
            return
        
        # Get player input
        while True:
            guess = input("\nGuess a letter: ").lower().strip()
            
            # Validate input
            if len(guess) != 1 or not guess.isalpha():
                print("Please enter a single letter.")
                continue
            
            if guess in guessed_letters:
                print(f"You already guessed '{guess}'. Try another letter.")
                continue
            
            break
        
        # Add guess to set
        guessed_letters.add(guess)
        
        # Check if guess is correct
        if guess in word.lower():
            print(f"Good guess! '{guess}' is in the word.")
        else:
            print(f"Sorry, '{guess}' is not in the word.")
            wrong_guesses += 1
        
        print("-" * 40)
    
    # Game over - player lost
    print(display_hangman(wrong_guesses))
    print(f"\nGame Over! The word was: {word}")
    print("Better luck next time!")


# Run the game
if __name__ == "__main__":
    play()
