import React from 'react';
import { withFormik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const schema = Yup.object().shape({
  name: Yup.string()
    .required('Informe o nome!')
    .min(5, 'O nome deve conter mais de 5 letras!')
    .max(100, 'O nome deve conter menos de 100 letras!')
    .notOneOf(['admin', 'administrador'], 'Esse nome não pode camarada!'),
  surname: Yup.string().required('Informe o sobrenome!'),
  email: Yup.string()
    .required('Informe o email!')
    .email('Informe um email válido!')
});

const enhanceWithFormik = withFormik({
  mapPropsToValues: () => ({ name: '', surname: '', email: '', password: '' }),
  handleSubmit: values => {
    console.log(values);
  },
  isInitialValid: false,
  validateOnChange: true,
  validateOnBlur: true,
  displayName: 'MyForm',
  validationSchema: schema
});

const MyForm = props => {
  return (
    <Form>
      <h1>Validação com Yup</h1>
      <div>
        <Field name="name" placeholder="Nome" /> <br />
        <ErrorMessage name="name" />
      </div>
      <div>
        <Field name="surname" placeholder="Sobrenome" />
        <br />
        <ErrorMessage name="surname" />
      </div>
      <div>
        <Field name="email" placeholder="Email" />
        <br />
        <ErrorMessage name="email" />
      </div>
      <button type="submit">Enviar</button>
    </Form>
  );
};

export default enhanceWithFormik(MyForm);
