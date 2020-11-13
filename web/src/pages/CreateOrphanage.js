import React, { useState } from "react";
import { Map, Marker, TileLayer } from 'react-leaflet';
import { FiPlus } from "react-icons/fi";
import { useHistory } from "react-router-dom";
import '../styles/pages/create-orphanage.css';
import Sidebar from "../Components/Sidebar";
import mapIcon from '../utils/mapIcon'
import api from '../services/api'

export default function CreateOrphanage() {
  const history = useHistory(); 
  const [position, setPosition] = useState({ latitude: 0, longitude: 0 })
  
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [instructions, setInstructions] = useState('');
  const [opening_hours, setOpening_Hours] = useState('');
  const [open_on_weekends, setOpenOnWeekends] = useState(true);
  const [images, setImages] = useState([]);
  const [previewImagens, setPreviewImagens] = useState([])


  async function handleSubmit(event) {
    
    event.preventDefault();
    
    const { latitude, longitude } = position;
    
    const  data = new FormData(); 

    data.append('name', name);
    data.append('about', about);
    data.append('latitude', latitude)
    data.append('longitude', longitude);
    data.append('instructions',  instructions);
    data.append('opening_hours',  opening_hours);
    data.append('open_on_weekends',  open_on_weekends);
    /*data.append('images',  images);*/

    images.forEach(image => {
      data.append('images',  image);
    });
     
    await api.post('orphanages', data); 
    alert('Cadastro com sucesso')


    console.log({
      latitude,
      longitude,
      about,
      name,
      instructions,
      opening_hours,
      open_on_weekends, 
      images
    }); 


    history.push('/app')

  }

  function handleMapClick(event) {
    const { lat, lng } = event.latlng
    setPosition({ latitude: lat, longitude: lng })
  }

  function handleSelectImagens(event) {
    if (!event.target.files) {
      return;
    }

    //trazer as imagens 
    const selectedImagens = Array.from(event.target.files);
    setImages(selectedImagens)

    //percorre imagens para o preview
    const selectedImagensPreview = selectedImagens.map(image => {
      return URL.createObjectURL(image)
    });

    setPreviewImagens(selectedImagensPreview)
  }



  return (
    <div id="page-create-orphanage">
      <Sidebar />
      <main>
        <form className="create-orphanage-form"
          onSubmit={handleSubmit}
        >
          <fieldset>
            <legend>Dados</legend>

            <Map
              center={[-27.2092052, -49.6401092]}
              style={{ width: '100%', height: 280 }}
              zoom={15}
              onClick={handleMapClick}
            >
              <TileLayer
                url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
              />
              {
                position.latitude !== 0 && (
                  <Marker interactive={false}
                    icon={mapIcon}
                    position={[position.latitude,
                    position.longitude]}
                  />
                )
              }
            </Map>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input id="name"
                value={name}
                onChange={(event) => setName(event.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea id="name" maxLength={300}
                value={about}
                onChange={(event) => setAbout(event.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="images-container">
                {previewImagens.map(image => {
                  return (
                    <img key={image} src={image} alt={name} />
                  )
                })
                }

                <label htmlFor="image[]" type="button" className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </label>
              </div>

              <input multiple onChange={handleSelectImagens} type="file" id="image[]" />

            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea id="instructions"
                value={instructions}
                onChange={(event) =>
                  setInstructions(event.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Nome</label>
              <input id="opening_hours" value={opening_hours}
                onChange={(event) => setOpening_Hours(event.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>
              <div className="button-select">
                <button type="button"
                  className={open_on_weekends ? 'active' : ''}
                  onClick={() => setOpenOnWeekends(true)}
                >Sim</button>
                <button type="button"
                  className={!open_on_weekends ? 'active' : ''}
                  onClick={() => setOpenOnWeekends(false)}
                >Não</button>
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
