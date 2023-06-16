import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout";

interface PageProps{
    data: {
        contentfulPage: {
            url: string
            title: string
            description: {
                description: string
            }
            image: {
                file: {
                    url: string
                }
            }
        }
    }
}

export const Page = (props: PageProps) => {
    const { contentfulPage } = props.data;

    return(
        <Layout>
            <img src={contentfulPage.image.file.url} style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }}></img>
            <h1 style={{

            }}>{contentfulPage.title}</h1>
            <p>{contentfulPage.description.description}</p>
        </Layout>
    )
}

export const data = graphql`
query PageQuery($id: String) {
    contentfulPage(id: {eq: $id}) {
      url
      title
      description {
        description
      }
      image {
        file {
            url
        }
      }
    }
  }
`;

export default Page;