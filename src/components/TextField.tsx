import React, { useState, useContext } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Context } from '../context/Context';
import axios from 'axios';

const TextField = () => {
  const { setNote } = useContext(Context);
  const [value, setValue] = useState<string>('');

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSubmitNote = async () => {
    await axios.post('https://62fd27316e617f88dea5d017.mockapi.io/notes', { note: value });
    setNote(value);
  };

  return (
    <Form className="container-form">
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Введите заметку</Form.Label>
        <Form.Control
          className="input"
          value={value}
          onChange={(e) => handleChangeInput(e as any)}
          type="email"
          placeholder="Введите заметку"
        />
        <Form.Text className="text-muted">
          Добавьте заметку используя текстовое поле сверху
        </Form.Text>
        <Button onClick={() => handleSubmitNote()} className="submit-btn" variant="primary">
          Добавить заметку
        </Button>
      </Form.Group>
    </Form>
  );
};

export default TextField;
