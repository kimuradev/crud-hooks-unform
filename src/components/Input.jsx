import React, { Component } from 'react';
import styled, { css } from 'styled-components';

// import { validaAgencia } from 'common/api-requests';

import Circle from 'components/_animations/Circle';
import Image from 'components/Image';
import CheckIcon from 'assets/images/check.png';
import ErrorIcon from 'assets/images/error.png';

const Wrapper = styled.label`
  background-color: #fff;
  border: solid 2px ${props => (props.focus ? '#3366FF' : '#ccc')};
  border-radius: 6px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 80px;
  padding: 20px 24px;
  text-align: left;
  width: 100%;

  ${props =>
    props.isDisabled &&
    css`
      background: #ccc;
    `};

  ${props =>
    props.isValid &&
    css`
      border-color: #33bb66;
    `};

  ${props =>
    props.isValid === false &&
    css`
      border-color: #ff6666;
    `};

  > section {
    height: 40px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
`;

const Label = styled.span`
  color: #ccc;
  font-family: inherit;
  font-size: ${props => (props.float ? '12px' : '18px')};
  font-weight: 500;
  font-style: normal;
  font-stretch: normal;
  letter-spacing: normal;
  line-height: 1.5;
  position: relative;
  top: ${props => (props.float ? '-6px' : '7px')};

  ${props =>
    props.error &&
    css`
      color: #333;
    `};

  @media (max-width: 320px) {
    font-size: ${props => (props.float ? '12px' : '16px')};
  }
`;

const ErrorLabel = styled(Label)`
  font-size: 14px;
  color: #ff6666;
`;

const Field = styled('input')`
  background: transparent;
  font-family: inherit;
  font-size: 18px;
  font-weight: 500;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.33;
  letter-spacing: normal;
  color: #666;
  padding: 0;

  width: 100%;
  height: inherit;

  ::placeholder {
    color: #999;
  }

  &,
  :focus,
  :active,
  :hover {
    border: 0;
    outline: none;
    box-shadow: none;
  }
`;

const Container = styled.div`
  position: relative;
`;

export default class Input extends Component {
  state = {
    agencia: null,
    isValid: null,
    dirty: null,
    isLoading: false,
    floating: false,
    requestError: false
  };

  onChange = ({ target: { value } }) => {
    if (value.length === 0) {
      this.setState({
        agencia: null,
        isValid: null,
        dirty: null,
        requestError: false
      });
      return null;
    }

    if (this.state.dirty) {
      this.setState({ agencia: value, isValid: false });
      this.onChangeInterceptor(this.state.agencia, false);
    }

    if (value && value.length === 4) {
      this.setState({ agencia: value, isLoading: true, dirty: true }, () => {
        return this.validateAgencia();
      });
    }

    this.setState({ agencia: value });
  };

  validateAgencia = async () => {
    try {
      // const { codigoBanco } = this.props;
      const valido = true;

      // const { valido } = await validaAgencia({
      //   codigoBanco,
      //   agencia: this.state.agencia
      // });

      if (valido) {
        this.setState({ isLoading: false, isValid: true });
      } else {
        this.setState({ isLoading: false, isValid: false, requestError: true });
      }

      this.onChangeInterceptor(this.state.agencia, valido);
    } catch (error) {
      this.setState({ isLoading: false, isValid: false, requestError: true });
    }
  };

  onFocus = () => {
    this.setState({ floating: true });
  };

  onBlur = () => {
    const { agencia } = this.state;

    if (agencia === null || agencia.length === 0) {
      this.setState({ floating: false });
    }
  };

  onChangeInterceptor = (selectedValue, isValid) => {
    this.props.onChange({
      value: selectedValue,
      name: 'agencia',
      valid: isValid
    });
  };

  render() {
    const { value, ...otherProps } = this.props;
    const { isLoading, isValid, floating, requestError, agencia } = this.state;

    delete otherProps.onChange;
    delete otherProps.placeholder;

    return (
      <Container>
        <Wrapper isDisabled={isLoading} isValid={isValid}>
          <section>
            {isValid || isValid === null ? (
              <Label float={floating || (agencia && agencia.length >= 1)}>Agência</Label>
            ) : (
              <Label float={floating} error={!isValid}>
                Agência inválida
              </Label>
            )}
            <Field
              {...otherProps}
              onChange={this.onChange}
              onFocus={this.onFocus}
              onBlur={this.onBlur}
              id="pb-input-agencia"
              name="agencia"
              type="text"
              maxLength="4"
              autoComplete="off"
              getValue={this.onChange}
            />
          </section>
          {isLoading && (
            <div style={{ marginTop: 7 }}>
              <Circle tertiary />
            </div>
          )}
          {!isLoading && isValid && (
            <div>
              <Image src={CheckIcon} alt="Ícone de sucesso" />
            </div>
          )}
          {!isLoading && isValid === false && (
            <div>
              <Image src={ErrorIcon} alt="Ícone de erro" />
            </div>
          )}
        </Wrapper>
        {requestError && <ErrorLabel>A agência é inválida. Verifique o número informado e digite novamente</ErrorLabel>}
      </Container>
    );
  }
}
