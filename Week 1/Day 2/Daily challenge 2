from datetime import date, datetime


cake = """       ___{candles}___
			|:H:a:p:p:y:|
		__|___________|__
	 |^^^^^^^^^^^^^^^^^|
	 |:B:i:r:t:h:d:a:y:|
	 |                 |
	 ~~~~~~~~~~~~~~~~~~~"""

birthdate_text = input("Enter your birthdate (DD/MM/YYYY): ")
birthdate = datetime.strptime(birthdate_text, "%d/%m/%Y").date()
today = date.today()

age = today.year - birthdate.year
if (today.month, today.day) < (birthdate.month, birthdate.day):
	age -= 1

candle_count = age % 10
candles = "i" * candle_count
print(cake.format(candles=candles))

if birthdate.year % 4 == 0 and (
	birthdate.year % 100 != 0 or birthdate.year % 400 == 0
):
	print()
	print(cake.format(candles=candles))

