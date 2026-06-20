const apiKey = 'pHendazeHJeW92taxVE68OphCId9A5YksuId5R5j';
const apiurl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;

// Elements from our HTML
const titleEl = document.getElementById('apod-title');
const mediaContainer = document.getElementById('media-container');
const dateEl = document.getElementById('apod-date');
const explanationEl = document.getElementById('apod-explanation');
const searchBtn = document.getElementById('search-btn');
const randomBtn = document.getElementById('random-btn');
const datePicker = document.getElementById('date-picker');

// Function to fetch data from NASA
async function fetchAPOD(date = '') {
    let url = apiurl; 
   
    if (date) {
        url = `${apiurl}&date=${date}`;
    }
    try {
      titleEl.textContent = "Navigating deep space...";
      const response = await fetch(url);
      const data = await response.json();
      displayData(data);
    } catch (error) {
        console.error("failed to connect to NASA:", error);
        titleEl.textContent = "Error loading Cosmic data. Did the engine stall?";
    }
}
// Function to display the data on the screen
function displayData(data) {
    mediaContainer.innerHTML = ''; // Clear previous media
    titleEl.textContent = data.title;
    dateEl.textContent = data.date;
    explanationEl.textContent = data.explanation;
     
    // NASA sometimes updates with a video instead of an image
    if (data.media_type == 'image') {
        const img = document.createElement('img');
        img.src = data.url;
        img.alt = data.title;
        mediaContainer.appendChild(img);
    }else if (data.media_type === 'video') {
        const iframe = document.createElement('iframe');
        iframe.src = data.url;
        iframe.width = "100%";
        iframe.height = "400px";
        mediaContainer.appendChild(iframe);
    }
}
// Function to generate a random valid cosmic date (Fixed format strings)
function getRandomDate() {
    const start = new Date(1995, 5, 16); // June 16, 1995
    const end = new Date(); // Today
    
    const randomTime = start.getTime() + Math.random() * (end.getTime() - start.getTime());
    const randomDate = new Date(randomTime);

    const year = randomDate.getFullYear();
    // String().padStart(2, '0') forces single digits to look like '05' or '09'
    const month = String(randomDate.getMonth() + 1).padStart(2, '0');
    const day = String(randomDate.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}
// Event Listener for the search button
searchBtn.addEventListener('click', () => {
    const selectedDate = datePicker.value;
    if (selectedDate) {
        fetchAPOD(selectedDate);
    
    }
    });
// Event Listener for the surprise button
randomBtn.addEventListener('click', () => {
    const luckyDate = getRandomDate();
    datePicker.value = luckyDate; 
    fetchAPOD(luckyDate); 
});

    // Load today's photo automatically when page opens 
    fetchAPOD();


  