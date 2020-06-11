import React from "react"
import { Link, graphql } from "gatsby"
import { Checkbox, Typography } from "@material-ui/core"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles({
  myText: {
    fontStyle: "oblique",
    fontSize: "24px",
    color: "red",
    marginTop: 20,
  },
})

const IndexPage = ({ data }) => {
  const classes = useStyles()

  return (
    <Layout>
      <SEO title="Home" />
      <div>
        <h2>Google Sheets</h2>
        {data.allGoogleSpreadsheetData.edges.map(({ node }) => (
          <div key={node.aa}>
            <Link to={node.fields.slug}>{node.customerName}</Link>
          </div>
        ))}
      </div>
      <div>
        <Typography className={classes.myText} variant="h2" color="primary">
          Material UI
        </Typography>
        <Checkbox color="primary" checked />
      </div>
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  query {
    allGoogleSpreadsheetData {
      edges {
        node {
          aa
          customerName
          fields {
            slug
          }
        }
      }
    }
  }
`
