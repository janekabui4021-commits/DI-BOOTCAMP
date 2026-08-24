class Farm:

    def __init__(self, farm_name):
        self.name = farm_name
        self.animals = {}

    def add_animal(self, animal_type=None, count=1, **kwargs):
        # Handle keyword arguments (**kwargs)
        if kwargs:
            for animal, qty in kwargs.items():
                self.animals[animal] = self.animals.get(animal, 0) + qty

        # Handle positional arguments (animal_type, count)
        if animal_type:
            self.animals[animal_type] = (
                self.animals.get(animal_type, 0) + count
            )

    def get_info(self):
        info = f"{self.name}'s farm\n\n"
        for animal, count in self.animals.items():
            info += f"{animal:<7} : {count}\n"
        info += "\n    E-I-E-I-0!"
        return info

    def get_animal_types(self):
        return sorted(list(self.animals.keys()))

    def get_short_info(self):
        types = self.get_animal_types()
        formatted_animals = []

        for animal in types:
            # Add 's' if count > 1 (pluralize)
            if self.animals[animal] > 1:
                formatted_animals.append(f"{animal}s")
            else:
                formatted_animals.append(animal)

        # Join formatted animal names with commas and 'and'
        if len(formatted_animals) > 1:
            animals_str = (
                ", ".join(formatted_animals[:-1])
                + " and "
                + formatted_animals[-1]
            )
        else:
            animals_str = formatted_animals[0]

        return f"{self.name}’s farm has {animals_str}."

if __name__ == "__main__":
    macdonald = Farm("McDonald")

    macdonald.add_animal("cow", 5)
    macdonald.add_animal("sheep")
    macdonald.add_animal("sheep")
    macdonald.add_animal("goat", 12)

    # Testing get_info
    print(macdonald.get_info())

    print("\n" + "=" * 30 + "\n")

    # Testing Bonus Methods
    print("Animal types:", macdonald.get_animal_types())
    print(macdonald.get_short_info())

    print("\n" + "=" * 30 + "\n")

    # Testing upgraded add_animal with **kwargs
    old_farm = Farm("Old McDonald")
    old_farm.add_animal(cow=5, sheep=2, goat=12)
    print(old_farm.get_info())
    print(old_farm.get_short_info())