import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { IoIosCash } from 'react-icons/io';
import { Container } from './styles';

const Menu: React.FC = () => {
  return (
    <Container>
      <div>
        <IoIosCash />
        <Link to="/">MyBets</Link>
      </div>
    </Container>
  );
};

export default Menu;
