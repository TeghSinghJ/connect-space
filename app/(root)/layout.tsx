import React, { ReactNode } from 'react'
import VideoServerProvider from '../../providers/StreamClientProviders'

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main>
      <VideoServerProvider>
        {children}
      </VideoServerProvider>
      Footer
    </main>
  )
}

export default RootLayout
