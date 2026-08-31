import json

sampleJson = """{ 
   "company":{ 
      "employee":{ 
         "name":"emma",
         "payable":{ 
            "salary":7000,
            "bonus":800
         }
      }
   }
}"""

# Step 1: Load the JSON string into a Python dictionary
data = json.loads(sampleJson)

# Step 2: Access and print the nested "salary" key
salary = data["company"]["employee"]["payable"]["salary"]
print(f"Salary: {salary}")

# Step 3: Add the "birth_date" key to the "employee" dictionary
data["company"]["employee"]["birth_date"] = "2000-04-25"

# Step 4: Save the modified dictionary to a JSON file formatted with indent
with open("employee.json", "w") as file:
    json.dump(data, file, indent=4)

print("Successfully updated and saved JSON data to 'employee.json'.")