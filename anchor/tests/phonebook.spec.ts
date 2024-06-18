import * as anchor from '@coral-xyz/anchor';
import { Program } from '@coral-xyz/anchor';
import { Keypair } from '@solana/web3.js';
//import { Phonebook } from '../target/types/counter';


import { Phonebook } from "../target/types/phonebook";
///import { assert } from "chai";
import { PublicKey,SystemProgram } from "@solana/web3.js";
import { getAccount } from "@solana/spl-token";

describe('counter', () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);
 // const payer = provider.wallet as anchor.Wallet;

  //const program = anchor.workspace.Counter as Program<Counter>;

 // const counterKeypair = Keypair.generate();


//  const provider = anchor.AnchorProvider.env();

   // anchor.setProvider(provider);

    const program = anchor.workspace.Phonebook as Program<Phonebook>;

    const user = provider.wallet;

    const userName = "shivam";
    const userMobile = "96600000000"
    const content = "we are aiming(dreaming)"




    it("can create a phonebookentry", async () => {

      const [PhonebookPda] = PublicKey.findProgramAddressSync(
        [Buffer.from(userName), user.publicKey.toBuffer()],
        program.programId,
      );

      const tx = await program.methods
      .createPhoneBookEntry(content, userName, userMobile)
      .accounts({
       phoneBook: PhonebookPda,
       user: user.publicKey,
       systemProgram: SystemProgram.programId
      })
      .rpc();

      console.log("tx: " ,tx)

      const pdaData = await program.account.phoneBookState.fetch(PhonebookPda);

      console.log("pdaData:", pdaData);

       // let newPhoneBook = await getAccount(co)
        // await program.rpc.createNote("Content of New Note", {
        //     accounts: {
        //         note: note.publicKey,
        //         user: provider.wallet.publicKey,
        //         systemProgram: anchor.web3.SystemProgram.programId,
        //     },
        //     signers: [note],
        // });

        // let newNote = await program.account.note.fetch(note.publicKey);

        // assert.strictEqual(newNote.content, "Content of New Note");
        // assert.strictEqual(
        //     newNote.user.toBase58(),
        //     provider.wallet.publicKey.toBase58()
        // );

    });

    // it("can update a phonebook content entry", async () => {

    //   const [PhonebookPda] = await PublicKey.findProgramAddress(
    //     [Buffer.from(userName), user.publicKey.toBuffer()],
    //     program.programId,
    //   );

    //   const content = "this is new content";

    //    const tx = await program.methods.updatePhoneBookEntry(content, userName, userMobile)
    //     .accounts({
    //        phoneBook: PhonebookPda,
    //        user: user.publicKey,
    //        systemProgram: SystemProgram.programId
    //     }).rpc();

    //     console.log("tx: " ,tx)

    //     let pdaData = await program.account.phoneBookState.fetch(PhonebookPda);

    //     console.log("pdaData:", pdaData);

    //     // let deletedNote = await program.account.note.fetchNullable(
    //     //     note.publicKey
    //     // );

    //   //  assert.ok(deletedNote == null);
    // });

    // it("can delete a phonebook entry by closing account", async () => {

    //   const [PhonebookPda] = await PublicKey.findProgramAddress(
    //         [Buffer.from(userName), user.publicKey.toBuffer()],
    //         program.programId,
    //       );


    //     const tx = await program.methods.deletePhoneBookEntry(userName)
    //     .accounts({
    //        phoneBook: PhonebookPda,
    //        user: user.publicKey,
    //        systemProgram: SystemProgram.programId
    //     }).rpc();

    //     console.log("tx: " ,tx);

    //     let pdaData = await program.account.phoneBookState.fetch(PhonebookPda);

    //   console.log("pdaData:", pdaData);
    // });
});
