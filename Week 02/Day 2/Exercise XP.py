class Pets:
    def __init__(self, animals):
        self.animals = animals

    def walk(self):
        for animal in self.animals:
            print(animal.walk())

class Cat:
    is_lazy = True

    def __init__(self, name, age):
        self.name = name
        self.age = age

    def walk(self):
        return f'{self.name} is just walking around'

class Bengal(Cat):
    def sing(self, sounds):
        return f'{sounds}'

class Chartreux(Cat):
    def sing(self, sounds):
        return f'{sounds}'

# Step 1: Create the Siamese Class
class Siamese(Cat):
    pass

# Step 2: Create a List of Cat Instances
bengal_obj = Bengal("Leo", 3)
chartreux_obj = Chartreux("Felix", 5)
siamese_obj = Siamese("Milo", 2)

all_cats = [bengal_obj, chartreux_obj, siamese_obj]

# Step 3: Create a Pets Instance
sara_pets = Pets(all_cats)

# Step 4: Take Cats for a Walk
sara_pets.walk()

#2

class Dog:
    def __init__(self, name, age, weight):
        self.name = name
        self.age = age
        self.weight = weight

    def bark(self):
        return f"{self.name} is barking"

    def run_speed(self):
        return self.weight / self.age * 10

    def fight(self, other_dog):
        my_power = self.run_speed() * self.weight
        other_power = other_dog.run_speed() * other_dog.weight
        
        if my_power > other_power:
            return f"{self.name} won the fight!"
        elif other_power > my_power:
            return f"{other_dog.name} won the fight!"
        else:
            return "It's a tie!"

# Step 2: Create Dog Instances
dog1 = Dog("Rex", 4, 20)
dog2 = Dog("Max", 2, 15)
dog3 = Dog("Bella", 5, 25)

# Step 3: Test Dog Methods
print(dog1.bark())
print(f"{dog2.name}'s run speed: {dog2.run_speed()}")
print(dog1.fight(dog2))

#3

import random
# Assuming Dog class is saved in dog_module.py:
# from dog_module import Dog

class PetDog(Dog):
    def __init__(self, name, age, weight):
        super().__init__(name, age, weight)
        self.trained = False

    def train(self):
        print(self.bark())
        self.trained = True

    def play(self, *args):
        names = [self.name] + [dog.name if isinstance(dog, Dog) else str(dog) for dog in args]
        print(f"{', '.join(names)} all play together")

    def do_a_trick(self):
        if self.trained:
            tricks = [
                "does a barrel roll",
                "stands on his back legs",
                "shakes your hand",
                "plays dead"
            ]
            print(f"{self.name} {random.choice(tricks)}")

# Step 3: Test PetDog Methods
my_dog = PetDog("Fido", 2, 10)
friend_dog = PetDog("Buddy", 3, 12)

my_dog.train()
my_dog.play(friend_dog, "Max")
my_dog.do_a_trick()

#4

class Person:
    def __init__(self, first_name, age):
        self.first_name = first_name
        self.age = age
        self.last_name = ""

    def is_18(self):
        return self.age >= 18

class Family:
    def __init__(self, last_name):
        self.last_name = last_name
        self.members = []

    def born(self, first_name, age):
        new_person = Person(first_name, age)
        new_person.last_name = self.last_name
        self.members.append(new_person)

    def check_majority(self, first_name):
        for member in self.members:
            if member.first_name == first_name:
                if member.is_18():
                    print("You are over 18, your parents Jane and John accept that you will go out with your friends")
                else:
                    print("Sorry, you are not allowed to go out with your friends.")
                return

    def family_presentation(self):
        print(f"Family Name: {self.last_name}")
        for member in self.members:
            print(f"- {member.first_name}, Age: {member.age}")

# Testing Family and Person Classes
my_family = Family("Smith")
my_family.born("John", 40)
my_family.born("Jane", 38)
my_family.born("Alice", 19)
my_family.born("Bob", 15)

my_family.family_presentation()
my_family.check_majority("Alice")
my_family.check_majority("Bob")