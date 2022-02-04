import * as React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import Header from '../sections/Header'
import Footer from '../sections/Footer'
import styled from '@emotion/styled'
import { Container } from '../sections/Container'
import NavBar from '../sections/NavBar'

const Content = styled.main`
min-height: calc(100vh - 150px);
`
export default function Post({ pageTitle, children }) {
    const data = useStaticQuery(graphql`
        query {
            site {
                siteMetadata {
                title
                }
            }
        }
        `)
    return (
        <div>
            <title>{pageTitle} | {data.site.siteMetadata.title}</title>
            <Header />
            <NavBar />
            <Content>
                <Container>
                    {children}
                </Container>
            </Content>
            <Footer />
        </div>
    )
}



