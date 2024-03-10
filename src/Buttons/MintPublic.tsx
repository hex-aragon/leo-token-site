import {
  Transaction,
  Transition,
  WalletAdapterNetwork,
} from "@demox-labs/aleo-wallet-adapter-base";
import { useWallet } from "@demox-labs/aleo-wallet-adapter-react";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";

export const MintPublic = () => {
  const { requestTransaction, publicKey } = useWallet();
  const [receiverAddress, setReceiverAddress] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);

  const handleMintPublic = async () => {
    const yo_mint_pub_transition = new Transition(
      "token_112233.aleo",
      "yo_mint_pub",
      [receiverAddress, amount.toString() + "u64"]
    );

    const yo_mint_pub_tx = new Transaction(
      publicKey!,
      WalletAdapterNetwork.Testnet,
      [yo_mint_pub_transition],
      // 1000000, // set your desired fee
      amount,
      false
    );

    console.log("yo_mint_pub_tx:", yo_mint_pub_tx);

    if (requestTransaction) {
      try {
        const res = await requestTransaction(yo_mint_pub_tx);
        setReceiverAddress("");
        setAmount(0);
        console.log("Transaction submitted:", res);
        // You might want to display a success toast message or take some action here
      } catch (error) {
        console.error("Error submitting transaction:", error);
        // You might want to display an error toast message or take some action here
      }
    }
  };

  return (
    <div>
      <h3>yo_mint_pub</h3>
      <div className="fst-italic">Mint a public token</div>
      <Form.Group>
        <Form.Label>Receiver Address:</Form.Label>
        <Form.Control
          type="text"
          placeholder="aleo public key"
          onChange={(e) => setReceiverAddress(e.target.value)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Token Amount:</Form.Label>
        <Form.Control
          type="number"
          placeholder="number"
          onChange={(e) => setAmount(Number(e.target.value))}
        />
        <Form.Label>Fee amount:</Form.Label>
        <Form.Control
          type="number"
          placeholder="number"
          onChange={(e) => setAmount(Number(e.target.value))}
        />
      </Form.Group>
      <Button onClick={handleMintPublic}>✨ Mint *Public* Token</Button>
    </div>
  );
};
