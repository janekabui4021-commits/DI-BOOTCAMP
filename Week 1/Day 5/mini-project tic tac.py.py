"""
Tic Tac Toe Game
A two-player game where players take turns marking spaces in a 3x3 grid.
The first player to get three in a row (horizontally, vertically, or diagonally) wins.
"""


def display_board(board):
    """Display the current state of the game board."""
    print("\n")
    for i in range(3):
        print(f" {board[i][0]} | {board[i][1]} | {board[i][2]} ")
        if i < 2:
            print("-----------")
    print("\n")


def player_input(player):
    """
    Get the player's move.
    Ask for row and column numbers (0-2).
    Validate that the input is valid and the cell is empty.
    """
    while True:
        try:
            position = input(f"Player {player}, enter your move (row, column) e.g., 0 0: ")
            row, col = map(int, position.split())
            
            # Validate range
            if row < 0 or row > 2 or col < 0 or col > 2:
                print("Invalid position! Please enter row and column between 0 and 2.")
                continue
            
            return row, col
        except ValueError:
            print("Invalid input! Please enter two numbers separated by a space (e.g., 0 0).")


def check_win(board, player):
    """
    Check if the current player has won.
    Check all possible winning combinations (rows, columns, diagonals).
    Return True if player won, False otherwise.
    """
    # Check rows
    for row in board:
        if all(cell == player for cell in row):
            return True
    
    # Check columns2
    for col in range(3):
        if all(board[row][col] == player for row in range(3)):
            return True
    
    # Check diagonals
    if all(board[i][i] == player for i in range(3)):
        return True
    
    if all(board[i][2 - i] == player for i in range(3)):
        return True
    
    return False


def check_tie(board):
    """
    Check if the game has resulted in a tie.
    Return True if all positions are full with no winner, False otherwise.
    """
    for row in board:
        if ' ' in row:
            return False
    return True


def play():
    """
    Main game loop.
    Initialize the board, manage game flow, and determine the winner.
    """
    # Initialize the board
    board = [[' ' for _ in range(3)] for _ in range(3)]
    
    # Track current player
    current_player = 'X'
    
    print("Welcome to Tic Tac Toe!")
    print("Players will alternate turns. Positions are numbered 0-2 for both row and column.")
    
    # Game loop
    while True:
        # Display the board
        display_board(board)
        
        # Get player input
        while True:
            row, col = player_input(current_player)
            
            # Check if cell is empty
            if board[row][col] == ' ':
                board[row][col] = current_player
                break
            else:
                print("That cell is already occupied! Try again.")
        
        # Check for winner
        if check_win(board, current_player):
            display_board(board)
            print(f"Player {current_player} wins! Congratulations!")
            break
        
        # Check for tie
        if check_tie(board):
            display_board(board)
            print("It's a tie! Good game!")
            break
        
        # Switch to next player
        current_player = 'O' if current_player == 'X' else 'X'


# Run the game
if __name__ == "__main__":
    play()
