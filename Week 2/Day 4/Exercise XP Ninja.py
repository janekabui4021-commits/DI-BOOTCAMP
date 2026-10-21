import json
import re
from pathlib import Path

# Exercise 1: Restaurant Menu Manager

def validate_valentine_item(item_name, price):
    """Validate Valentine's menu item according to rules"""
    
    # Rule 1: First word starts with 'V', other words start with uppercase (except connectors)
    name_pattern = r'^V[a-z]+(\s+[a-z]+)*(\s+[a-z]+)*'
    
    # Rule 2: At least two 'e's, no numbers in name
    if item_name.count('e') + item_name.count('E') < 2:
        return False, "Item name must contain at least two 'e's"
    
    if re.search(r'\d', item_name):
        return False, "Item name cannot contain numbers"
    
    # Rule 3: Price pattern XX,14
    price_pattern = r'^\d+,14$'
    if not re.match(price_pattern, price):
        return False, "Price must match pattern XX,14"
    
    return True, "Valid"

def display_menu_with_heart():
    """Display heart made of stars"""
    heart = [
        "  ***   ***  ",
        " *****  *** ",
        "*****   ** ",
        "****     * ",
        "***       ",
        "**       ",
        "*       ",
        "       "
    ]
    for line in heart:
        print(line)

# Load/create JSON file
def manage_valentine_menu():
    menu_file = Path("valentine_menu.json")
    
    if menu_file.exists():
        with open(menu_file, 'r') as f:
            menu_data = json.load(f)
    else:
        menu_data = {"valentine_items": []}
    
    while True:
        item = input("Enter Valentine's item (or 'quit' to exit): ")
        if item.lower() == 'quit':
            break
        
        price = input("Enter price (format XX,14): ")
        valid, message = validate_valentine_item(item, price)
        
        if valid:
            menu_data["valentine_items"].append({"name": item, "price": price})
            print("✓ Item added!")
        else:
            print(f"✗ Invalid: {message}")
    
    with open(menu_file, 'w') as f:
        json.dump(menu_data, f, indent=2)


# Exercise 2: Dungeons & Dragons

import random
from dataclasses import dataclass

@dataclass
class Character:
    name: str
    age: int
    strength: int
    dexterity: int
    constitution: int
    intelligence: int
    wisdom: int
    charisma: int
    
    def roll_ability(self):
        """Roll 4d6, drop lowest, return sum"""
        rolls = [random.randint(1, 6) for _ in range(4)]
        rolls.sort()
        return sum(rolls[1:])  # Sum of three highest
    
    def to_dict(self):
        return {
            "name": self.name,
            "age": self.age,
            "abilities": {
                "strength": self.strength,
                "dexterity": self.dexterity,
                "constitution": self.constitution,
                "intelligence": self.intelligence,
                "wisdom": self.wisdom,
                "charisma": self.charisma
            }
        }

class Game:
    def __init__(self, num_players):
        self.num_players = num_players
        self.characters = []
    
    def create_characters(self):
        for i in range(self.num_players):
            print(f"\n--- Player {i+1} Character Creation ---")
            name = input("Character name: ")
            age = int(input("Character age: "))
            
            character = Character(
                name=name,
                age=age,
                strength=Character.roll_ability(None),
                dexterity=Character.roll_ability(None),
                constitution=Character.roll_ability(None),
                intelligence=Character.roll_ability(None),
                wisdom=Character.roll_ability(None),
                charisma=Character.roll_ability(None)
            )
            self.characters.append(character)
    
    def export_json(self, filename="characters.json"):
        data = [char.to_dict() for char in self.characters]
        with open(filename, 'w') as f:
            json.dump(data, f, indent=2)
        print(f"✓ Exported to {filename}")
    
    def export_txt(self, filename="characters.txt"):
        with open(filename, 'w') as f:
            for char in self.characters:
                f.write(f"Name: {char.name}\nAge: {char.age}\n")
                f.write(f"STR: {char.strength} | DEX: {char.dexterity} | CON: {char.constitution}\n")
                f.write(f"INT: {char.intelligence} | WIS: {char.wisdom} | CHA: {char.charisma}\n\n")
        print(f"✓ Exported to {filename}")

# Main execution
if __name__ == "__main__":
    print("1. Restaurant Menu Manager\n2. Dungeons & Dragons\n")
    choice = input("Select exercise (1 or 2): ")
    
    if choice == "1":
        manage_valentine_menu()
        display_menu_with_heart()
    elif choice == "2":
        num_players = int(input("How many players? "))
        game = Game(num_players)
        game.create_characters()
        game.export_json()
        game.export_txt()