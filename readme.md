# Create and push **javascript** repos easily to github
This project will initialize git repo, add and commit changes then finally create a repo on github and push all to there.
If you have a lot of personal projects that you are laziness to push to github simple follow the below steps and be happy :)

## Requirements:
 - [github cli](https://cli.github.com/)
 - [nodev18](https://nodejs.org/en/blog/release/v18.14.0)

## How to run
- Run `gh auth login` (you will have to get your [personal token on github](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token))
- Create a folder in your PC like "personal projects" and move all of your projects there
- Run `npm run start --path=../Documents/my-personal-projects` (the `path` argument will be the your current path until the your personal project folder path)
