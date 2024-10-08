document.getElementById('fetch-news').addEventListener('click', async function () {
  const date = document.getElementById('news-date').value;
  const state = document.getElementById('state').value; // Assuming you have an input for the state

  if (!date || !state) {
      alert('Please select both a date and a state');
      return;
  }

  const newsContainer = document.getElementById('news-container');
  newsContainer.innerHTML = ''; // Clear previous news

  try {
      const apiKey = '3d9cc2fe8af54860b3f6662ec6cce6c0'; // Replace with your NewsAPI key
      const response = await fetch(
          `https://newsapi.org/v2/everything?q=${state}&from=${date}&to=${date}&sortBy=popularity&apiKey=${apiKey}`
      );

      if (!response.ok) {
          throw new Error(response.statusText);
      }

      const data = await response.json();

      if (data.articles.length > 0) {
          data.articles.forEach((article) => {
              const newsItem = document.createElement('div');
              newsItem.classList.add('news-item');

              newsItem.innerHTML = `
                  <h3><a href="${article.url}" target="_blank">${article.title}</a></h3>
                  <p>${article.description}</p>
                  <small>Source: ${article.source.name}</small>
              `;

              newsContainer.appendChild(newsItem);
          });
      } else {
          newsContainer.innerHTML = '<p>No news found for the selected state and date.</p>';
      }
  } catch (error) {
      console.error('Error fetching news:', error);
      newsContainer.innerHTML = '<p>There was an error fetching the news. Please try again later.</p>';
  }
});