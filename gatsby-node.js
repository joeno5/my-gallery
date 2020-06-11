const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

const getImageSharp = (nodes, name) => nodes.find(contentNode => (contentNode.internal.type === 'File' && contentNode.name === name));

exports.onCreateNode = ({ node, getNodes, actions }) => {
  const { createNodeField, createParentChildLink } = actions
  
  if (node.internal.type === `GoogleSpreadsheetData`) {
    console.log(`\n #### node: `, node)
    
    createNodeField({
      node,
      name: `slug`,
      value: `/googlesheets/${node.aa}`,
    })
//   }

//   if (node.internal.owner === 'gatsby-source-google-spreadsheet') {
    const avatar = (node.avatar !== null) ? node.avatar : 'avatar';
    const nodes = getNodes();
    let imageSharpNode = getImageSharp(nodes, avatar);
    if (imageSharpNode === undefined) {
      imageSharpNode = getImageSharp(nodes, 'avatar');
    }
    
    console.log(`\n #### imageSharpNode: `, imageSharpNode)
    if (!!imageSharpNode)
        createParentChildLink({ parent: node, child: imageSharpNode });
  }

}

exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions
    
    const result = await graphql(`
      query {
        allGoogleSpreadsheetData {
          edges {
            node {
              aa
            }
          }
        }
      }
    `)
    
    result.data.allGoogleSpreadsheetData.edges.forEach(({node}) => {
        console.log('\n##### aa: ', node.aa)
        createPage({
            path: `/googlesheets/${node.aa}`,
            component: path.resolve(`./src/templates/google-sheets.js`),
            context: {
                slug: node.aa,
            },
        })
    })
  }