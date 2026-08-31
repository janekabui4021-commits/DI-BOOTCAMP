import time
import requests


def get_load_time(url: str) -> float:
    """Measures the time it takes to receive a response from a URL in seconds."""
    # Ensure the URL includes a scheme
    if not url.startswith(("http://", "https://")):
        url = "https://" + url

    start_time = time.time()
    response = requests.get(url)
    end_time = time.time()

    # Calculate total duration in seconds
    elapsed_time = end_time - start_time
    return elapsed_time


# Test the function with multiple websites
sites = [
    "https://www.google.com",
    "https://www.ynet.co.il",
    "https://www.imdb.com",
]

for site in sites:
    load_time = get_load_time(site)
    print(f"Time taken to load {site}: {load_time:.4f} seconds")