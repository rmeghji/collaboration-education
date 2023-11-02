import React from "react";
import { Link, graphql } from "gatsby";
import Layout from "../components/Layout";
import { Box, Grid, Typography } from "@mui/material";
import NavBar from "../components/NavBar";
import { title } from "process";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
// import { renderRichText } from 'gatsby-source-contentful/rich-text'
// import { Text } from '@contentful/rich-text-types';


import { BLOCKS, INLINES, MARKS } from "@contentful/rich-text-types"
import { renderRichText } from "gatsby-source-contentful/rich-text"
import { getRichTextEntityLinks } from "@contentful/rich-text-links";


interface PageProps{
    data: {
        contentfulPage: {
            url: string
            title: string
            body: {
                raw: string
            }
            image: {
                file: {
                    url: string
                }
            }
        }
        allContentfulPage: {
            nodes: {
                url: string
                title: string
            }[]
        }
    }
}

// const document = await richTextFromMarkdown()

export const Page = (props: PageProps) => {
    const { contentfulPage } = props.data;
    const rawRichText = contentfulPage.body.raw;
    const { allContentfulPage } = props.data;

    const richText = JSON.parse(rawRichText);

    const options = {
        renderMark: {
            [MARKS.BOLD]: (text) => <Typography><b>{text}</b></Typography>,
        },
        renderNode: {
          [BLOCKS.PARAGRAPH]: (node, children: string) => <Typography><br/>{children}</Typography>,
          [BLOCKS.HEADING_1]: (node, children: string) => <Typography variant="h1"><br/>{children}</Typography>,
          [BLOCKS.HEADING_2]: (node, children: string) => <Typography variant="h2"><br/>{children}</Typography>,
          [BLOCKS.HEADING_3]: (node, children: string) => <Typography variant="h3"><br/>{children}</Typography>,
          [BLOCKS.HEADING_4]: (node, children: string) => <Typography variant="h4"><br/>{children}</Typography>,
          [INLINES.HYPERLINK]: (node, children: string) => <Link to={node.data.uri}>{children}</Link>
        }
      };

    return(
        <Grid
        container
        justifyContent="center"
        rowSpacing={3}
        style={{display: 'flex', backgroundColor: "#8e93b1"}}
        width='100%'
        padding='10px'
        margin='0px'
        // marginRight='10px'
        >
            <Grid item style={{backgroundColor: "#0091d5"}} width="100%">
                <img src={contentfulPage.image.file.url} style={{
                    display: "block",
                    alignItems: "center",
                    justifyContent: "center",
                    marginLeft: "auto",
                    marginRight: "auto",
                    marginBottom: "1%",
                    width: "50%"
                }}/>
            </Grid>
            {/* <Grid item xs="auto" style={{background: "#2a3891"}} display="inline-flex" height="80px"/> */}
            <Grid item xs justifyContent="center" style={{background: "#2a3891"}} height="80px">
                <NavBar menuLinks={allContentfulPage.nodes}/>
            </Grid>
            {/* <Grid item xs="auto" style={{background: "#2a3891"}} display="inline-flex" height="80px"/> */}
            <Grid item xs={12}>
                <Typography variant="h2" align="center"><b>{contentfulPage.title}</b></Typography>
            </Grid>
            <Grid item>
                {documentToReactComponents(richText, options)}
            </Grid>
        </Grid>
    )
}

export const data = graphql`
query PageQuery($id: String) {
    contentfulPage(id: {eq: $id}) {
      url
      title
      body{
        raw
      }
      image {
        file {
          url
        }
      }
    }
    allContentfulPage{
      nodes{
        url
        title
      }
    }
  }
`;

export default Page;