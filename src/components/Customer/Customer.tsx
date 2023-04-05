import React, { useState, ChangeEvent, FormEvent } from 'react';
import bg_img from '../../assets/top_bg.jpg'
import { Link } from 'react-router-dom';
import './Customer.css';
import { fileURLToPath } from 'url';
import axios from 'axios';

interface FormValues {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  address: string;
  postCode: string;
  state: string;
  clothingTypes: string[];
  images: File[];
  description: string;
  budget?: number;
}

function Customer() {
  const [formValues, setFormValues] = useState<FormValues>({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    address: '',
    postCode: '',
    state: '',
    clothingTypes: [],
    images: [],
    description: '',
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    const currentClothingTypes = formValues.clothingTypes;
    let newClothingTypes: string[];
    if (checked) {
      newClothingTypes = [...currentClothingTypes, value];
    } else {
      newClothingTypes = currentClothingTypes.filter((type) => type !== value);
    }
    setFormValues({ ...formValues, clothingTypes: newClothingTypes });
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);
    if (files.length > 0) {
      setFormValues({ ...formValues, images: [...formValues.images, ...files] });
    }
  };
  

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const formData = new FormData();

      for (const [key, value] of Object.entries(formValues)) {
        if (key === 'images') {
          for (const file of value) {
            formData.append(key, file);
          }
        } else {
          formData.append(key, value);
        }
      }

      await axios.post('/api/customer', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
      });

      alert('Form submitted successfully!');
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div className="Customer">
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input name='firstName' type="text" value={formValues.firstName} onChange={handleInputChange} />
        </label>
        <label>
          Last Name:
          <input name='lastName' type="text" value={formValues.lastName} onChange={handleInputChange} />
        </label>
        <label>
          Phone Number:
          <input name='phoneNumber' type="tel" value={formValues.phoneNumber} onChange={handleInputChange} />
        </label>
        <label>
          Email:
          <input name='email' type="email" value={formValues.email} onChange={handleInputChange} />
        </label>
        <label>
          Local Address:
        <input name='address' type="text" value={formValues.address} onChange={handleInputChange} />
        </label>
        <label>
          Post-code:
          <input name='postCode' type="text" value={formValues.postCode} onChange={handleInputChange} />
        </label>
        <label>
          State:
          <select name="state" value={formValues.state} onChange={handleInputChange} required>
            <option value="">--Please choose an option--</option>
            <option value="NSW">NSW</option>
            <option value="VIC">VIC</option>
            <option value="WA">WA</option>
            <option value="SA">SA</option>
          </select>
        </label>
        <label>
          Types of Clothing:
          <input type="checkbox" name="clothingTypes" value="Shirt" onChange={handleCheckboxChange} />
          Shirt
          <input type="checkbox" name="clothingTypes" value="Pants" onChange={handleCheckboxChange} />
          Pants
          <input type="checkbox" name="clothingTypes" value="Shoes" onChange={handleCheckboxChange} />
          Shoes
        </label>
        <label>
          Images:
          <input type="file" name="images" multiple onChange={handleImageChange} />
        </label>
        <label>
          Description:
          <textarea name="description" value={formValues.description} onChange={handleInputChange} />
        </label>
        <label>
          Budget:
          <input type="number" name="budget" value={formValues.budget} onChange={handleInputChange} min="0" step="1.00"></input>
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Customer;
