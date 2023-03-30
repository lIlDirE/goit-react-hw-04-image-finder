import axios from "axios";
import PropTypes from 'prop-types';
const API_KEY = '33366333-0003f8d7ddc57df9984e9b7db'

axios.defaults.baseURL = `https://pixabay.com/api/`;

export async function ReturnFetch(searchValue, page){

		const fetchImage = await axios('', {
		  params: {
			key: API_KEY,
			page: page,
			image_type: 'photo',
			orientation: 'horizontal',
			per_page: 12,
			q: searchValue,
		  },
		});

		return fetchImage.data;
	  }

ReturnFetch.prototypes = {
	searchValue: PropTypes.string.isRequired,
	page: PropTypes.number.isRequired
}	  