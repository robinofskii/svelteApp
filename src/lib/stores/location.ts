import { readable } from 'svelte/store';

type LocationType = {
	data: {
		latitude: number;
		longitude: number;
	};
	error?: string;
	loading: boolean;
};

const initialLocation: LocationType = {
	data: {
		latitude: 0,
		longitude: 0,
	},
	loading: true,
};

const location = readable<LocationType>(initialLocation, (set) => {
	let locationWatcher: number | undefined;

	if (navigator.geolocation && navigator.geolocation.watchPosition) {
		locationWatcher = navigator.geolocation.watchPosition(
			(position) => {
				const { latitude, longitude } = position.coords;
				set({
					data: {
						latitude,
						longitude,
					},
					loading: false,
				});
			},
			(error) => {
				set({
					data: {
						latitude: 0,
						longitude: 0,
					},
					error: error.message,
					loading: false,
				});
			},
			{
				enableHighAccuracy: true,
				timeout: 5000,
			}
		);
	}
	return () => {
		if (navigator.geolocation && navigator.geolocation.clearWatch) {
			navigator.geolocation.clearWatch(locationWatcher);
		}
	};
});

export default location;
