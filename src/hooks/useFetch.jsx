import { useEffect, useState } from "react"
import { images } from '../constants/index'
import { marvel_private_key, marvel_public_key, heroes } from '../utils/constants'
import axios from 'axios'
import md5 from 'js-md5';

const useFetch = ({ keyword }) => {
	const [heroImage, setHeroImage] = useState("");

	const fetchImage = async () => {
		try {
			const result = heroes.find(hero => hero.name == keyword)
			if (result) {
				const ts = Number(new Date())
				const hash = md5.create()
				hash.update(ts + marvel_private_key + marvel_public_key)
				const response = await axios.get(`https://gateway.marvel.com:443/v1/public/characters/${result.id}?&ts=${ts}&apikey=${marvel_public_key}&hash=${hash.hex()}`)
				setHeroImage(response.data.data.results[0].thumbnail.path + '.jpg')
			} else {
				setHeroImage(images.starescover)
			}
		} catch (error) {
			setHeroImage(images.starescover)
		}
	}

	useEffect(() => {
		if (keyword) fetchImage()
	}, [keyword]);

	return heroImage;
};

export default useFetch;