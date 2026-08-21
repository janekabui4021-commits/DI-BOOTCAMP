def get_age(year, month, day):
    # Hardcoded current date (e.g., Year: 2026, Month: 8, Day: 20)
    current_year = 2026
    current_month = 8
    current_day = 20
    
    age = current_year - year
    # Adjust age if the birthday hasn't occurred yet this year
    if (current_month, current_day) < (month, day):
        age -= 1
        
    return age

def can_retire(gender, date_of_birth):
    # Split "yyyy/mm/dd" string into integers
    year_str, month_str, day_str = date_of_birth.split('/')
    year = int(year_str)
    month = int(month_str)
    day = int(day_str)
    
    age = get_age(year, month, day)
    
    # Retirement conditions
    if gender.lower() == 'm' and age >= 67:
        return True
    elif gender.lower() == 'f' and age >= 62:
        return True
    else:
        return False

# Main Execution
user_gender = input("Enter your gender ('m' or 'f'): ")
user_dob = input("Enter your date of birth (yyyy/mm/dd): ")

if can_retire(user_gender, user_dob):
    print("Congratulations! You can retire.")
else:
    print("You cannot retire yet.")