# Getting set up to work on Glide Data Grid

### Setting Up Codespaces

If you'd like to set up glide data grid locally and contribute, the easiest way to get up and running
is to use Codespaces if you have access to it. If you do not, simply cloning the repo and running `npm install` also works!

#### Steps

-   Click the green dropdown labeled code, there should be two tabs: local and codespaces.
-   Click on codespaces.
-   If this is your first time, then create a new codespace. It will open a new browser tab and build the docker container for it - there will be a button to open the environment in VSCode if you'd prefer to run it that way
-   You should see a screen that says `Setting up your codespace` As soon as that's done, you should see a VSCode like UI with files on the left.

Once codespaces is up and running make sure `jq` is installed and then:

```bash
npm run bootstrap && npm run storybook
```

## Forking the data grid?

Please consider submitting your work for review. We are a small project, but we are super enthused when anyone comes by to help us build the best damned data grid on the internet.

## Contributing new cells

If you wish to contribute new cells, please add them to the `cells` package. There are already other cells in that package which can be used as an example. If your cell editor requires additional third party dependencies please consider using a React.lazy to allow for code splitting.

## Any contributions you make will be under the MIT Software License

In short, when you submit code changes, your submissions are understood to be under the same MIT License that covers the project. Feel free to contact the maintainers if that's a concern.
