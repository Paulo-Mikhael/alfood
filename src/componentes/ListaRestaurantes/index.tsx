import { useEffect, useState } from 'react';
import IRestaurante from '../../interfaces/IRestaurante';
import style from './ListaRestaurantes.module.scss';
import Restaurante from './Restaurante';
import axios from 'axios';
import { Button, TextField } from '@mui/material';

const ListaRestaurantes = () => {

  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);
  const [restaurantesAmostra, setRestaurantesAmostra] = useState<IRestaurante[]>([]);
  const qtdPraMostrarInicial = 3;
  const [qtdParaMostrar, setQtdParaMostrar] = useState<number>(qtdPraMostrarInicial);
  const [filtrando, setFiltrando] = useState<boolean>(false);

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
      for (let i = qtdParaMostrar - qtdPraMostrarInicial; i < qtdParaMostrar; i++){
        restaurantes[i] && dezRestaurantes.push(restaurantes[i]);
      }

      qtdParaMostrar == qtdPraMostrarInicial ? setRestaurantesAmostra(dezRestaurantes) : setRestaurantesAmostra([...restaurantesAmostra, ...dezRestaurantes]);
      console.log(restaurantesAmostra);
      setQtdParaMostrar(qtdParaMostrar + qtdPraMostrarInicial);
    }else{
      setRestaurantesAmostra(restaurantes);
    }
  }
  const pesquisaRestaurante = (pesquisa: string) => {
    setFiltrando(true);

    const filter = restaurantes.filter(restaurante => restaurante.nome.includes(pesquisa));

    setRestaurantesAmostra(filter);
  }

  return (<section className={style.ListaRestaurantes}>
    <h1>Os restaurantes mais <em>bacanas</em>!</h1>
    <div className={style.PesquisaContainer}>
      <TextField 
        fullWidth 
        id="outlined-basic" 
        label="Pesquise um restaurante!" 
        variant="outlined" 
        onChange={(evt) => pesquisaRestaurante(evt.target.value)}
      />
    </div>
    {restaurantesAmostra.map(item => <Restaurante restaurante={item} key={item.id} />)}
    {restaurantesAmostra.length != restaurantes.length && restaurantesAmostra.length > 0 && filtrando === false &&
    <Button variant="outlined" onClick={mostraDezRestaurantes}>
      Ver mais
    </Button>}
  </section>)
}

export default ListaRestaurantes