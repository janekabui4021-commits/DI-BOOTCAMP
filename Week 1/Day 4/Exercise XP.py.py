# Step 1: Define the function
def display_message():
    # Step 2: Print the message
    print("I am learning about functions in Python.")

# Step 3: Call the function
display_message()

# Exercise 2: What's Your Favorite Book?
def favorite_book(title):
    print(f"One of my favorite books is {title}.")


favorite_book("Alice in Wonderland")


# Exercise 3: Some Geography
def describe_city(city, country="Unknown"):
    print(f"{city} is in {country}.")


describe_city("Reykjavik", "Iceland")
describe_city("Paris")


# Exercise 4: Random
import random


def compare_number(number):
    random_number = random.randint(1, 100)
    if number == random_number:
        print("Success!")
    else:
        print(f"Fail! Your number: {number}, Random number: {random_number}")


compare_number(50)


# Exercise 5: Let's Create Some Personalized Shirts!
def make_shirt(size="large", text="I love Python"):
    print(f"The shirt is size {size} and has the message: '{text}'.")


make_shirt()
make_shirt("medium")
make_shirt("small", "Python is fun!")
make_shirt(size="small", text="Hello!")