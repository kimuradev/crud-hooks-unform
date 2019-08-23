import React from 'react';
import { useFormik } from 'formik';

const MyForm = () => {
  const { getFieldProps, handleSubmit, errors, touched } = useFormik({
    initialValues: {
      name: '',
      contact: {
        email: '',
        phone: ''
      }
    },
    validate: values => {
      const err = {
        name: '',
        contact: {
          email: ''
        }
      };
      const message = 'Campo obrigatório';
      if (!values.name) err.name = message;
      if (!values.contact.email) err.contact.email = message;

      return err;
    },
    onSubmit: (values, bag) => {
      console.log(values);
    }
  });

  const [name, metadataName] = getFieldProps('name', 'text');
  const [email, metadataEmail] = getFieldProps('contact.email', 'text');
  const [phone, metadataPhone] = getFieldProps('contact.phone', 'text');
  console.log({ errors, touched });
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome: </label>
          <input placeholder="Seu nome" {...name} />
          {metadataName.touch && metadataName.error && <span>{metadataName.error}</span>}
        </div>
        <div>
          <label>Email: </label>
          <input placeholder="Seu email" {...email} />
          {metadataEmail.touch && metadataEmail.error && <span>{metadataEmail.error}</span>}
        </div>
        <div>
          <label>Telefone: </label>
          <input placeholder="Seu telefone" {...phone} />
          {metadataPhone.touch && metadataPhone.error && <span>{metadataPhone.error}</span>}
        </div>
        <button type="submit">Enviar</button>
      </form>
      <pre>{JSON.stringify({ name, email, phone }, 2, 2)}</pre>
    </div>
  );
};

export default MyForm;
