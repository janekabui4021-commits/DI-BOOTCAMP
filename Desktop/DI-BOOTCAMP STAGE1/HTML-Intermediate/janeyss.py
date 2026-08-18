def calculate_pet_years(human_years):
    if human_years == 1:
        cat_years = 15
        dog_years = 15
    elif human_years == 2:
        cat_years = 15 + 9
        dog_years = 15 + 9
    else:
        # First 2 years (15 + 9 = 24) plus 4 per additional year for cats
        cat_years = 24 + (human_years - 2) * 4
        # First 2 years (15 + 9 = 24) plus 5 per additional year for dogs
        dog_years = 24 + (human_years - 2) * 5

    return [human_years, cat_years, dog_years]


# --- Test Cases ---
print(calculate_pet_years(1))   # Output: [1, 15, 15]
print(calculate_pet_years(2))   # Output: [2, 24, 24]
print(calculate_pet_years(10))  # Output: [10, 56, 64]