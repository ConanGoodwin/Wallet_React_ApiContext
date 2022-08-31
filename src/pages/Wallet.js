import React from 'react';
import Header from '../components/Header';
import Table from '../components/Table';
import WalletForm from '../components/WalletForm';

class Wallet extends React.Component {
  render() {
    return (
      <main style={ { backgroundColor: 'f6e500' } }>
        <Header />
        <WalletForm />
        <Table />
      </main>
    );
  }
}

export default Wallet;
