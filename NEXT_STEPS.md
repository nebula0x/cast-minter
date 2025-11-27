# 🎉 Deployment Successful!

## 1. Vercel Deployment

Your app has been deployed to Vercel! 

**IMPORTANT:** The app will not work correctly yet because it needs your API keys.

### Action Required:
1. Go to your [Vercel Dashboard](https://vercel.com/dashboard)
2. Select the `cast-minter` project
3. Go to **Settings** > **Environment Variables**
4. Add the following variables:
   - Key: `NEXT_PUBLIC_NEYNAR_API_KEY`
   - Value: `your_neynar_api_key` (from neynar.com)
   
   - Key: `NEXT_PUBLIC_BASE_RPC_URL`
   - Value: `https://mainnet.base.org`

5. **Redeploy** the project (Go to Deployments > Click the 3 dots on latest > Redeploy) for changes to take effect.

## 2. GitHub Setup

To push your code to GitHub:

1. Create a new repository on GitHub named `cast-minter`
2. Run these commands in your terminal:

```bash
# Link to your GitHub repo (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/cast-minter.git

# Rename branch to main
git branch -M main

# Push your code
git push -u origin main
```

## 3. Farcaster Frame

Once your Vercel app is running with the API keys:

1. Copy your Vercel URL (e.g., `https://cast-minter-yourname.vercel.app`)
2. Paste it into a new Cast on Warpcast
3. It will appear as a Frame/Mini App!
