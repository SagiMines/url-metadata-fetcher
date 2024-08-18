import React, { useState } from 'react';
import { CiCircleRemove } from 'react-icons/ci';
import { UrlFormProps } from '../interfaces';
import './../styles/UrlForm.css';

const UrlForm: React.FC<UrlFormProps> = ({ onSubmit }) => {
  const [urls, setUrls] = useState<string[]>(['', '', '']); // minimum 3 URLs by default

  /**
   * @function handleChange
   *
   * This function handles the change of each input and
   * updates the state.
   *
   * @param index `number` - The index of the input in the state array.
   * @param value `string` - The new input value.
   */
  const handleChange = (index: number, value: string) => {
    const updatedUrls = [...urls];
    updatedUrls[index] = value;
    setUrls(updatedUrls);
  };

  /**
   * @function addUrl
   *
   * This function adds a new URL input field to the browser and
   * updates the state.
   *
   */
  const addUrl = () => {
    const tempUrls = [...urls];
    tempUrls.push('');
    setUrls([...tempUrls]);
  };

  /**
   * @function removeUrl
   *
   * This function removes an input field from the browser (only if there are more
   * than 3 input fields), and updates the state.
   *
   */
  const removeUrl = (index: number) => {
    let tempUrls = [...urls];
    tempUrls = tempUrls.filter((_url, ind) => index !== ind);
    setUrls([...tempUrls]);
  };

  /**
   * @function handleSubmit
   *
   * This function handles the submition of the form.
   *
   * @param e `React.FormEvent` - The event object of the form.
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (urls.some(url => url.trim() === '')) {
      alert('Please enter all URLs.');
      return;
    }
    onSubmit(urls);
  };

  /**
   * @function areInputsInvalid
   *
   * This function checks wether the inputs are invalid or not.
   *
   */
  const areInputsInvalid = () => {
    const foundNotValid = urls.find(url => !url);
    if (foundNotValid === '') {
      return true;
    }
    return false;
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>Enter URLs</h2>
      {urls.map((url, index) => (
        <div
          className={index > 2 ? 'form-input m-l-21 gap-5' : 'form-input'}
          key={index}
        >
          <input
            type="text"
            placeholder={`Enter URL ${index + 1}`}
            value={url}
            onChange={e => handleChange(index, e.target.value)}
          />
          {index > 2 && (
            <div
              onClick={() => removeUrl(index)}
              className="remove-input-button"
            >
              <CiCircleRemove color="red" />
            </div>
          )}
        </div>
      ))}
      <div className="form-buttons">
        <button className="enabled" type="button" onClick={addUrl}>
          Add URL
        </button>
        <button
          type="submit"
          disabled={areInputsInvalid()}
          className={areInputsInvalid() ? 'disabled' : 'enabled'}
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default UrlForm;
