class BankAccount:
    def __init__(self, balance=0, username="", password=""):
        if balance < 0:
            raise Exception("Balance cannot be negative.")

        self.balance = balance
        self.username = username
        self.password = password
        self.authenticated = False

    def authenticate(self, username, password):
        if username == self.username and password == self.password:
            self.authenticated = True
            return True

        return False

    def _check_authentication(self):
        if not self.authenticated:
            raise Exception("Please authenticate first.")

    def deposit(self, amount):
        self._check_authentication()

        if not isinstance(amount, int) or isinstance(amount, bool) or amount <= 0:
            raise Exception("Deposit amount must be a positive integer.")

        self.balance += amount

    def withdraw(self, amount):
        self._check_authentication()

        if not isinstance(amount, int) or isinstance(amount, bool) or amount <= 0:
            raise Exception("Withdrawal amount must be a positive integer.")

        if amount > self.balance:
            raise Exception("Insufficient funds.")

        self.balance -= amount


class MinimumBalanceAccount(BankAccount):
    def __init__(
        self,
        balance=0,
        minimum_balance=0,
        username="",
        password=""
    ):
        super().__init__(balance, username, password)
        self.minimum_balance = minimum_balance

    def withdraw(self, amount):
        self._check_authentication()

        if not isinstance(amount, int) or isinstance(amount, bool) or amount <= 0:
            raise Exception("Withdrawal amount must be a positive integer.")

        if self.balance - amount < self.minimum_balance:
            raise Exception("Minimum balance requirement would be violated.")

        self.balance -= amount


class ATM:
    def __init__(self, account_list, try_limit):
        if not isinstance(account_list, list):
            raise Exception("account_list must be a list.")

        if not all(isinstance(account, BankAccount) for account in account_list):
            raise Exception("All items must be bank accounts.")

        try:
            if try_limit <= 0:
                raise ValueError
        except (TypeError, ValueError):
            print("Invalid try limit. Defaulting to 2.")
            try_limit = 2

        self.account_list = account_list
        self.try_limit = try_limit
        self.current_tries = 0

        self.show_main_menu()

    def show_main_menu(self):
        while self.current_tries < self.try_limit:
            print("\nATM Menu")
            print("1. Log in")
            print("2. Exit")

            choice = input("Choose an option: ")

            if choice == "1":
                username = input("Username: ")
                password = input("Password: ")

                if self.log_in(username, password):
                    return

            elif choice == "2":
                print("Goodbye!")
                return

            else:
                print("Invalid option.")

        print("Maximum login attempts reached.")

    def log_in(self, username, password):
        for account in self.account_list:
            if account.authenticate(username, password):
                print("Login successful.")
                self.show_account_menu(account)
                return True

        self.current_tries += 1
        print("Invalid username or password.")
        return False

    def show_account_menu(self, account):
        while True:
            print(f"\nCurrent balance: {account.balance}")
            print("1. Deposit")
            print("2. Withdraw")
            print("3. Exit")

            choice = input("Choose an option: ")

            try:
                if choice == "1":
                    amount = int(input("Deposit amount: "))
                    account.deposit(amount)
                    print("Deposit successful.")

                elif choice == "2":
                    amount = int(input("Withdrawal amount: "))
                    account.withdraw(amount)
                    print("Withdrawal successful.")

                elif choice == "3":
                    print("Logged out.")
                    return

                else:
                    print("Invalid option.")

            except ValueError:
                print("Please enter a whole number.")
            except Exception as error:
                print(error)


if __name__ == "__main__":
    accounts = [
        BankAccount(
            balance=1000,
            username="alice",
            password="1234"
        ),
        MinimumBalanceAccount(
            balance=500,
            minimum_balance=100,
            username="bob",
            password="5678"
        )
    ]

    ATM(accounts, try_limit=3)