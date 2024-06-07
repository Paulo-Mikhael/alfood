import { Box, Button, TextField, Typography, Container, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import IRestaurante from "../../../interfaces/IRestaurante";
import http from "../../../http";

const FormularioRestaurante = () => {
  const [nomeRestaurante, setNomeRestaurante] = useState('');

  const parametros = useParams();
  useEffect(() => {
    if (parametros.id) {
      http.get<IRestaurante>(`restaurantes/${parametros.id}/`)
        .then(resposta => setNomeRestaurante(resposta.data.nome))
        .catch(err => console.log(err));
    }
  }, [parametros]);
  const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();

    if (parametros.id) {
      http.put(`restaurantes/${parametros.id}/`, {
        nome: nomeRestaurante
      })
        .then(() => alert(`${nomeRestaurante} atualizado com sucesso`))
        .catch(error => console.log(error));
    } else {
      http.post('restaurantes/', {
        nome: nomeRestaurante
      })
        .then(() => alert(`${nomeRestaurante} cadastrado com sucesso`))
        .catch(error => console.log(error));
    }
  }

  return (
    <Box>
      <Container maxWidth="lg" sx={{ marginTop: 1 }}>
        <Paper sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexGrow: 1 }}>
            <Typography component="h1" variant="h6">
              Fomulário de Restaurantes
            </Typography>
            <Box component="form" sx={{ width: '100%' }} onSubmit={(evento: React.FormEvent<HTMLFormElement>) => { aoSubmeterForm(evento) }}>
              <TextField
                onChange={evento => setNomeRestaurante(evento.target.value)}
                value={nomeRestaurante}
                id="standard-basic"
                label="Nome do Restaurante"
                variant="standard"
                fullWidth
                required
              />
              <Button type="submit" variant="outlined" fullWidth sx={{ marginTop: 1 }}>Salvar</Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default FormularioRestaurante;