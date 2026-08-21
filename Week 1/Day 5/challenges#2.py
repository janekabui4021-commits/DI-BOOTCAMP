rows = 3
for i in range(rows):
  print(" " * (rows - i - 1) + "*" * (2 * i + 1))

  rows = 5
for i in range(rows):
  print(" " * (rows - i - 1) + "*" * (i + 1))


  rows = 5
# Top half
for i in range(1, rows + 1):
  print("*" * i)
# Bottom half
for i in range(rows):
  print(" " * i + "*" * (rows - i))


  #2
  my_list = [2, 24, 12, 354, 233]  # Initialize the list of integers
for i in range(
    len(my_list) - 1
):  # Loop through indices 0 to 3 as target positions
  minimum = i  # Set current index 'i' as baseline minimum
  for j in range(
      i + 1, len(my_list)
  ):  # Look at remaining elements to the right
    if my_list[j] < my_list[minimum]:  # Check if element at 'j' is smaller
      minimum = j  # Update minimum index
      if minimum != i:  # Check if index changed (nested inside inner loop)
        my_list[i], my_list[minimum] = (
            my_list[minimum],
            my_list[i],
        )  # Swap element at 'i' with new smaller element immediately
print(my_list)  # Print the sorted list
