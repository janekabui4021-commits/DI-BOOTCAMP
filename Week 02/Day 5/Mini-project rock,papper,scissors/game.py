import random


class Game:

    def get_user_item(self):
        """Prompts the user to select rock, paper, or scissors and validates input."""
        valid_items = ["r", "p", "s"]
        item_names = {"r": "rock", "p": "paper", "s": "scissors"}

        while True:
            user_input = (
                input("Select an item ((r)ock, (p)aper, (s)cissors): ")
                .strip()
                .lower()
            )
            if user_input in valid_items:
                return item_names[user_input]
            elif user_input in item_names.values():
                return user_input
            print("Invalid input! Please select 'r', 'p', or 's'.")

    def get_computer_item(self):
        """Randomly selects an item for the computer."""
        return random.choice(["rock", "paper", "scissors"])

    def get_game_result(self, user_item, computer_item):
        """Determines the game outcome from the user's perspective."""
        if user_item == computer_item:
            return "draw"

        # Winning combinations for the user
        winning_moves = {
            "rock": "scissors",
            "paper": "rock",
            "scissors": "paper",
        }

        if winning_moves[user_item] == computer_item:
            return "win"
        else:
            return "loss"

    def play(self):
        """Executes a single game round and prints the results."""
        user_item = self.get_user_item()
        computer_item = self.get_computer_item()
        result = self.get_game_result(user_item, computer_item)

        print(f"\nYou selected {user_item}. The computer selected {computer_item}.")

        if result == "win":
            print("You won!")
        elif result == "loss":
            print("You lost!")
        else:
            print("You drew!")

        return result