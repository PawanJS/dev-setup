import React from 'react';
import { graphql } from 'gatsby';

const Markdown = ({ data }) => {
  const { markdownRemark } = data;

  return (
    <>
      <h1>{markdownRemark.frontmatter.title}</h1>
      <h2>{markdownRemark.frontmatter.description}</h2>
      <div dangerouslySetInnerHTML={{ __html: markdownRemark.html }} />
    </>
  );
};

export const pageQuery = graphql`
  query ($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        description
        title
      }
    }
  }
`;
export default Markdown;
