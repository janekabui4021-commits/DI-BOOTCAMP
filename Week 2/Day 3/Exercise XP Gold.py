from datetime import date, datetime
import holidays


def upcoming_holiday(country_code="US"):
    today = date.today()
    print(f"Today's date is: {today}")

    # Fetch holidays for current and next year
    country_holidays = holidays.country_holidays(
        country_code, years=[today.year, today.year + 1]
    )

    # Find the next upcoming holiday
    future_holidays = [
        (holiday_date, name)
        for holiday_date, name in country_holidays.items()
        if holiday_date >= today
    ]
    future_holidays.sort()

    next_date, next_name = future_holidays[0]
    days_left = (next_date - today).days

    print(
        f"The next holiday is {next_name} in {days_left} days on {next_date}."
    )


upcoming_holiday()

#2
def calculate_planet_ages(seconds: float):
    earth_year_seconds = 31557600

    orbital_periods = {
        "Earth": 1.0,
        "Mercury": 0.2408467,
        "Venus": 0.61519726,
        "Mars": 1.8808158,
        "Jupiter": 11.862615,
        "Saturn": 29.447498,
        "Uranus": 84.016846,
        "Neptune": 164.79132,
    }

    earth_years = seconds / earth_year_seconds

    print(f"Age in Seconds: {seconds:,}")
    for planet, period in orbital_periods.items():
        planet_age = earth_years / period
        print(f"- {planet}: {planet_age:.2f} {planet}-years old")


calculate_planet_ages(1000000000)

#3

import re


def return_numbers(text: str) -> str:
    # Find all digit characters and join them together
    digits = re.findall(r"\d", text)
    return "".join(digits)


print(return_numbers("k5k3q2g5z6x9bn"))  # Output: 532569

#4
import re


def validate_name():
    name = input("Enter your full name (e.g., 'John Doe'): ").strip()

    # Regex pattern: Exactly two words separated by a single space, both capitalized
    pattern = r"^[A-Z][a-z]+ [A-Z][a-z]+$"

    if re.match(pattern, name):
        print("Valid full name!")
    else:
        print("Invalid name. Must contain exactly two capitalized names.")


validate_name()

import random
import re
import string


def generate_password(length: int) -> str:
    digits = string.digits
    lower = string.ascii_lowercase
    upper = string.ascii_uppercase
    special = "!@#$%^&*"

    # Ensure at least 1 character from each required category
    password_chars = [
        random.choice(digits),
        random.choice(lower),
        random.choice(upper),
        random.choice(special),
    ]

    # Fill the remainder of the length with random choices across all sets
    all_chars = digits + lower + upper + special
    password_chars += [
        random.choice(all_chars) for _ in range(length - 4)
    ]

    # Shuffle to randomize placement of required characters
    random.shuffle(password_chars)
    return "".join(password_chars)


def validate_password(password: str, expected_length: int) -> bool:
    if len(password) != expected_length:
        return False
    if not re.search(r"\d", password):
        return False
    if not re.search(r"[a-z]", password):
        return False
    if not re.search(r"[A-Z]", password):
        return False
    if not re.search(r"[!@#$%^&*]", password):
        return False
    return True


def test_password_generator():
    """Runs 100 automated test generations across varying lengths."""
    for _ in range(100):
        length = random.randint(6, 30)
        pwd = generate_password(length)
        assert validate_password(pwd, length), f"Validation failed for: {pwd}"
    print("All 100 password generation tests passed successfully!")


def main():
    # Run automatic testing suite first
    test_password_generator()

    # User interactive loop
    while True:
        try:
            length = int(
                input(
                    "Enter password length (between 6 and 30 characters): "
                )
            )
            if 6 <= length <= 30:
                break
            print("Length must be between 6 and 30.")
        except ValueError:
            print("Please enter a valid number.")

    password = generate_password(length)
    print(f"\nGenerated Password: {password}")
    print("Store this password safely in a password manager!")


if __name__ == "__main__":
    main()#5
