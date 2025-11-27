import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Cast Minter';
export const size = {
    width: 1200,
    height: 630,
};

export const contentType = 'image/png';

export default async function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    background: 'linear-gradient(to bottom right, #0a0a0f, #1a1a2e)',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'sans-serif',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '20px',
                    }}
                >
                    <div
                        style={{
                            width: '80px',
                            height: '80px',
                            background: 'linear-gradient(to bottom right, #9333ea, #c026d3)',
                            borderRadius: '20px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: '20px',
                        }}
                    >
                        <svg
                            width="48"
                            height="48"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9-9 9-9-1.8-9-9 1.8-9 9-9z" />
                            <path d="M10 10l4 4m0-4l-4 4" />
                        </svg>
                    </div>
                    <h1
                        style={{
                            fontSize: '80px',
                            fontWeight: 'bold',
                            background: 'linear-gradient(to right, #ffffff, #a855f7)',
                            backgroundClip: 'text',
                            color: 'transparent',
                            margin: 0,
                        }}
                    >
                        Cast Minter
                    </h1>
                </div>
                <p
                    style={{
                        fontSize: '40px',
                        color: '#9ca3af',
                        margin: 0,
                        textAlign: 'center',
                        maxWidth: '800px',
                    }}
                >
                    Turn your memorable Farcaster moments into unique NFTs on Base
                </p>
            </div>
        ),
        {
            ...size,
        }
    );
}
