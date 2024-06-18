/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/phonebook.json`.
 */
export type Phonebook = {
  "address": "5XRwMzzgnQcHa3mi7p1gUdCVw8ed4LEnBVExMeFcq1wv",
  "metadata": {
    "name": "phonebook",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "createPhoneBookEntry",
      "discriminator": [
        237,
        112,
        33,
        130,
        174,
        178,
        60,
        255
      ],
      "accounts": [
        {
          "name": "phoneBook",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "arg",
                "path": "userName"
              },
              {
                "kind": "account",
                "path": "user"
              }
            ]
          }
        },
        {
          "name": "user",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "content",
          "type": "string"
        },
        {
          "name": "userName",
          "type": "string"
        },
        {
          "name": "userNumber",
          "type": "string"
        }
      ]
    },
    {
      "name": "deletePhoneBookEntry",
      "discriminator": [
        153,
        157,
        62,
        47,
        24,
        78,
        98,
        0
      ],
      "accounts": [
        {
          "name": "phoneBook",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "arg",
                "path": "userName"
              },
              {
                "kind": "account",
                "path": "user"
              }
            ]
          }
        },
        {
          "name": "user",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "userName",
          "type": "string"
        }
      ]
    },
    {
      "name": "updatePhoneBookEntry",
      "discriminator": [
        101,
        84,
        14,
        112,
        80,
        55,
        24,
        28
      ],
      "accounts": [
        {
          "name": "phoneBook",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "arg",
                "path": "userName"
              },
              {
                "kind": "account",
                "path": "user"
              }
            ]
          }
        },
        {
          "name": "user",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "content",
          "type": "string"
        },
        {
          "name": "userName",
          "type": "string"
        },
        {
          "name": "userNumber",
          "type": "string"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "phoneBookState",
      "discriminator": [
        241,
        112,
        185,
        203,
        241,
        129,
        181,
        224
      ]
    }
  ],
  "types": [
    {
      "name": "phoneBookState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "user",
            "type": "pubkey"
          },
          {
            "name": "userName",
            "type": "string"
          },
          {
            "name": "userNumber",
            "type": "string"
          },
          {
            "name": "content",
            "type": "string"
          }
        ]
      }
    }
  ]
};


export const IDL = 
  {
    "address": "5XRwMzzgnQcHa3mi7p1gUdCVw8ed4LEnBVExMeFcq1wv",
    "metadata": {
      "name": "phonebook",
      "version": "0.1.0",
      "spec": "0.1.0",
      "description": "Created with Anchor"
    },
    "instructions": [
      {
        "name": "create_phone_book_entry",
        "discriminator": [
          237,
          112,
          33,
          130,
          174,
          178,
          60,
          255
        ],
        "accounts": [
          {
            "name": "phone_book",
            "writable": true,
            "pda": {
              "seeds": [
                {
                  "kind": "arg",
                  "path": "user_name"
                },
                {
                  "kind": "account",
                  "path": "user"
                }
              ]
            }
          },
          {
            "name": "user",
            "writable": true,
            "signer": true
          },
          {
            "name": "system_program",
            "address": "11111111111111111111111111111111"
          }
        ],
        "args": [
          {
            "name": "content",
            "type": "string"
          },
          {
            "name": "user_name",
            "type": "string"
          },
          {
            "name": "user_number",
            "type": "string"
          }
        ]
      },
      {
        "name": "delete_phone_book_entry",
        "discriminator": [
          153,
          157,
          62,
          47,
          24,
          78,
          98,
          0
        ],
        "accounts": [
          {
            "name": "phone_book",
            "writable": true,
            "pda": {
              "seeds": [
                {
                  "kind": "arg",
                  "path": "user_name"
                },
                {
                  "kind": "account",
                  "path": "user"
                }
              ]
            }
          },
          {
            "name": "user",
            "writable": true,
            "signer": true
          },
          {
            "name": "system_program",
            "address": "11111111111111111111111111111111"
          }
        ],
        "args": [
          {
            "name": "user_name",
            "type": "string"
          }
        ]
      },
      {
        "name": "update_phone_book_entry",
        "discriminator": [
          101,
          84,
          14,
          112,
          80,
          55,
          24,
          28
        ],
        "accounts": [
          {
            "name": "phone_book",
            "writable": true,
            "pda": {
              "seeds": [
                {
                  "kind": "arg",
                  "path": "user_name"
                },
                {
                  "kind": "account",
                  "path": "user"
                }
              ]
            }
          },
          {
            "name": "user",
            "writable": true,
            "signer": true
          },
          {
            "name": "system_program",
            "address": "11111111111111111111111111111111"
          }
        ],
        "args": [
          {
            "name": "content",
            "type": "string"
          },
          {
            "name": "user_name",
            "type": "string"
          },
          {
            "name": "user_number",
            "type": "string"
          }
        ]
      }
    ],
    "accounts": [
      {
        "name": "PhoneBookState",
        "discriminator": [
          241,
          112,
          185,
          203,
          241,
          129,
          181,
          224
        ]
      }
    ],
    "types": [
      {
        "name": "PhoneBookState",
        "type": {
          "kind": "struct",
          "fields": [
            {
              "name": "user",
              "type": "pubkey"
            },
            {
              "name": "user_name",
              "type": "string"
            },
            {
              "name": "user_number",
              "type": "string"
            },
            {
              "name": "content",
              "type": "string"
            }
          ]
        }
      }
    ]
  
}