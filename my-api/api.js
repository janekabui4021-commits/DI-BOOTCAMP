
const url = "https://jsonplaceholder.typicode.com/posts/1";

async function main() {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const data = await response.json();
    console.log("API is working!");
    console.log(data);
  } catch (error) {
    console.error("Error:", error.message);
  }
}

main();
