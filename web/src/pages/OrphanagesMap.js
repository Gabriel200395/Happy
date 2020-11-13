import React, { useEffect, useState } from 'react' 
import { Link } from 'react-router-dom'
import {FiPlus, FiArrowRight} from 'react-icons/fi' 
import {Map , TileLayer, Marker, Popup} from 'react-leaflet'
import  Mapa from '../images/mapa.svg'
import mapIcon from '../utils/mapIcon'
import '../styles/pages/orphanages-map.css'
import api from '../services/api'


export default function OrphanagesMap(){ 

    const [orphanages, setOrphanages ] = useState([]); 
    
     useEffect(() => {
      api.get('orphanages').then(response => {
        setOrphanages(response.data)
      });
     },[])


    return(
      <div id="page-map"> 
        <aside>
           <header>
                <img src={Mapa} alt="Happy" className="imagem"/>
                <h2>Escolhar um orfanato no mapa</h2>
                <p>Muitas crianças estão esperando a sua visita :)</p>
           </header>
           <footer>
               <strong>Distrito Federal </strong>
               <span> Brasilía </span>
           </footer>
        </aside>

         <Map 
          center={[-15.8813454,-48.1085689]}
          zoom={12}
          style={{width:'100%',height:'100%'}}
           
         >
         <TileLayer
          url={`https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
        /> 

        {
          orphanages.map(orphanage => (
            <Marker 
            key={orphanage.id}
            icon={mapIcon}
            position={[orphanage.latitude , orphanage.longitude]}
         >
           <Popup closeButton={false} minWidth={150} maxWidth={150} className="map-popup"> 
               {orphanage.name}
                <Link to={`/orphanages/${orphanage.id}`}>
                    <FiArrowRight size={15} color="#fff"/>
                </Link>
           </Popup>
         </Marker>

          ))
        }
         </Map> 
         <Link to="/orphanages/create" className="create-orphanage" >
             <FiPlus  size={23} color="#fff"/>
         </Link>
      </div>
    );
}