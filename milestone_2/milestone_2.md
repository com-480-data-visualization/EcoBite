# Milestone 2

## 1. Project goals

The primary goal of this project is to create an interactive data visualization platform centered around the "Banana Index" concept. This visualization will help users understand the environmental impact and resource requirements of food production, with a particular focus on bananas as a reference point. 

### 1.1. Main goals

The platform aims to educate users about:

- The resources required to produce various foods (water, land, human labor)
- Comparative emissions and environmental impact between different food types
- Global production patterns and geographical distribution of food production
- Changes in production patterns over time (1961-2023)

Through this interactive and engaging visualization, we hope to increase awareness about sustainable food choices and help users make more informed decisions about their food consumption patterns.

Based on the PDF sketches, the project will follow a scrollytelling format with 6 main sections, starting with an attention-grabbing cover and moving through increasingly detailed visualizations of the Banana Index concept.

### 1.2. Minimum viable product

The core visualization (MVP) will consist of:

1. **Resource Requirement Compariso**n: Interactive module showing how many resources (water, land, human labor) are needed to produce bananas compared to other common foods.
2. **Emissions Comparison**: Bubble chart visualization comparing the carbon footprint of various foods, with bubble size representing the overall "Banana Index" impact.
3. **Global Production Map**: Interactive world map showing where different foods are produced, with options to filter by food type.
4. **Time Series Data**: Simple slider or timeline allowing users to view changes in production patterns between 1961-2023.
5. **Basic Navigation**: A cohesive website structure with intuitive scrolling/clicking to navigate between different visualization sections.

### 1.3. Additional extra ideas

Beyond the core functionality, these additional features (not in priority order) could enhance the visualization:

- **Personalized Calculator**: Allow users to input their typical diet and see the total resource impact
- **Social Sharing**: Enable users to share their discoveries or "Banana Index" score on social media
- **Live Data Updates**: Connect to APIs that provide real-time data on food production and prices
- **Production Conditions News Feed**: Integrate recent news about working conditions in food production
- **Food Journey Visualization**: Create an animated journey showing how food travels from production to plate
- **Interactive Comparison Tool**: Allow users to directly compare any two food items of their choice
- **Mobile Optimization**: Create a responsive design that works well on mobile devices with touch interactions

## 2. Tools used and lectures needed

The successful implementation of this project will require a diverse set of tools and knowledge areas spanning visualization, data processing, design, and deployment. 

### 2.1. Tools for visualizing and page construction

For visualization, we'll leverage D3.js for custom interactive components including bubble charts and timelines, drawing on lectures about data visualization fundamentals and interactive web visualizations. Core web technologies (HTML/CSS/JavaScript) will form the foundation of our site, building on web development basics and frontend framework lectures. SVG will enable custom vector graphics and transitions, utilizing skills from vector graphics lectures, while Chart.js may provide simpler visualizations where appropriate.

### 2.2. Tools for data processing, designing and deployment

For data processing, we'll employ Python with Pandas for cleaning and preprocessing our datasets. QGIS may assist in preparing geospatial data, drawing on geographic information systems concepts. Our design process will utilize Figma or Adobe XD for wireframes and mockups, informed by user interface design lectures, while Adobe Illustrator will help create custom icons and graphics based on visual design principles. For deployment, GitHub Pages will host our application, applying concepts from deployment and publishing lectures. 

Additionally, we'll need to draw on knowledge from lectures covering data visualization ethics, narrative visualization techniques, interaction design principles, color theory, and animation in data visualization to ensure our final product is both visually compelling and ethically sound.

### 2.3. Lectures needed at the very least

- 4.1. Data
- 4.2. D3.js
- 5.1. Interactions
- 7.2. Dos and don'ts
- 8.1. Maps
- 11.1. Tabular data
- 12.1. Storytelling 
- (+ any others that may be deemed useful later on)