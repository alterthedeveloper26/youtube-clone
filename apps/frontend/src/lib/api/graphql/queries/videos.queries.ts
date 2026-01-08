/**
 * GraphQL Queries for Videos
 * Using gql template literal for better syntax highlighting and validation
 */

import { gql } from "@apollo/client";

export const GET_VIDEOS_QUERY = gql`
  query GetVideos($input: GetVideosInput) {
    videos(input: $input) {
      edges {
        node {
          id
          channelId
          title
          description
          videoUrl
          videoKey
          hls720pUrl
          thumbnailUrl
          duration
          viewCount
          likeCount
          dislikeCount
          commentCount
          isPublished
          visibility
          processingStatus
          createdAt
          updatedAt
          deletedAt
        }
        cursor
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
`;
