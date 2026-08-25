from time import sleep


class GameOfLife:
    def __init__(self, width=20, height=10, expandable=False, max_size=10_000):
        self.width = width
        self.height = height
        self.expandable = expandable
        self.max_size = max_size
        self.live_cells = set()

    def add_pattern(self, pattern, row=0, column=0):
        """Add a pattern using '#' for alive cells."""
        for r, line in enumerate(pattern):
            for c, cell in enumerate(line):
                if cell == "#":
                    self.live_cells.add((row + r, column + c))

    def neighbours(self, row, column):
        for row_change in (-1, 0, 1):
            for column_change in (-1, 0, 1):
                if row_change == 0 and column_change == 0:
                    continue
                yield row + row_change, column + column_change

    def inside_grid(self, row, column):
        if self.expandable:
            limit = self.max_size // 2
            return -limit <= row < limit and -limit <= column < limit

        return 0 <= row < self.height and 0 <= column < self.width

    def next_generation(self):
        neighbour_counts = {}

        for cell in self.live_cells:
            for neighbour in self.neighbours(*cell):
                if self.inside_grid(*neighbour):
                    neighbour_counts[neighbour] = (
                        neighbour_counts.get(neighbour, 0) + 1
                    )

        new_live_cells = {
            cell
            for cell, count in neighbour_counts.items()
            if count == 3 or (count == 2 and cell in self.live_cells)
        }

        self.live_cells = new_live_cells

    def display(self):
        print("\033[H\033[J", end="")

        if self.expandable and self.live_cells:
            min_row = min(row for row, column in self.live_cells) - 1
            max_row = max(row for row, column in self.live_cells) + 1
            min_column = min(column for row, column in self.live_cells) - 1
            max_column = max(column for row, column in self.live_cells) + 1
        else:
            min_row, max_row = 0, self.height - 1
            min_column, max_column = 0, self.width - 1

        for row in range(min_row, max_row + 1):
            line = ""

            for column in range(min_column, max_column + 1):
                line += "█" if (row, column) in self.live_cells else "·"

            print(line)

    def run(self, generations=20, delay=0.3):
        previous_states = set()

        for generation in range(generations + 1):
            print(f"Generation: {generation}")
            self.display()

            state = frozenset(self.live_cells)

            if not self.live_cells:
                print("All cells are dead.")
                break

            if state in previous_states:
                print("A repeating pattern was found.")
                break

            previous_states.add(state)
            self.next_generation()
            sleep(delay)


# Fixed-border example: blinker
blinker = [
    "###"
]

game = GameOfLife(width=10, height=8)
game.add_pattern(blinker, row=3, column=6)
game.run(generations=10)


# Expandable-border example: glider
glider = [
    ".#.",
    "..#",
    "###"
]

game = GameOfLife(expandable=True)
game.add_pattern(glider, row=0, column=0)
game.run(generations=30)