import * as React from "react"
// import "../styles.css"
import { graphql } from "gatsby"
import NavBar from "./NavBar"

// taken from https://github.com/gatsbyjs/gatsby-starter-contentful-homepage-ts/blob/main/src/components/layout.tsx

interface LayoutProps {
  children?: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      {/* <Slice alias="header" /> */}
      <NavBar menuLinks={[{url:'butt', title:'button'}]}/>
      {children}
      {/* <Slice alias="footer" /> */}
    </>
  )
}

export const pageData = graphql`
query PageQuery($id: String) {
    contentfulPage(id: {eq: $id}) {
      url
      title
    }
  }
`;

export default Layout