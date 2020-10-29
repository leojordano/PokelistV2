import React from 'react';
import styled from 'styled-components'

interface HeaderInterface {
    name: String;
}

const HeaderStyled = styled.div`
    width: 100%;
    height: 100px;
    background-color: red;
    opacity: 0.5;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const Header: React.FC<HeaderInterface> = (props) => {
  return (
      <HeaderStyled>
          { props.name }
      </HeaderStyled>
  );
}

export default Header;