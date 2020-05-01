import styled from 'styled-components';
import { shade } from 'polished';

export const Title = styled.h1`
  margin-top: 40px;
  font-weight: 500;
  font-size: 36px;
  line-height: 54px;
  color: #363f5f;
  text-align: center;
`;

export const Form = styled.form`
  margin: 40px 250px;
  /*  background: red; */

  display: flex;
  justify-content: space-between;
  align-items: center;

  div {
    display: flex;
    flex-direction: column;
    align-items: center;

    &.type {
      select {
        padding: 1px 10px;
      }
    }
  }

  button {
    margin-top: 20px;
    background: #008000;
    color: #fff;
    border-radius: 5px;
    padding: 5px 20px;
    border: 0;
    transition: background-color 0.2s;

    &:hover {
      background: ${shade(0.2, '#006400')};
    }
  }
`;
