import re

MATRIX_STR = '''
7ir
Tsi
h%x
i ?
sM# 
$a 
#t%'''

# Step 1: Transform string into a 2D List (matrix)
# Strip leading/trailing newlines and split by line
lines = MATRIX_STR.strip('\n').split('\n')
matrix = [list(row) for row in lines]

num_rows = len(matrix)
num_cols = len(matrix[0])

# Step 2 & 3: Iterate column by column and extract characters
raw_column_text = ""
for col in range(num_cols):
    for row in range(num_rows):
        raw_column_text += matrix[row][col]

# Step 4 & 5: Replace symbols between alpha characters with spaces
# Using Regular Expressions:
# \b represents word boundaries, [^a-zA-Z]+ finds groups of non-alpha characters between letters
decoded_message = re.sub(r'(?<=[a-zA-Z])[^a-zA-Z]+(?=[a-zA-Z])', ' ', raw_column_text)

# Alternatively, without using the re module:
# Filter out leading/trailing non-alpha characters from the start/end if needed,
# and replace internal sequences of non-alpha characters with a single space.

print(decoded_message)