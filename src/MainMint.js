import { useState } from "react";
import { ethers, BigNumber } from "ethers";
import { Box, Button, Flex, Input, Text } from "@chakra-ui/react";
import mLoot from "./MLoot.json";
import {toast} from "react-toastify"

const mLootNFTAddress = "0xBf8d6429B0B7e9398242493Fcc35248b8Add503a";

const MainMint = ({ accounts, setAccounts }) => {
  const [input, setInput] = useState(0);
  const [txnHash, setTxHash] = useState("");
  const isConnected = Boolean(accounts[0]);

  const handleChange = (e) => {
    setInput(e.target.value)
  }

  async function handleMint() {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        mLootNFTAddress,
        mLoot.abi,
        signer
      );
      try {
        const response = await contract.claim(BigNumber.from(parseInt(input)));
        await setTxHash(JSON.stringify(response.hash))
        toast.success("ab")
      } catch (err) {
        if (err.error.code === -32603) {
          // Toast.error("ab")
          alert("This tokenID has already been minted")
        }
      }
    }
  }

  return (
    <Flex justify="center" align="center" height="100vh" paddingBottom="150px">
      <Box width="520px">
        <div>
          <Text fontSize="48px" textShadow="0 5px #000000">
            MLOOT 
          </Text>
        </div>

        {isConnected ? (
          <div>
            <Flex justify="center" align="center">
              <Input
                fontFamily="inherit"
                width="150px"
                height="40px"
                textAlign="center"
                paddingLeft="19px"
                marginTop="10px"
                type="number"
                onChange={handleChange}
              />
              <Text marginLeft="12px" fontSize="18px">
                
                (8001 - 1316005)
                </Text>
            </Flex>

            <Button
              backgroundColor="#008fd4"
              borderRadius="5px"
              width="110px"
              height="40px"
              boxShadow="0px 2px 2px 1px #0F0F0F"
              color="white"
              cursor="pointer"
              fontFamily="inherit"
              padding="15px"
              margin="20"
              fontSize="25px"
              onClick={handleMint}
            >
              Mint
            </Button>
          </div>
        ) : (
          <Text
            marginTop="70px"
            fontSize="30px"
            letterSpacing="5.5%"
            fontFamily="VT323"
            textShadow="0 3px #000000"
            color="#008fd4"
          >
             wallet to mint and connect to Goerli
          </Text>
        )}

        <Text
            marginTop="70px"
            fontSize="20px"
            textShadow="0 3px #000000"
          >
            Last Transaction Hash: 
          </Text>
        
        <Text
          align="center"
            fontSize="18px"
            color="#008fd4"
          >
           {txnHash}
          </Text>
      </Box>
    </Flex>
  );
};

export default MainMint;
