def caesar_cipher(text: str, shift: int, mode: str) -> str:
    result = ""

    # Reverse the shift direction for decryption
    if mode == "decrypt":
        shift = -shift

    for char in text:
        if char.isalpha():
            # Determine starting ASCII code (65 for 'A', 97 for 'a')
            start = ord("A") if char.isupper() else ord("a")

            # Shift character with wrap-around using modulo 26
            new_char = chr((ord(char) - start + shift) % 26 + start)
            result += new_char
        else:
            # Preserve non-alphabetical characters as-is
            result += char

    return result


def main():
    print("--- Caesar Cipher Program ---")

    # Prompt user for mode
    while True:
        mode = (
            input("Would you like to (E)ncrypt or (D)ecrypt? ").strip().lower()
        )
        if mode in ["e", "encrypt"]:
            mode = "encrypt"
            break
        elif mode in ["d", "decrypt"]:
            mode = "decrypt"
            break
        else:
            print("Invalid choice. Please enter 'encrypt' or 'decrypt'.")

    # Prompt user for message and shift amount
    message = input("Enter your message: ")

    while True:
        try:
            shift = int(input("Enter the shift number: "))
            break
        except ValueError:
            print("Please enter a valid integer for the shift.")

    # Process and output result
    output = caesar_cipher(message, shift, mode)
    print(f"\nResult ({mode.capitalize()}ed): {output}")


if __name__ == "__main__":
    main()