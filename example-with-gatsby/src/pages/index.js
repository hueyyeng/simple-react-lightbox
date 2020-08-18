import React from 'react'
import Layout from '../components/layout'
import { Container, Row, Col } from 'react-bootstrap'
import { SRLWrapper } from 'simple-react-lightbox'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'

const IndexPage = ({ data }) => {
  return (
    <Layout>
      <SRLWrapper>
        <Container>
          <Row>
            {data.allFile.edges.map((e) => (
              <Col key={e.node.id} className="bootstrap_column" lg="4">
                <Img fluid={e.node.childImageSharp.fluid} />
              </Col>
            ))}
          </Row>
        </Container>
      </SRLWrapper>
    </Layout>
  )
}

export const query = graphql`
  query {
    allFile(
      filter: { relativeDirectory: { eq: "gallery" } }
      sort: { order: ASC, fields: name }
    ) {
      edges {
        node {
          name
          id
          relativePath
          childImageSharp {
            fluid {
              src
              srcSet
              base64
              aspectRatio
              originalImg
              sizes
            }
          }
        }
      }
    }
  }
`

export default IndexPage
