const apiKey = 'pHendazeHJeW92taxVE68OphCId9A5YksuId5R5';
const apiurl = 'https://api.nasa.gov/planetary/apod?api_key=${apiKey}';

// Elements from our HTML
const titleEl = document.getElementById('apod-title');
const mediaContainer = document.getElementById('media container');
const dateEl = document.getElementById('apod-date');
const explanationEl = document.getElementById('apod-explanation');
const searchBtn = document.getElementById('search-btn');
const datePicker = document.getElementById('date-picker');

// Function to fetch data from NASA
async function fetchAPOD(date = '') {
    leturl = apiurl;
    if (date) {
        url += '&date=${date}';
    }
    try {
      titleEl.textContent = "Naviating deep space...";
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
    titleEl.textcontent = data.title;
    dateEl.textcontent = data.date;
    explanationEl.textcontent = data.explanation;
     
    // NASA sometimes updates with a video instead of an image
    if (data.mediatype == 'image') {
        const img = document .createElement('img');
        img.src = data.url;
        img.alt = data.title;
        mediaContainer.appendChild(img);
    }else if (data.media_type === 'video') {
        const iframe = document.createElement('iframe');
        iframe.src = data.url;
        iframe.width = "100%";
        iframe.height = "400 px";
        mediaContainer.appendChild(iframe);
    }
}

// Event Listener for the search button
searchBtn.addEventListener('click', () => {
    const selectedDate = datePicker.value;
    if (selectedDate) {
        fetchAPOD(selectedDate);
    
    }
    });

    // Load today's photo automatically when page opens 
    fetchAPOD();


  