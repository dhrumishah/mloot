import React from 'react';
import { Box, Button } from '@chakra-ui/react';

const NavBar = ({ accounts, setAccounts }) => {
   const isConnected = Boolean(accounts[0]);

   async function connectAccount() {
       if(window.ethereum) {
           const accounts = await window.ethereum.request({
               method: "eth_requestAccounts",
           });
           setAccounts(accounts);
       }
   }

    return (
       <nav padding="30px">
             {isConnected ? (
                <Box margin="30px 15px" fontSize="30px">Connected</Box>
            ) : (
                <Button
                    backgroundColor="#D6517D"
                    borderRadius="5px"
                    boxShadow="0px 2px 2px 1px #0f0f0f"
                    color="#ffffff"
                    cursor="pointer"
                    fontFamily="inherit"
                    padding="15px"
                    margin="30px 15px"
                    onClick={connectAccount}
                >
                    Connect Wallet
                </Button>
            )}
       </nav>
    )
};

export default NavBar;
