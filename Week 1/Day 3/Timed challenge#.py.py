x = int(input('Enter the Number: '))

# Sum all proper divisors (numbers less than x that divide x evenly)
divisors_sum = sum(i for i in range(1, x) if x % i == 0)

# Print True if the sum equals the original number, else False
print(divisors_sum == x)