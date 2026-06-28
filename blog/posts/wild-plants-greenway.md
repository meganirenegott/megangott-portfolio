For the first few months, our campus map looked like a game board — buildings on grass, paths between them, everything tidy and geometric. Functional. Also lifeless. Real campuses aren't manicured grids. They're messy with vegetation. Things grow in the cracks.

So I turned the plant density up and taught the greenway flowers to bloom.

## Making plants visible

The fix was embarrassingly simple. Wild plants were already in the biome system — they had spawn rules, species data, and rendering code. But their density was so low and their icons so small that nobody noticed them.

![Before and after — the same campus area with plant density increased from 0.10 to 0.18 in urban zones and 0.20 to 0.30 in parks](images/wild-plants-density-comparison.png)

Three changes made the campus feel alive:

1. **Density increase**: Urban biome wild plant density went from 0.10 to 0.18. Park biome went from 0.20 to 0.30. More plants, everywhere.
2. **Grid tightening**: Plant spawn candidate spacing went from every 4 tiles (128px) to every 3 tiles (96px). That's ~78% more candidate positions per area.
3. **Size increase**: All plant icons scaled up 25%. Small enough to not obscure gameplay, large enough to actually register as plants rather than noise.

The result: walking across campus, you now pass through clusters of vegetation that vary by biome. The urban zones near buildings have sparse succulents and small flowers. The park zones have lush rings of ferns and wildflowers. The edges have tall grasses.

![The campus after the plant update — students walking through meadows between buildings, with biome-appropriate vegetation clusters](images/wild-plants-campus-overview.png)

## Greenway flowers that bloom

The greenway flower system adds seasonal color. Students can plant seeds in designated greenway zones — click a seed in your inventory, choose a zone, and the seed is consumed and planted.

But the rendering is where the craft lives. Each flower is drawn with a canvas fallback renderer that produces actual botanical shapes instead of colored dots:

![Greenway flower zone — canvas-drawn botanical sprites with five-petal flowers, overlapping bush circles, and rare plants with ambient glow rings](images/wild-plants-greenway-flowers.png)

- **Flowers**: A stem line, five petal ellipses arranged radially, and a yellow center dot.
- **Bushes**: Three overlapping circles (the rounded bush shape) with a small accent dot.

The color palettes rotate seasonally:
- **Spring**: Pinks, lavenders, soft whites
- **Summer**: Oranges, bright yellows, warm reds
- **Autumn**: Ambers, deep golds, burnt siennas
- **Winter**: Pale blues, silvers, white

Rare and epic plants get an ambient glow ring drawn behind them — a subtle radial gradient that makes them catch your eye. Fruiting plants get a sparkle animation.

## Why environmental responsiveness matters

The wild plants and greenway flowers don't do anything mechanically. You can't harvest them. They don't give XP. They don't unlock anything. They're environmental texture — the visual equivalent of birds chirping in the background.

But texture is what makes a digital space feel like a *place*. Before the plant density increase, students walked across flat green tiles between buildings. After, they walked through meadows. The functional difference is zero. The experiential difference is enormous.

A campus that grows things is a campus that's alive. And a student who plants a flower in the greenway — who sees it bloom and change with the seasons — has a tiny piece of ownership in the landscape itself.
