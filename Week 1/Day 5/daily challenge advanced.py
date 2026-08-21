import random

list_of_numbers = [random.randint(0, 10000) for _ in range(20000)]
target_number = 3728

seen = set()
pairs = set()

for number in list_of_numbers:
    complement = target_number - number
    if complement in seen:
        # Store sorted tuple to avoid duplicate reverse pairs e.g., (1000, 2728) vs (2728, 1000)
        pairs.add((min(number, complement), max(number, complement)))
    seen.add(number)

# Print all found pairs
for num1, num2 in pairs:
    print(f"{num1} and {num2} sums to the target_number {target_number}")

print(f"\nTotal unique pairs found: {len(pairs)}")