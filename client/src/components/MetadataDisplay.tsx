import React from 'react';
import { MetadataDisplayProps } from '../interfaces';
import './../styles/MetadataDisplay.css';

const MetadataDisplay: React.FC<MetadataDisplayProps> = ({
  metadataList,
  error,
}) => {
  return (
    <div>
      {metadataList.map((metadata, index) => (
        <div key={index} className="metadata">
          {metadata.title && <h3>{metadata.title}</h3>}
          {metadata.description && <p>{metadata.description}</p>}
          {metadata.image && (
            <img src={metadata.image} alt={metadata.title} width="300" />
          )}
          {metadata.error && (
            <p className="error" style={{ color: 'red' }}>
              {metadata.error}
            </p>
          )}
        </div>
      ))}
      {error && (
        <div className="metadata">
          <p className="error" style={{ color: 'red' }}>
            {error}
          </p>
        </div>
      )}
    </div>
  );
};

export default MetadataDisplay;
