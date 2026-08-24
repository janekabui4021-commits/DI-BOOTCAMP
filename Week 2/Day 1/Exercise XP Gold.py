import math


class Circle:

    def __init__(self, radius=1.0):
        self.radius = radius

    def perimeter(self):
        return 2 * math.pi * self.radius

    def area(self):
        return math.pi * (self.radius**2)

    def definition(self):
        print(
            "A circle is a 2D geometric shape consisting of all points in a plane that are at a given distance (radius) from a central point."
        )

circle = Circle(5.0)
print("Perimeter:", circle.perimeter())
print("Area:", circle.area())
circle.definition()


import random
#2

class MyList:

    def __init__(self, letters):
        self.letters = letters

    def get_reversed(self):
        return self.letters[::-1]

    def get_sorted(self):
        return sorted(self.letters)

    def generate_random_numbers(self):
        return [random.randint(1, 100) for _ in range(len(self.letters))]


my_list = MyList(["d", "a", "c", "b"])
print("Reversed:", my_list.get_reversed())
print("Sorted:", my_list.get_sorted())
print("Random Numbers List:", my_list.generate_random_numbers())
#3 
class MenuManager:

    def __init__(self):
        self.menu = [
            {"name": "Soup", "price": 10, "spice": "B", "gluten": False},
            {"name": "Hamburger", "price": 15, "spice": "A", "gluten": True},
            {"name": "Salad", "price": 18, "spice": "A", "gluten": False},
            {"name": "French Fries", "price": 5, "spice": "C", "gluten": False},
            {
                "name": "Beef bourguignon",
                "price": 25,
                "spice": "B",
                "gluten": True,
            },
        ]

    def add_item(self, name, price, spice, gluten):
        new_dish = {
            "name": name,
            "price": price,
            "spice": spice,
            "gluten": gluten,
        }
        self.menu.append(new_dish)
        print(f"'{name}' added successfully.")

    def update_item(self, name, price, spice, gluten):
        for dish in self.menu:
            if dish["name"].lower() == name.lower():
                dish["price"] = price
                dish["spice"] = spice
                dish["gluten"] = gluten
                print(f"'{name}' updated successfully.")
                return
        print(f"Notice: '{name}' is not in the menu.")

    def remove_item(self, name):
        for dish in self.menu:
            if dish["name"].lower() == name.lower():
                self.menu.remove(dish)
                print(f"'{name}' removed. Updated menu dictionary list:")
                print(self.menu)
                return
        print(f"Notice: '{name}' is not in the menu.")

if __name__ == "__main__":
    manager = MenuManager()

    # Add dish
    manager.add_item("Tacos", 12, "C", True)

    # Update dish
    manager.update_item("Soup", 12, "A", False)

    # Delete dish
    manager.remove_item("Salad")