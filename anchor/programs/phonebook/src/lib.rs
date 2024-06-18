#![allow(clippy::result_large_err)]

use anchor_lang::prelude::*;

declare_id!("5XRwMzzgnQcHa3mi7p1gUdCVw8ed4LEnBVExMeFcq1wv");

#[program]
pub mod phonebook {
    use super::*;

    pub fn create_phone_book_entry(ctx: Context<CreatePhoneBookEntry>, content: String, user_name: String, user_number: String) -> Result<()> {
        let phone_book = &mut ctx.accounts.phone_book;
        let user = &mut ctx.accounts.user;

        phone_book.content = content;
        phone_book.user_name = user_name;
        phone_book.user_number = user_number;
        phone_book.user = ctx.accounts.user.key();

        Ok(())
    }


    pub fn update_phone_book_entry(
        ctx: Context<UpdatePhoneBookEntry>,
        content: String,
        user_name: String, 
        user_number: String
    ) -> Result<()> {
        msg!("PhoneBook Entry Updated");
        msg!("content: {}", content);
 
        let phone_book = &mut ctx.accounts.phone_book;
        phone_book.content = content;
 
        Ok(())
    }


    pub fn delete_phone_book_entry(_ctx: Context<DeleteEntry>, user_name: String) -> Result<()> {
        msg!("PhoneBook entry from {} deleted", user_name);
        Ok(())
    }
}

#[derive(Accounts)]
#[instruction(content: String, user_name: String, user_number: String)]
pub struct CreatePhoneBookEntry<'info> {
    #[account(
        init_if_needed,
        seeds = [user_name.as_bytes(), user.key().as_ref()],
        bump,
        payer = user,
        space =  8 + std::mem::size_of::<PhoneBookState>(),
    )]
    pub phone_book: Account<'info, PhoneBookState>,

    #[account(mut)]
    pub user: Signer<'info>,

    pub system_program: Program<'info, System>,
}



#[derive(Accounts)]
#[instruction(content: String, user_name: String)]
pub struct UpdatePhoneBookEntry<'info> {
    #[account(
        mut,
        seeds = [user_name.as_bytes(), user.key().as_ref()],
        bump,
        realloc = 8 + 32 + 1 + 4 + content.len() + 100 + 100,
        realloc::payer = user,
        realloc::zero = true,
    )]
    pub phone_book: Account<'info, PhoneBookState>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction(user_name: String)]
pub struct DeleteEntry<'info> {
    #[account(
        mut,
        seeds = [user_name.as_bytes(), user.key().as_ref()],
        bump,
        close = user,
    )]
    pub phone_book: Account<'info, PhoneBookState>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
#[derive(InitSpace)]
pub struct PhoneBookState {
    pub user: Pubkey,
    #[max_len(100)]
    pub user_name: String,
    #[max_len(100)]
    pub user_number: String,
    #[max_len(100)]
    pub content: String,
}
