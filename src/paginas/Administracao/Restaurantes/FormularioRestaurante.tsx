import { Button, TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import IRestaurante from "../../../interfaces/IRestaurante";

const FormularioRestaurante = () => {
  const [nomeRestaurante, setNomeRestaurante] = useState('');

  const parametros = useParams();
  useEffect(() => {
    if (parametros.id){
      axios.get<IRestaurante>(`http://localhost:8000/api/v2/restaurantes/${parametros.id}/`)
        .then(resposta => setNomeRestaurante(resposta.data.nome))
        .catch(err => console.log(err));
    }
  }, [parametros]);
  const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();

    if (parametros.id){
      axios.put(`http://localhost:8000/api/v2/restaurantes/${parametros.id}/`, {
        nome: nomeRestaurante
      })
        .then(() => alert(`${nomeRestaurante} atualizado com sucesso`))
        .catch(error => console.log(error));
    }else{
      axios.post('http://localhost:8000/api/v2/restaurantes/', {
        nome: nomeRestaurante
      })
        .then(() => alert(`${nomeRestaurante} cadastrado com sucesso`))
        .catch(error => console.log(error));
    }
  }

  return (
    <form onSubmit={evento => { aoSubmeterForm(evento) }}>
      <TextField 
        onChange={evento => setNomeRestaurante(evento.target.value)}
        value={nomeRestaurante} 
        id="standard-basic" 
        label="Nome do Restaurante" 
        variant="standard"
      />
      <Button type="submit" variant="outlined">Salvar</Button>
    </form>
  );
}

export default FormularioRestaurante;