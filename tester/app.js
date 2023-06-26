const axios = require('axios');

const options = {
  method: 'GET',
  url: 'https://product-lookup-by-upc-or-ean.p.rapidapi.com/code/829576019311',
  headers: {
    'X-RapidAPI-Key': 'c78b5f6f31msh361c3f44735cf8bp1d335djsna467facb6e09',
    'X-RapidAPI-Host': 'product-lookup-by-upc-or-ean.p.rapidapi.com'
  }
};

try {
	const response = await axios.request(options);
	console.log(response.data);
} catch (error) {
	console.error(error);
}