const apiKey = "AIzaSyDYdzEQ8TgIHN13dzl93lgHYiL3pmCvyvU";
const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=surfing&key=${apiKey}`;

fetch(url)
  .then(response => {
    if (response.status === 200) {
      console.log("API key is working!");
      return response.json();
    } else {
      console.log(`Error: ${response.status}`);
      return response.text();
    }
  })
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error('Error:', error);
  });
