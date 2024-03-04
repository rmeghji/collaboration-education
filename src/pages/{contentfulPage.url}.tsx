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
                raw: string,
                references: {
                    form: {
                      src: string
                    },
                    publicUrl: string
                    description: string
                }[]
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
          [INLINES.HYPERLINK]: (node, children: string) => <Link to={node.data.uri}>{children}</Link>,
          [BLOCKS.EMBEDDED_ENTRY]: (node, children: string) => <iframe src={contentfulPage.body.references[0].form.src} width={700} height={520}>Loading...</iframe>,
          // [BLOCKS.EMBEDDED_ASSET]: (node, children: string) => <img src={richText.content[2].data.target.fields.file["en-US"].url}></img>
          [BLOCKS.EMBEDDED_ASSET]: (node, children: string) => <><br/><img src={contentfulPage.body.references[0].publicUrl} height={400} style={{display: 'block', marginLeft: 'auto', marginRight: 'auto'}}></img>
              <figcaption><Typography align="center" display="block" marginLeft="auto" marginRight="auto" maxWidth={350}>{contentfulPage.body.references[0].description}</Typography></figcaption>
            </>
          // [BLOCKS.EMBEDDED_ASSET]: (node, children: string) => {
          //   let file = node.data.target.fields
          //   return <img src={file['en-US'].url}></img>
          // }
          //<iframe src={node.data.target.fields.form["en-US"].src} width={700} height={520}>{children}</iframe> 
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
            {/* <Grid item xs={12} justifyContent="center" maxWidth='75%' alignContent="center"> */}
                {/* <iframe src={contentfulPage.body.references[0].form.src} width={700} height={520}>Loading...</iframe> */}
            {/* </Grid> */}
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
        references{
          ... on ContentfulVolunteerForm{
            form{
              src
            }
          }
          ... on ContentfulAsset {
            publicUrl
            description
          }
        }
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