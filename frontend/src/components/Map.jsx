import React, { useRef, useEffect, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css';
import { config } from '../config/config';
import axios from 'axios';

function Map({ listing }) {
    const mapContainerRef = useRef();
    const mapRef = useRef();
    const region = `${listing.location}, ${listing.country}`;
    const location = encodeURIComponent(region || '');
    const [coordinates, setCoordinates] = useState(null);


    useEffect(() => {
        const locationData = async () => {
            try {
                const response = await axios.get(`https://api.mapbox.com/search/geocode/v6/forward?q=${location}&access_token=${config.mapToken}`, {withCredentials: false});
                const [lng, lat] = response.data.features[0].geometry.coordinates;
                setCoordinates([lng, lat]);
            } catch (error) {
                console.error("Geocoding error :: ", error);
            }
        }
        locationData();
    }, [location])

    useEffect(() => {
        if (!coordinates) return;
        mapboxgl.accessToken = config.mapToken;

        mapRef.current = new mapboxgl.Map({
            container: mapContainerRef.current,
            center: coordinates, // starting position [lng, lat]
            zoom: 8 // starting zoom
        });

        new mapboxgl.Marker({ color: "red", offset: [0, -25] })
        .setLngLat(coordinates)
        .setPopup(new mapboxgl.Popup({offset: -10, anchor: "top"})
        .setHTML('<h1 style="font-size: 16px">Exact location provided after booking</h1>'))
        .addTo(mapRef.current);

        return () => (mapRef.current).remove();
    }, [coordinates]);

    return (
        <div className='w-9/10 md:w-3/5 mx-auto mt-4'>
            <h2 className='font-jakarta mb-2 font-semibold text-2xl'>Where you'll be</h2>
            <div
                ref={mapContainerRef}
                className="map-container md:h-80 h-64 w-full rounded-md"
            />

        </div>
    );
}

export default Map
