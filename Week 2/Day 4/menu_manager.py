import json


class MenuManager:
    def __init__(self, filename="restaurant_menu.json"):
        self.filename = filename
        self.menu = self._load_from_file()

    def _load_from_file(self):
        """Helper method to read the menu from the JSON file."""
        try:
            with open(self.filename, "r") as file:
                return json.load(file)
        except (FileNotFoundError, json.JSONDecodeError):
            return {"items": []}

    def add_item(self, name, price):
        """Adds an item to the menu dictionary without saving to file immediately."""
        new_item = {"name": name, "price": float(price)}
        self.menu["items"].append(new_item)

    def remove_item(self, name):
        """Removes an item by name if found. Returns True if successful, False otherwise."""
        items = self.menu.get("items", [])
        for index, item in enumerate(items):
            if item["name"].lower() == name.lower():
                del items[index]
                return True
        return False

    def save_to_file(self):
        """Saves the current menu back to the JSON file."""
        with open(self.filename, "w") as file:
            json.dump(self.menu, file, indent=4)