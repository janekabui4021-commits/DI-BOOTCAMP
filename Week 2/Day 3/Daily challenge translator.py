import sys
import types
from email.message import Message


try:
    import cgi
except ModuleNotFoundError:
    cgi_compat = types.ModuleType("cgi")

    def parse_header(value):
        message = Message()
        message["content-type"] = value
        parameters = dict(message.get_params()[1:])
        return message.get_content_type(), parameters

    cgi_compat.parse_header = parse_header
    sys.modules["cgi"] = cgi_compat

from googletrans import Translator

# Input list of French words
french_words = ["Bonjour", "Au revoir", "Bienvenue", "A bientôt"]

# Initialize the translator
translator = Translator()

# Translate each word using a dictionary comprehension
translations = {
    word: translator.translate(word, src="fr", dest="en").text
    for word in french_words
}

print(translations)