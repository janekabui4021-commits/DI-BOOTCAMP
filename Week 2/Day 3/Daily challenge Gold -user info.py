data = []

# 1. Ask the user for input 5 times
for i in range(5):
    print(f"--- Entry {i + 1} ---")
    name = input("Enter Name: ")
    age = input("Enter Age: ")
    score = input("Enter Score: ")

    # Append tuple to list (keeping age and score as int for proper sorting)
    data.append((name, int(age), int(score)))

# 2. Sort using a lambda function prioritizing Name > Age > Score
data.sort(key=lambda item: (item[0], item[1], item[2]))

# 3. Format tuple elements back to strings to match expected output format
formatted_result = [
    (item[0], str(item[1]), str(item[2])) for item in data
]

print("\nSorted Result:")
print(formatted_result)