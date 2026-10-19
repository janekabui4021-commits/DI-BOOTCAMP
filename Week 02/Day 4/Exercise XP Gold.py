#1 giffy exercise#1
import requests

# Step 1: Define variables and construct the URL using f-strings
query = "hilarious"
rating = "g"
api_key = "hpvZycW22qCjn5cRM1xtWB8NKq4dQ2My"
limit = 10  # Request parameter to return only the first 10 GIFs

url = f"https://api.giphy.com/v1/gifs/search?q={query}&rating={rating}&api_key={api_key}&limit={limit}"

# Fetch data from the endpoint
response = requests.get(url)

# Step 2: Check status code and get JSON object
if response.status_code == 200:
    data = response.json()
    gif_list = data.get("data", [])

    # Step 3: Filter GIFs with height > 100
    filtered_gifs = []
    for gif in gif_list:
        # Check original image height or fixed_height
        height = int(gif["images"]["original"]["height"])
        if height > 100:
            filtered_gifs.append(gif)

    # Step 4: Return length of the filtered list
    print(
        f"Length of filtered object (GIFs with height > 100): {len(filtered_gifs)}"
    )

    # Output details of the returned GIFs
    for i, gif in enumerate(filtered_gifs, 1):
        print(f"{i}. Title: {gif['title']} | Height: {gif['images']['original']['height']} | URL: {gif['url']}")
else:
    print(f"Failed to retrieve data. Status code: {response.status_code}")
    #3 giffy API #2
    import requests

API_KEY = "hpvZycW22qCjn5cRM1xtWB8NKq4dQ2My"


def get_trending_gifs():
    """Fetches trending GIFs of the day."""
    trending_url = f"https://api.giphy.com/v1/gifs/trending?api_key={API_KEY}&limit=10&rating=g"
    response = requests.get(trending_url)
    if response.status_code == 200:
        return response.json().get("data", [])
    return []


def search_giphy():
    user_input = input("Enter a search term or phrase: ").strip()

    # If the user didn't enter anything
    if not user_input:
        print("\nNo search term entered.")
        print(
            "Could not find the requested term or phrase. Showing trending GIFs of the day:\n"
        )
        gifs = get_trending_gifs()
    else:
        # Search for the term
        search_url = f"https://api.giphy.com/v1/gifs/search?q={user_input}&api_key={API_KEY}&rating=g&limit=10"
        response = requests.get(search_url)

        if response.status_code == 200:
            gifs = response.json().get("data", [])

            # If term doesn't produce any results
            if not gifs:
                print(
                    f"\nCould not find any GIFs for the term '{user_input}'."
                )
                print("Showing trending GIFs of the day instead:\n")
                gifs = get_trending_gifs()
            else:
                print(f"\nFound GIFs for '{user_input}':\n")
        else:
            print("\nError fetching search results from Giphy API.")
            print("Showing trending GIFs of the day:\n")
            gifs = get_trending_gifs()

    # Display results
    for index, gif in enumerate(gifs, 1):
        print(f"{index}. {gif.get('title', 'Untitled')} -> {gif.get('url')}")


if __name__ == "__main__":
    search_giphy()