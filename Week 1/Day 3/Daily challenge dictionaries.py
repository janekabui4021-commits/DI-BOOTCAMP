def get_affordable_items(items_purchase: dict, wallet: str):
    # Clean and convert the wallet amount to an integer
    wallet_amount = int(wallet.replace("$", "").replace(",", ""))

    basket = []

    # Iterate through items in order of priority (dictionary order)
    for item, price_str in items_purchase.items():
        # Clean and convert item price to an integer
        price = int(price_str.replace("$", "").replace(",", ""))

        # Check if we can afford the item
        if wallet_amount >= price:
            basket.append(item)
            wallet_amount -= price

    # Return "Nothing" if empty, otherwise return sorted basket
    if not basket:
        return "Nothing"

    return sorted(basket)


# --- Example Test Cases ---

# Example 1
items_1 = {"Water": "$1", "Bread": "$3", "TV": "$1,000", "Fertilizer": "$20"}
wallet_1 = "$300"
print(get_affordable_items(items_1, wallet_1))
# Output: ['Bread', 'Fertilizer', 'Water']

# Example 2
items_2 = {
    "Apple": "$4",
    "Honey": "$3",
    "Fan": "$14",
    "Bananas": "$4",
    "Pan": "$100",
    "Spoon": "$2",
}
wallet_2 = "$100"
print(get_affordable_items(items_2, wallet_2))
# Output: ['Apple', 'Bananas', 'Fan', 'Honey', 'Spoon']

# Example 3
items_3 = {
    "Phone": "$999",
    "Speakers": "$300",
    "Laptop": "$5,000",
    "PC": "$1200",
}
wallet_3 = "$1"
print(get_affordable_items(items_3, wallet_3))
# Output: "Nothing"