// 1. Define the Video class
class Video {
  constructor(title, uploader, time) {
    this.title = title;
    this.uploader = uploader;
    this.time = time;
  }

  // 2. Define the watch() method
  watch() {
    console.log(`${this.uploader} watched all ${this.time} of ${this.title}!`);
  }
}

// 3. Instantiate a new Video instance and call watch()
const video1 = new Video("JavaScript Fundamentals", "Alice", 300);
video1.watch(); 

// 4. Instantiate a second Video instance with different values
const video2 = new Video("Advanced CSS Animations", "Bob", 600);
video2.watch(); 


// --- BONUS ---

// 5. Array storing data for five Video instances using objects
const videoData = [
  { title: "React Crash Course", uploader: "Charlie", time: 1200 },
  { title: "Node.js Basics", uploader: "Diana", time: 900 },
  { title: "Python for Beginners", uploader: "Eve", time: 1500 },
  { title: "SQL Tutorial", uploader: "Frank", time: 800 },
  { title: "Docker Explained", uploader: "Grace", time: 450 }
];

// 6. Loop through the array to instantiate Video instances and call watch()
const videoInstances = videoData.map(data => new Video(data.title, data.uploader, data.time));

// Call watch() on each instantiated video
videoInstances.forEach(video => video.watch());