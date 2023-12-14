import { useMapPopup } from '../composables/useMapPopup';

export const bindMapPopup = (map: mapboxgl.Map) => {
	const { setPopup, hidePopup } = useMapPopup();

	map.on('mouseenter', ['boundaries-fill'], (e) => {
		if (!e.features || e.features.length === 0) return;
		const feature = e.features[0];
		if (!feature.properties) return;
		map.getCanvas().style.cursor = 'pointer';

		const layerId = feature.layer.id;
		const name = feature.properties.name;

		if (layerId === 'boundaries-fill') {
			// wrong types in geojson
			const coordinates = (e.features[0].geometry as any).coordinates[0][0];
			console.log(coordinates);

			setPopup(name, `COUNTZ: ${feature.properties.count}`, [coordinates[0], coordinates[1]]);
		}

		if (layerId === 'vehicle-layer' && feature.geometry.type === 'Point') {
			setPopup(name, `Pollution: ${feature.properties.pollutionFactor.toFixed(2)}`, [
				feature.geometry.coordinates[0],
				feature.geometry.coordinates[1],
			]);
		}
	});

	map.on('mouseleave', ['edge-area-layer', 'vehicle-layer'], () => {
		map.getCanvas().style.cursor = '';
		hidePopup();
	});
};
