import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { FiPlus, FiSun, FiMoon } from 'react-icons/fi'
import { Map, TileLayer } from 'react-leaflet'


import 'leaflet/dist/leaflet.css'

import mapMarkerImg from '../images/map-marker.svg'
import '../styles/pages/orphanages-map.css'

function OrphanagesMap() {

    const [darkMode, setDarkMode] = useState(false)

    const toggle = () => {
        setDarkMode(!darkMode)
    }

    return (
        <div id="page-map">
            <aside className={`${darkMode ? 'dark-sidebar' : 'light'}`}>
                <header>
                    <img src={mapMarkerImg} alt="Happy"/>

                    <h2>Escolha um orfanato no mapa</h2>
                    <p>Muitas crianças estão esperando a sua visita :)</p>
                </header>

                <footer>
                    <strong>Duque de Caxias</strong>
                    <span>Rio de Janeiro</span>
                </footer>
            </aside>

            <Map
                center={[-22.6521336,-43.281157]}
                zoom={15}
                style={{ width: '100%', height: '100%' }}
            >
                {/* {<TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />} */}
                <TileLayer 
                    url={`https://api.mapbox.com/styles/v1/mapbox/${darkMode ? 'dark':'light'}-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                />
            </Map>
            
            {/** DARK MODE MAP */}    
            <div className="dark-mode" onClick={toggle}>
                {darkMode ? <FiSun size={32} color="#fff" /> : <FiMoon size={32} color="#fff" />}
            </div>

            <Link to="" className="create-orphanage">
                <FiPlus color="#fff" size={32} />
            </Link>
        </div>
    )
}

export default OrphanagesMap;