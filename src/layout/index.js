import React from 'react'
import Header from '../components/Header'


const withLayout = PageComponent => props => {
  return (
    <>
      <Header />
      <PageComponent {...props} />
    </>
  );
};

export default withLayout;