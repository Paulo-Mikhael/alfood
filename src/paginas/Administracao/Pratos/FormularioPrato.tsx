import { Box, Button, TextField, Typography, Container, Paper, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import http from "../../../http";
import ITag from "../../../interfaces/ITag";
import IRestaurante from "../../../interfaces/IRestaurante";

const FormularioPrato = () => {
  const [nomePrato, setNomePrato] = useState('');
  const [descricao, setDescricao] = useState('');
  const [tag, setTag] = useState('');
  const [tags, setTags] = useState<ITag[]>([]);
  const [restaurante, setRestaurante] = useState('');
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);
  const [imagem, setImagem] = useState<File | null>(null);

  useEffect(() => {
    http.get<{ tags: ITag[] }>('tags/')
      .then(resposta => {
        setTags(resposta.data.tags)
      })
      .catch(err => console.log(err));
    http.get<IRestaurante[]>('restaurantes/')
      .then(resposta => {
        setRestaurantes(resposta.data)
      })
      .catch(err => console.log(err));
  }, []);

  const selecionaArquivo = (evento: React.ChangeEvent<HTMLInputElement>) => {
    if (evento.target.files?.length){
      setImagem(evento.target.files[0]);
    }else{
      setImagem(null);
    }
  }
  const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
      evento.preventDefault();
      const formData = new FormData();

      formData.append('nome', nomePrato);
      formData.append('descricao', descricao);
      formData.append('tag', tag);
      formData.append('restaurante', restaurante);

      if (imagem){
        formData.append('imagem', imagem);
      }

      http.request({
        url: 'pratos/',
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        data: formData
      })
      .then(resposta => {
        alert('Prato cadastrado com sucesso')
        console.log(resposta);
      })
      .catch(err => console.log(err));
    }

  return (
    <Box>
      <Container maxWidth="lg" sx={{ marginTop: 1 }}>
        <Paper sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexGrow: 1 }}>
            <Typography component="h1" variant="h6">
              Fomulário de Pratos
            </Typography>
            <Box component="form" sx={{ width: '100%' }} onSubmit={(evento: React.FormEvent<HTMLFormElement>) => { aoSubmeterForm(evento) }}>
              <TextField
                sx={{ marginBottom: 1 }}
                onChange={evento => setNomePrato(evento.target.value)}
                value={nomePrato}
                id="standard-basic"
                label="Nome do Prato"
                variant="standard"
                fullWidth
                required
              />
              <TextField
                sx={{ marginBottom: 1 }}
                onChange={evento => setDescricao(evento.target.value)}
                value={descricao}
                id="standard-basic"
                label="Descrição do Prato"
                variant="standard"
                fullWidth
                required
              />
              <FormControl
                margin="dense"
                fullWidth
              >
                <InputLabel id="select-tag">
                  Tag
                </InputLabel>
                <Select labelId="select-tag" value={tag} onChange={evento => setTag(evento.target.value)} variant="outlined">
                  {tags.map(tag => (
                    <MenuItem key={tag.id} value={tag.value}>
                      {tag.value}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl
                margin="dense"
                fullWidth
              >
                <InputLabel id="select-restaurante">
                  Restaurante
                </InputLabel>
                <Select labelId="select-restaurante" value={restaurante} onChange={evento => setRestaurante(evento.target.value)} variant="outlined">
                  {restaurantes.map(restaurante => (
                    <MenuItem key={restaurante.id} value={restaurante.id}>
                      {restaurante.nome}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <input type="file" onChange={selecionaArquivo} />
              <Button type="submit" variant="outlined" fullWidth sx={{ marginTop: 1 }}>Salvar</Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default FormularioPrato;