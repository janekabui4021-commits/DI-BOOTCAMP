import math


class Pagination:

    def __init__(self, items=None, page_size=10):
        # Step 2: Initialize parameters and calculate total pages
        self.items = items if items is not None else []
        self.page_size = int(page_size)
        self.current_idx = 0

        # Calculate total pages (handle empty list edge case)
        if len(self.items) == 0:
            self.total_pages = 1
        else:
            self.total_pages = math.ceil(len(self.items) / self.page_size)

    def get_visible_items(self):
        # Step 3: Return sliced items for the current page
        start = self.current_idx * self.page_size
        end = start + self.page_size
        return self.items[start:end]

    def go_to_page(self, page_num):
        # Step 4: Go to 1-based page index (returns self to support method chaining)
        page_num = int(page_num)
        if page_num < 1 or page_num > self.total_pages:
            raise ValueError(f"Page number {page_num} is out of range.")

        self.current_idx = page_num - 1
        return self

    def first_page(self):
        self.current_idx = 0
        return self

    def last_page(self):
        self.current_idx = self.total_pages - 1
        return self

    def next_page(self):
        if self.current_idx < self.total_pages - 1:
            self.current_idx += 1
        return self

    def previous_page(self):
        if self.current_idx > 0:
            self.current_idx -= 1
        return self

    # CamelCase aliases for method chaining support as requested in the bonus step
    def nextPage(self):
        return self.next_page()

    def prevPage(self):
        return self.previous_page()

    def firstPage(self):
        return self.first_page()

    def lastPage(self):
        return self.last_page()

    def goToPage(self, page_num):
        return self.go_to_page(page_num)

    def getVisibleItems(self):
        return self.get_visible_items()

    def __str__(self):
        # Step 5: Display items on current page, each on a new line
        return "\n".join(str(item) for item in self.get_visible_items())


# --- Step 6: Test Cases ---
if __name__ == "__main__":
    alphabetList = list("abcdefghijklmnopqrstuvwxyz")
    p = Pagination(alphabetList, 4)

    # Base test cases
    print(p.get_visible_items())  # ['a', 'b', 'c', 'd']

    p.next_page()
    print(p.get_visible_items())  # ['e', 'f', 'g', 'h']

    p.last_page()
    print(p.get_visible_items())  # ['y', 'z']

    # Method chaining bonus test
    p.first_page()
    print(
        p.nextPage().nextPage().nextPage().getVisibleItems()
    )  # ['m', 'n', 'o', 'p']

    # Custom __str__ test
    p.first_page()
    print(str(p))
    # Output:
    # a
    # b
    # c
    # d

    # Error handling tests
    try:
        p.go_to_page(10)
    except ValueError as e:
        print(f"ValueError caught: {e}")

    try:
        p.go_to_page(0)
    except ValueError as e:
        print(f"ValueError caught: {e}")