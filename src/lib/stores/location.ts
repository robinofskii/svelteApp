import { readable } from 'svelte/store';

import type { Coordinates } from '../../models/Location';

type LocationType = {
	data: Coordinates;
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

export const locationStore = readable<LocationType>(initialLocation, (set) => {
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
