> [!WARNING]
> This is a prototype created to get community feedback and is not currently actively maintained. In the meantime, please visit my blog.

# Find your fediverse community

A directory of well-maintained fediverse communities.

[Reach out](https://stefanbohacek.com/contact/) to get your community added, or, if you prefer:

1. Fork this project on GitHub.
2. Create a new file in the style of `COMMUNITY.SOCIAL.json` inside `_data/communities`. 
3. Using other community data files as an example, fill it with information about your community.
4. Open a pull request.

## Local development

```bash
npm install
npm start
```

Server information is fetched on build and refreshed once a day. To manually refresh data:

```bash
npm run refresh
```

## Attributions

This project uses the following libraries, frameworks, and other resources:

- the [11ty](https://www.11ty.dev/) static site generator
- the [Bootstrap](https://getbootstrap.com/) front-end library
- a color palette from [Happy Hues](https://www.happyhues.co/palettes/12)
