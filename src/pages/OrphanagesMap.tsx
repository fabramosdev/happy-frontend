import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { FiPlus, FiSun, FiMoon, FiArrowRight } from 'react-icons/fi'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'

import mapMarkerImg from '../images/map-marker.svg'
import '../styles/pages/orphanages-map.css'
import mapIcon from '../utils/mapIcons';
import api from '../services/api';

interface IOrphanage {
    id: number;
    latitude: number;
    longitude: number;
    name: string;
}

function OrphanagesMap() {

    const [darkMode, setDarkMode] = useState(false)
    const [orphanages, setOrphanages] = useState<IOrphanage[]>([])

    const toggle = () => {
        setDarkMode(!darkMode)
    }

    useEffect(() => {
        api.get('orphanages').then(response => {
            setOrphanages(response.data);
        })
    }, [])

    return (
        <div id="page-map">
            <aside className={`${darkMode ? 'dark-sidebar' : 'light'}`}>
                <header>
                    <img src={mapMarkerImg} alt="Happy" />

                    <h2>Escolha um orfanato no mapa</h2>
                    <p>Muitas crianças estão esperando a sua visita :)</p>
                </header>

                <footer>
                    <strong>Duque de Caxias</strong>
                    <span>Rio de Janeiro</span>
                </footer>
            </aside>

            <Map
                center={[-22.6521336, -43.281157]}
                zoom={15}
                style={{ width: '100%', height: '100%' }}
            >
                <TileLayer
                    url={`https://api.mapbox.com/styles/v1/mapbox/${darkMode ? 'dark' : 'light'}-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                />

                {orphanages.map(orphanage => {
                    return (
                        <Marker
                            icon={mapIcon}
                            position={[orphanage.latitude, orphanage.longitude]}
                            key={orphanage.id}
                        >
                            <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup" >
                                {orphanage.name}
                                <Link to={`/orphanages/${orphanage.id}`}>
                                    <FiArrowRight size={32} color="#fff" />
                                </Link>
                            </Popup>
                        </Marker>
                    )
                })}
                
            </Map>

            <div className="dark-mode" onClick={toggle}>
                {darkMode ? <FiSun size={32} color="#fff" /> : <FiMoon size={32} color="#fff" />}
            </div>

            <Link to="/orphanages/create" className="create-orphanage">
                <FiPlus color="#fff" size={32} />
            </Link>
        </div>
    )
}

export default OrphanagesMap;