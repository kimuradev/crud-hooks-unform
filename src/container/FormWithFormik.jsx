import React, { Component } from 'react';
import { Form, Field, withFormik } from 'formik';
import { Input, Button, Dropdown } from 'semantic-ui-react';

class MyForm extends Component {
  render() {
    const { values } = this.props;
    return (
      <Form>
        <Field name="nome" component={FInput} />
        <Field name="email">
          {({ field }) => (
            <div>
              <label>Email</label> <br />
              <Input {...field} />
            </div>
          )}
        </Field>
        <Field
          name="senha"
          render={({ field }) => (
            <div>
              <label>Senha</label> <br />
              <Input {...field} />
            </div>
          )}
        />
        <Field name="superHeroi" component={FDropdown} options={options} selection />
        <br />
        <Button type="submit" content="Save" />
        <br />
        {JSON.stringify(values)}
      </Form>
    );
  }
}

const FInput = ({ field, ...props }) => (
  <>
    <label>Nome</label> <br />
    <Input {...field} {...props} />
  </>
);

const FDropdown = ({ field, form: { setFieldValue }, ...props }) => (
  <>
    <label>Super Herói</label> <br />
    <Dropdown {...field} {...props} onChange={(e, { name, value }) => setFieldValue([name], value)} />
  </>
);

const options = [
  { text: 'Batman', value: 'batman' },
  { text: 'Lanterna Verde', value: 'lanterna_verde' },
  { text: 'Sinestro', value: 'sinestro' }
];

export default withFormik({
  mapPropsToValues: () => ({ nome: '', email: '', senha: '', superHeroi: '' }),
  handleSubmit: values => {
    console.log(values);
  }
})(MyForm);
