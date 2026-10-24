import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const title = (searchParams.get('title') || 'The best React calendar').slice(0, 90)
  const section = (searchParams.get('section') || 'calendarkit.io').slice(0, 40)
  const font = await readFile(join(process.cwd(), 'src/assets/fonts/Inter-SemiBold.ttf'))
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 72, background: '#fafafa', color: '#0a0a0a', fontFamily: 'Inter',
        backgroundImage: 'linear-gradient(#ececec 1px, transparent 1px), linear-gradient(90deg, #ececec 1px, transparent 1px)', backgroundSize: '100% 72px, 171px 100%' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 30 }}>
          <div style={{ width: 34, height: 34, borderRadius: 8, border: '3px solid #0a0a0a', display: 'flex' }} />CalendarKit Pro
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div style={{ fontSize: 22, color: '#059669' }}>{section}</div>
          <div style={{ fontSize: 68, letterSpacing: -2, lineHeight: 1.05, maxWidth: 1000 }}>{title}</div>
        </div>
        <div style={{ fontSize: 24, color: '#5f5f5f' }}>Free, MIT licensed · npm i calendarkit-pro</div>
      </div>
    ),
    { width: 1200, height: 630, fonts: [{ name: 'Inter', data: font, weight: 600 }] },
  )
}
