import AlertBanner from 'components/AlertBanner'
import CursorFollower from './CursorFollower'
import Contact from './Contact'

export default function BlogLayout({
  preview,
  loading,
  children,
}: {
  preview: boolean
  loading?: boolean
  children: React.ReactNode
}) {
  return (
    <>
      <div className="min-h-screen">
        <AlertBanner preview={preview} loading={loading} />
        <main>{children}</main>
        <CursorFollower />
        <Contact/>
      </div>
    </>
  )
}
