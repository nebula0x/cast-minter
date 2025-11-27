# 🚀 Deployment Guide

## Deploy to Vercel & GitHub

### Step 1: Create GitHub Repository

1. Go to [GitHub](https://github.com/new)
2. Create a new repository named `farcaster-cast-minter`
3. **Don't** initialize with README (we already have one)
4. Click "Create repository"

### Step 2: Push to GitHub

Run these commands in your terminal (update with your GitHub username):

```bash
# Add your GitHub repository as remote
git remote add origin https://github.com/YOUR_USERNAME/farcaster-cast-minter.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 3: Deploy to Vercel

#### Option A: Via Vercel Dashboard (Recommended)

1. Go to [Vercel](https://vercel.com)
2. Click "Add New Project"
3. Import your GitHub repository `farcaster-cast-minter`
4. Configure environment variables:
   - `NEXT_PUBLIC_NEYNAR_API_KEY`: Your Neynar API key
   - `NEXT_PUBLIC_BASE_RPC_URL`: `https://mainnet.base.org`
5. Click "Deploy"

#### Option B: Via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Follow the prompts and add environment variables when asked
```

### Step 4: Configure Environment Variables in Vercel

After deployment:

1. Go to your project settings in Vercel
2. Navigate to "Environment Variables"
3. Add:
   - `NEXT_PUBLIC_NEYNAR_API_KEY` = your Neynar key
   - `NEXT_PUBLIC_BASE_RPC_URL` = `https://mainnet.base.org`
4. Redeploy to apply changes

### Step 5: Share on Farcaster

Once deployed, you'll get a URL like: `https://farcaster-cast-minter.vercel.app`

**Create a Farcaster Frame:**

1. Create a cast on Farcaster/Warpcast
2. Add your Vercel URL as an embed
3. The preview should show your app's metadata
4. Users can click and use the app directly

#### For a Full Farcaster Frame Experience:

To make it a true Farcaster Frame (interactive in-feed):

1. Add Frame metadata to `app/page.tsx` or `app/layout.tsx`
2. Use the Farcaster Frame spec: [Farcaster Frames Docs](https://docs.farcaster.xyz/reference/frames/spec)
3. Test with [Warpcast Frame Validator](https://warpcast.com/~/developers/frames)

### Quick Commands Reference

```bash
# Initialize git (already done)
git init
git add .
git commit -m "Initial commit"

# Push to GitHub (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/farcaster-cast-minter.git
git branch -M main
git push -u origin main

# Deploy to Vercel
vercel
```

### Environment Variables Needed

```env
NEXT_PUBLIC_NEYNAR_API_KEY=your_neynar_api_key_here
NEXT_PUBLIC_BASE_RPC_URL=https://mainnet.base.org
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
```

### Troubleshooting

**Build fails?**
- Check that all dependencies are in `package.json`
- Ensure environment variables are set

**Environment variables not working?**
- Make sure they start with `NEXT_PUBLIC_` for client-side access
- Redeploy after adding variables

**Can't push to GitHub?**
- Configure git credentials: `git config --global user.name "Your Name"`
- Set email: `git config --global user.email "your@email.com"`

### Next Steps

Once deployed:
1. ✅ Your app will be live at `https://your-project.vercel.app`
2. ✅ Share the link on Farcaster
3. ✅ Users can mint their casts as NFTs!

---

**Need help?** Check the [Vercel docs](https://vercel.com/docs) or [Next.js deployment guide](https://nextjs.org/docs/deployment)
