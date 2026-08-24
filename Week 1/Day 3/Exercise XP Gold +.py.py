student_grades = {
     "Alice": [88, 92, 100],
     "Bob": [75, 78, 80],
     "Charlie": [92, 90, 85],
     "Dana": [83, 88, 92],
     "Eli": [78, 80, 72]
    }

# Calculate the average grade for each student

student_averages = {}
for name, grades in student_grades.items():
     average = sum(grades) / len(grades)
     student_averages[name] = average

# Assign each student a letter grade based on their average grade
student_letter_grades = {}
for name, avg in student_averages.items():
    if avg >= 90:
         grade = 'A'
    elif avg >= 80:
        grade = 'B'
    elif avg >= 70:
        grade = 'C'
    elif avg >= 60:
        grade = 'D'
    else:
        grade = 'F'
    student_letter_grades[name] = grade

# Calculate the class average
total_average = sum(student_averages.values())
class_size = len(student_averages)
class_average = total_average / class_size

print(student_averages)
print(student_letter_grades)
print(class_average)

max_name_length = max(len(name) for name in student_grades.keys())

for name in student_grades.keys():
    spaces = ' ' * (max_name_length - len(name))
    print(f"{name}:{spaces} Average Grade = {student_averages[name]:.2f},  Letter Grade = {student_letter_grades[name]}")


