import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

// Use nodejs runtime for better compatibility
// export const runtime = 'edge';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    const year = searchParams.get('year') || '2025';
    const type = searchParams.get('type') || 'APBN';
    const region = searchParams.get('region') || 'Indonesia';
    const amount = searchParams.get('amount') || '';

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f8fafc',
            fontSize: 32,
            fontWeight: 600,
          }}
        >
          <div style={{ marginBottom: 40 }}>
            <div
              style={{
                fontSize: 60,
                fontWeight: 800,
                background: 'linear-gradient(90deg, #1e40af 0%, #dc2626 100%)',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              Budget ForPublic.id
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              backgroundColor: 'white',
              padding: '40px 60px',
              borderRadius: '16px',
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
            }}
          >
            <div
              style={{
                fontSize: 48,
                fontWeight: 700,
                color: '#1e40af',
                marginBottom: 16,
              }}
            >
              {type} {year}
            </div>
            <div
              style={{
                fontSize: 32,
                color: '#64748b',
                marginBottom: 16,
              }}
            >
              {region}
            </div>
            {amount && (
              <div
                style={{
                  fontSize: 36,
                  fontWeight: 600,
                  color: '#dc2626',
                }}
              >
                {amount}
              </div>
            )}
          </div>
          <div
            style={{
              marginTop: 40,
              fontSize: 24,
              color: '#64748b',
            }}
          >
            Transparansi Anggaran Indonesia
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}