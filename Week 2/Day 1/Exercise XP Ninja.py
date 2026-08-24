class Phone:

    def __init__(self, phone_number):
        self.phone_number = phone_number
        self.call_history = []
        self.messages = []

    def call(self, other_phone):
        call_detail = f"{self.phone_number} called {other_phone.phone_number}"
        print(call_detail)

        # Record call in caller's history
        self.call_history.append(call_detail)
        # Record call in receiver's history
        other_phone.call_history.append(call_detail)

    def show_call_history(self):
        print(f"\n--- Call History for {self.phone_number} ---")
        if not self.call_history:
            print("No call history.")
        for record in self.call_history:
            print(record)

    def send_message(self, other_phone, content):
        message_data = {
            "to": other_phone.phone_number,
            "from": self.phone_number,
            "content": content,
        }

        
        self.messages.append(message_data)
        other_phone.messages.append(message_data)
        print(f"Message sent from {self.phone_number} to {other_phone.phone_number}")

    def show_outgoing_messages(self):
        print(f"\n--- Outgoing Messages for {self.phone_number} ---")
        outgoing = [m for m in self.messages if m["from"] == self.phone_number]
        if not outgoing:
            print("No outgoing messages.")
        for msg in outgoing:
            print(f"To {msg['to']}: {msg['content']}")

    def show_incoming_messages(self):
        print(f"\n--- Incoming Messages for {self.phone_number} ---")
        incoming = [m for m in self.messages if m["to"] == self.phone_number]
        if not incoming:
            print("No incoming messages.")
        for msg in incoming:
            print(f"From {msg['from']}: {msg['content']}")

    def show_messages_from(self, other_phone):
        print(
            f"\n--- Messages Received by {self.phone_number} from {other_phone.phone_number} ---"
        )
        filtered = [
            m
            for m in self.messages
            if m["to"] == self.phone_number
            and m["from"] == other_phone.phone_number
        ]
        if not filtered:
            print("No messages found from this number.")
        for msg in filtered:
            print(f"Content: {msg['content']}")



if __name__ == "__main__":
    phone1 = Phone("254-758-563-144")
    phone2 = Phone("254-787-914-956")
    phone3 = Phone("254-726-233-647")

    
    print("=== Testing Calls ===")
    phone1.call(phone2)
    phone2.call(phone3)

    phone1.show_call_history()
    phone2.show_call_history()

    
    print("\n=== Testing Messages ===")
    phone1.send_message(phone2, "Hey, how are you?")
    phone2.send_message(phone1, "I'm good, thanks!")
    phone3.send_message(phone1, "Don't forget the meeting.")

    phone1.show_outgoing_messages()
    phone1.show_incoming_messages()
    phone1.show_messages_from(phone2)