import { Header } from './features/header/components/header'
import { useSse } from './hooks/useSse'
import Page from './Page'

export default function App() {
  useSse()

  return (
    <>
      <Header />
      <main className="w-screen">
        <Page />
      </main>
    </>
  )
}
