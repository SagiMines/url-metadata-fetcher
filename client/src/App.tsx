import React, { useState } from 'react';
import UrlForm from './components/UrlForm';
import MetadataDisplay from './components/MetadataDisplay';
import { Metadata } from './interfaces';
import axios from 'axios';
import './styles/App.css';

const App: React.FC = () => {
  const [metadataList, setMetadataList] = useState<Metadata[]>([]);

  /**
   * @function fetchMetadata
   *
   * This function fetches the metadata from the server and updates the state.
   *
   * @param urls `string[]` - The array of the urls entered by the user.
   */
  const fetchMetadata = async (urls: string[]) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_DOMAIN}/fetch-metadata`,
        { urls }
      );
      setMetadataList(response.data);
    } catch (error: any) {
      setMetadataList([]);
    }
  };

  return (
    <div>
      <h1 className="main-title">URL Metadata Fetcher</h1>
      <UrlForm onSubmit={fetchMetadata} />
      <MetadataDisplay metadataList={metadataList} />
    </div>
  );
};

export default App;
