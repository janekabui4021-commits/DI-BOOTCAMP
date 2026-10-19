from menu_manager import MenuManager


def load_manager():
    """Creates and returns a new MenuManager instance."""
    return MenuManager()


def add_item_to_menu(manager):
    """Prompts user for item details and delegates addition to MenuManager."""
    name = input("Enter the name of the item to add: ").strip()
    try:
        price = float(input("Enter the price of the item: "))
        manager.add_item(name, price)
        print("Item was added successfully.")
    except ValueError:
        print("Error: Invalid price entered. Item was not added.")


def remove_item_from_menu(manager):
    """Prompts user for item name and delegates removal to MenuManager."""
    name = input("Enter the name of the item to remove: ").strip()
    success = manager.remove_item(name)
    if success:
        print("Item was deleted successfully.")
    else:
        print("Error: Item was not found in the menu.")


def show_restaurant_menu(manager):
    """Displays the list of current menu items and prices."""
    print("\n--- Current Restaurant Menu ---")
    items = manager.menu.get("items", [])
    if not items:
        print("The menu is currently empty.")
    else:
        for item in items:
            print(f"- {item['name']}: ${item['price']:.2f}")
    print("-------------------------------\n")


def show_user_menu(manager):
    """Displays the main options menu and processes user input."""
    while True:
        print("\n*** Program Menu ***")
        print("(a) Add an item")
        print("(d) Delete an item")
        print("(v) View the menu")
        print("(x) Exit")

        user_choice = input("Choose an option: ").strip().lower()

        if user_choice == "a":
            add_item_to_menu(manager)
        elif user_choice == "d":
            remove_item_from_menu(manager)
        elif user_choice == "v":
            show_restaurant_menu(manager)
        elif user_choice == "x":
            manager.save_to_file()
            print("Menu was saved successfully. Goodbye!")
            break
        else:
            print("Invalid choice. Please choose a, d, v, or x.")


if __name__ == "__main__":
    manager = load_manager()
    show_user_menu(manager)