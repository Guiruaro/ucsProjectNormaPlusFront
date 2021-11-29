import React, { useState, useMemo } from "react";
import api from '../../services/api';

import camera from '../../assets/camera.svg';

import './styles.css';

export default function New({ history }){
    const [name, setName] = useState('');
    const [cats, setCats] = useState('');
    const [price, setPrice] = useState('');
    const [thumbnail, setThumbnail] = useState(null);
    const [desc, setDesc] = useState('');

    const preview = useMemo(
        () => {
            return thumbnail ? URL.createObjectURL(thumbnail) : null;
        },[thumbnail]
    )

    async function handleSubmit(event) {
        event.preventDefault();

        const data = new FormData();
        const user_id = localStorage.getItem('user');

        data.append('thumbnail', thumbnail);
        data.append('name', name);
        data.append('cats', cats);
        data.append('price', price);
        data.append('desc', desc);

        await api.post('/spots', data, {
            headers: { user_id }
        } )

        history.push('/dashboard');
    }
    
    return (
        <form onSubmit={handleSubmit}>
            <label id="thumbnail" 
            style={{ backgroundImage: `url(${preview})`}}
            className={thumbnail ? 'has-thumbnail' : ''}
            >
                <input type="file" onChange={event => setThumbnail(event.target.files[0])}/>
                <img src={camera} alt="Select img" height="50%"/>
            </label>


            <label htmlFor="name">SALA/SPOT *</label>
            <input 
                id="name"
                placeholder="Um nome para sua sala"
                value={name}
                onChange={event => setName(event.target.value)}    
            />

            <label htmlFor="cats">CATEGORIA * <span>(separadas por vírgula)</span></label>
            <input 
                id="cats"
                placeholder="Quais categorias essa sala se enquadra?"
                value={cats}
                onChange={event => setCats(event.target.value)}    
            />

            <label htmlFor="price">VALOR DA DIÁRIA * <span>(em branco para GRATUITO)</span></label>
            <input 
                id="price"
                placeholder="Valor cobrado por dia"
                value={price}
                onChange={event => setPrice(event.target.value)}    
            />

            <label htmlFor="desc">DESCRIÇÃO * <span>(descrição das características da sala/spot)</span></label>
            <textarea  
                id="desc"
                placeholder="Descrição do lugar"
                value={desc}
                onChange={event => setDesc(event.target.value)}    
            />

            <button type="submit" className="btn">Cadastrar</button>

        </form>


    )
}