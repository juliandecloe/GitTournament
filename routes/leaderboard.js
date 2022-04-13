const express = require('express')
const { graphql } = require('@octokit/graphql')
const graphqlAuth = graphql.defaults({
  headers: { authorization: 'token ' + process.env.GITHUB_PERSONAL_ACCESS_TOKEN },
})

module.exports = express
  .Router()

  .get('/', function (req, res) {
    // Get the repository information from my GitHub account
    graphqlAuth(
        `
        {
          viewer {
            login
          }
          user(login: "basv1996") {
            avatarUrl
            bio
            projects(first: 10) {
              nodes {
                name
              }
            }
          }
          repository(name: "browser-technologies-2122", owner: "cmda-minor-web") {
            forks(first: 10, privacy: PUBLIC) {
              totalCount
              edges {
                node {
                  defaultBranchRef {
                    target {
                      ... on Commit {
                        id
                        history {
                          totalCount
                        }
                      }
                    }
                  }
                }
              }
              nodes {
                forkCount
                url
                name
                owner {
                  avatarUrl(size: 10)
                }
                commitComments(first: 10) {
                  totalCount
                  nodes {
                    commit {
                      message
                    }
                  }
                }
              }
            }
          }
        }
        `

    
    ).then((data) => {
      res.render('leaderboard', {
        //projects: data.user.repositories.edges,
        userData: data.user,
        projects: data.user.projects,
        repositories: data.repository.forks,
        deafaultBranch: data.repositories.forks.totalCount.edges.node.deafaultBranch.target
      })
    })
  })
;