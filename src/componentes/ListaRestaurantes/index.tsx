import { useEffect, useState } from 'react';
import IRestaurante from '../../interfaces/IRestaurante';
import style from './ListaRestaurantes.module.scss';
import Restaurante from './Restaurante';
import axios from 'axios';
import { IPaginacao } from '../../interfaces/IPaginacao';
import { Button } from '@mui/material';

const ListaRestaurantes = () => {

  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);
  const [restaurantesAmostra, setRestaurantesAmostra] = useState<IRestaurante[]>([]);
  const [qtdParaMostrar, setQtdParaMostrar] = useState<number>(10);

  useEffect(() => {
    axios.get<IRestaurante[]>('http://localhost:8000/api/v2/restaurantes/')
      .then(resposta => {
        setRestaurantes(resposta.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [])
  useEffect(() => {
    mostraDezRestaurantes();
  }, [restaurantes]);
  const mostraDezRestaurantes = () => {
    if (restaurantes.length > qtdParaMostrar){
      const dezRestaurantes = [];
      for (let i = qtdParaMostrar - 10; i < qtdParaMostrar; i++){
        restaurantes[i] && dezRestaurantes.push(restaurantes[i]);
      }

      qtdParaMostrar == 10 ? setRestaurantesAmostra(dezRestaurantes) : setRestaurantesAmostra([...restaurantesAmostra, ...dezRestaurantes]);
      console.log(restaurantesAmostra);
      setQtdParaMostrar(qtdParaMostrar + 10);
    }else{
      setRestaurantesAmostra(restaurantes);
    }
  }

  return (<section className={style.ListaRestaurantes}>
    <h1>Os restaurantes mais <em>bacanas</em>!</h1>
    {restaurantesAmostra.map(item => <Restaurante restaurante={item} key={item.id} />)}
    {restaurantesAmostra.length != restaurantes.length && restaurantesAmostra.length > 0 && 
    <Button variant="outlined" onClick={mostraDezRestaurantes}>
      Ver mais
    </Button>}
  </section>)
}

export default ListaRestaurantes