# Exercise 1: Cars

manufacturers_text = "Volkswagen, Toyota, Ford Motor, Honda, Chevrolet"
manufacturers = manufacturers_text.split(", ")

print(f"There are {len(manufacturers)} manufacturers in the list.")
print("Manufacturers in descending order:")
print(sorted(manufacturers, reverse=True))

with_o = sum("o" in manufacturer.lower() for manufacturer in manufacturers)
without_i = sum("i" not in manufacturer.lower() for manufacturer in manufacturers)

print(f"Manufacturers with the letter 'o': {with_o}")
print(f"Manufacturers without the letter 'i': {without_i}")

duplicate_manufacturers = [
	"Honda",
	"Volkswagen",
	"Toyota",
	"Ford Motor",
	"Honda",
	"Chevrolet",
	"Toyota",
]

unique_manufacturers = list(dict.fromkeys(duplicate_manufacturers))
print("Companies without duplicates:")
print(", ".join(unique_manufacturers))
print(f"There are now {len(unique_manufacturers)} companies in the list.")

reversed_names = [
	manufacturer[::-1]
	for manufacturer in sorted(unique_manufacturers)
]
print("Manufacturers in ascending order with names reversed:")
print(reversed_names)
