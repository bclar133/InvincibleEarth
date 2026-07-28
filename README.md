# Invincible Earth

**Invincible Earth** is a browser geography game where players find towns and cities by narrowing the world map step by step.

## Current Prototype

- Main menu with 3-10 places per game
- Easy, Medium, and Difficult target pools, with Medium limited to a curated recognisable set
- Classroom and Arcade visual styles, plus a Satellite theme with live imagery tiles
- Border-only graphical world map with no map labels
- Hover-highlighted hemisphere, continent, country, and narrowing-zone choices
- Zoom in, zoom out, and reset controls on every map stage
- Real country borders from the map data
- Correct country answers lead directly to four town/city spot options
- Wrong answers end the current turn and reveal the city
- Correct city location unlocks a 4-choice country flag bonus
- Round-end panels show short, more readable city facts about population, food, trade, sport, weather, or history
- Easy mode uses an expanded curated pool of highly recognisable capitals, major cities, and selected Pacific/African towns
- Medium mode adds more famous capitals, second cities, and major global centres without using the full obscure pool
- Bahrain, Hong Kong, and Singapore are excluded because the bundled border map does not provide reliable selectable country shapes for them
- Scoring: +1 hemisphere, +1 continent, +2 country, +5 town, +2 flag

## Files

- `index.html` - app markup
- `styles.css` - responsive visual design and themes
- `app.js` - game interaction logic
- `data/game-data.js` - generated town/city and country pool
- `data/countries-110m.json` - border map data
- `data/countries-110m.js` - script-wrapped border map data for direct `index.html` play
- `vendor/` - local browser libraries used by the static game

## Data Sources

City and country target data was generated from [`world-cities-json`](https://www.npmjs.com/package/world-cities-json), which is sourced from the [SimpleMaps World Cities Database](https://simplemaps.com/data/world-cities) and licensed [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).

Country metadata comes from [`world-countries`](https://www.npmjs.com/package/world-countries).

Map borders use [`world-atlas`](https://www.npmjs.com/package/world-atlas) country TopoJSON data.

Satellite mode loads Esri World Imagery tiles at runtime and displays attribution below the map.

Flag bonus images load from [FlagCDN](https://flagcdn.com/) at runtime.

## Run Locally

Open `index.html` directly in a browser for quick local play. The border data is also included as a script file so the game works from `file://`.

You can still run a simple local web server from this folder when you want a closer preview of how the site behaves when hosted.

The current preview URL used during development is:

`http://127.0.0.1:8173/`

## Next Upgrade

The main geographic upgrade is adding official state, province, or territory boundary data where available.
