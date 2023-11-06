# Install Packages
`yarn`

# Start Local Server
1. `yarn start`
2. Run "http://locahost:3000" in browser with Metamask installed. Switch to Goerli Test Network.

# Deploy PBM

1. Get Goerli ETH from faucet.
2. Deploy PBM from Deploy page.
3. Go to https://goerli.etherscan.io/address/0x85401183a7f5dd20ab354d18ac20f57da4c69208#readContract, and query `getAllPBMTokens()`, and check for the number of PBMs deployed so far. 
4. Go to src/hooks/useGetPBMToken.tsx, and update line 12 to getPBMToken(n), where n = number of PBMs deployed so far - 1.

# Create Token Type

1. Mint yourself some NUT token here https://goerli.etherscan.io/address/0x86378ffb1a704b9037a20a8066bec948deb1da04#writeContract. You can ignore this step if you used a different underlying token when deploying the PBM.
2. Create the token type in step 2 of the deploy page. Note only the account that deployed the PBM can run this step.
3. The number of tokens created also depends on your underlying balance. 

# Whitelist Address

1. Whitelist any address you want in step 3 of the deploy page. Note only the account that deployed the PBM can run this step.

# Mint Tokens

1. Mint PBMs to any address. Note only the account that deployed the PBM can run this step.
2. The maximum amount of tokens you can mint depends on the amount you created.

# View Tokens

1. Switch to the account that received the tokens and go to the My Tokens page, and view the tokens that you just minted.

# Purchase Items

1. Go to the Shop page, and purchase anything you can afford!
