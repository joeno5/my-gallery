import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"

export default function GoogleSheet({data}) {
    const googleSheet = data.googleSpreadsheetData
    return (
        <Layout>
            <h1>{googleSheet.aa}</h1>
            <h2>{googleSheet.customerName}</h2>
            {/* <img src='{googleSheet.avatar}' /> */}
        </Layout>
    )
}

export const query = graphql`
  query($slug: String) {
    googleSpreadsheetData (aa: {eq: $slug}) {
        id
        aa
        customerName
        #avatar
    }
  }
`