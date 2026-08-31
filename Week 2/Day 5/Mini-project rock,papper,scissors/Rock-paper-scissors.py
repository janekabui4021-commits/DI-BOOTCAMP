from game import Game


def get_user_menu_choice():
    """Displays menu choices, validates user selection, and returns choice."""
    print("\n--- Menu ---")
    print("1. Play a new game")
    print("2. Show scores")
    print("3. Quit")

    while True:
        choice = input("Select an option (1, 2, or 3): ").strip()
        if choice in ["1", "2", "3"]:
            return choice
        print("Invalid choice! Please enter 1, 2, or 3.")


def print_results(results):
    """Displays the overall game summary and thank-you message."""
    print("\n===============================")
    print("         GAME SUMMARY          ")
    print("===============================")
    print(f" Wins:   {results.get('win', 0)}")
    print(f" Losses: {results.get('loss', 0)}")
    print(f" Draws:  {results.get('draw', 0)}")
    print("===============================")
    print("Thank you for playing!")


def main():
    """Controls the overall execution flow and score tracking."""
    results = {"win": 0, "loss": 0, "draw": 0}

    while True:
        user_choice = get_user_menu_choice()

        if user_choice == "1":
            game = Game()
            game_result = game.play()
            results[game_result] += 1
        elif user_choice == "2":
            print("\n--- Current Scores ---")
            print(
                f"Wins: {results['win']} | Losses: {results['loss']} | Draws: {results['draw']}"
            )
        elif user_choice == "3":
            print_results(results)
            break


if __name__ == "__main__":
    main()