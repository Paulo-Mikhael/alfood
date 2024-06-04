import { Button, TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react";

const FormularioRestaurante = () => {
  const [nomeRestaurante, setNomeRestaurante] = useState('');

  const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();
    axios.post('http://localhost:8000/api/v2/restaurantes/', {
      nome: nomeRestaurante
    })
      .then(() => alert(`${nomeRestaurante} cadastrado com sucesso`))
      .catch(error => console.log(error));
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