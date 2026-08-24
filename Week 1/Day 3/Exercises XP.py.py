 #1 Converting Lists into Dictionaries
keys = ['Ten', 'Twenty', 'Thirty']
values = [10,20,30]
result =dict(zip(keys,values))
print(result)

#2 Write a program that calculates the total cost of movie tickets for a family based on their ages.

y = {"rick": 43, "beth": 13, "morty": 5, "summer": 8}
total_cost = 0
for name, age in y.items():
    if age < 3:
        price=0
    elif age <= 12:
        price = 10
    else: 
        price = 15
        print(f"{name}: ${price}")
        total_cost+= price
        print(f"Total cost: ${total_cost}")

#3 Zara
brand = {
    "name": "Zara",
    "creation_date": 1975,
    "creator_name": "Amancio Ortega Gaona",
    "type_of_clothes": ["men", "women", "children", "home"],
    "international_competitors": ["Gap", "H&M", "Benetton"],
    "number_stores": 7000,
    "major_color": {
        "France": ["blue"],
        "Spain": ["red"],
        "US": ["pink", "green"],
    },
}
brand["number_stores"] = 2
print(f"Zara's clients can shop for {', '.join(brand['type_of_clothes'])} clothes.")
brand["country_creation"] = "Spain"

if "international_competitors" in brand:
    brand["international_competitors"].append("Desigual")

del brand["creation_date"]
print(brand["international_competitors"][-1])
print(brand["major_color"]["US"])
print(len(brand))
print(list(brand.keys()))

# Bonus
more_on_zara = {"creation_date": 1975, "number_stores": 7000}
brand.update(more_on_zara)
print(brand)


#4 Disney Characters
names = ["Mickey", "Minnie", "Donald", "Ariel", "Pluto"]


# Characters as keys and indexes as values
characters_to_indexes = {character: index for index, character in enumerate(users)}
print(characters_to_indexes)

# Indexes as keys and characters as values
indexes_to_characters = {index: character for index, character in enumerate(users)}
print(indexes_to_characters)

# Characters as keys and indexes as values, sorted alphabetically
sorted_characters_to_indexes = {
    character: index
    for index, character in sorted(enumerate(names), key=lambda item: item[1])
}
print(sorted_characters_to_indexes)