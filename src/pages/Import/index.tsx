import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import fileSize from 'filesize';
import Header from '../../components/Header';
import FileList from '../../components/FileList';
import Upload from '../../components/Upload';

import { Container, Title, ImportFileContainer, Footer } from './styles';

import alert from '../../assets/alert.svg';
import api from '../../services/api';

interface FileProps {
  file: File;
  name: string;
  readableSize: string;
}

const Import: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<FileProps[]>([]);
  const history = useHistory();

  async function handleUpload(): Promise<void> {
    const data = new FormData();
    try {
      uploadedFiles.forEach(file => {
        data.append('file', file.file);
      });

      /* const teste = {
        title: 'teste',
        value: 5,
        type: 'outcome',
        category: 'ensino',
      };

      await api.post('/transactions', teste); */
      await api.post('/transactions/import', data);

      history.push('/');
    } catch (err) {
      console.log(err.response.error);
    }
  }

  function submitFile(files: File[]): void {
    const { name, size } = files[0];

    const newFile = {
      file: files[0],
      name,
      readableSize: fileSize(size),
    };

    setUploadedFiles([...uploadedFiles, newFile]);
  }

  return (
    <>
      <Header size="small" />
      <Container>
        <Title>Importar uma transação</Title>
        <ImportFileContainer>
          <Upload onUpload={submitFile} />
          {!!uploadedFiles.length && <FileList files={uploadedFiles} />}

          <Footer>
            <p>
              <img src={alert} alt="Alert" />
              Permitido apenas arquivos CSV
            </p>
            <button onClick={handleUpload} type="button">
              Enviar
            </button>
          </Footer>
        </ImportFileContainer>
      </Container>
    </>
  );
};

export default Import;
