# Project of Data Visualization (COM-480)

| Student's name | SCIPER |
| -------------- | ------ |
| Hernandez Cuellar Osvaldo | 364897 |
| Mikael Verneri Karvinen | 404002 |
| Heikel Rayan Jebali | 315789 |

[Milestone 1](#milestone-1) • [Milestone 2](#milestone-2) • [Milestone 3](#milestone-3)

## Accessing the website

Our website can be accessed through this link: https://com-480-data-visualization.github.io/EcoBite/

## Milestone 1

### Dataset

For our datasets, we utilized two separate data sets provided by Kaggle. Both of them have been pulled from reputable sources and require a limited amount of preprocessing or data-cleaning before starting the visualization. We combine the joint data from both datasets to provide a more insightful representation of our topic. This limits our number of datapoints, as described in the explanatory data analysis phase, but should be sufficient for appropriate visualizations.

**Banana Index** - [Link](https://www.kaggle.com/datasets/joebeachcapital/banana-index): 
- The Economist’s Banana Index, first introduced in the article "A Different Way to Measure the Climate Impact of Food" and updated annually, quantifies the greenhouse-gas emissions of foods—by weight, calorie, or protein—using bananas as a reference. Data sources include Our World in Data (2023), research by M. Clark et al. (2022), and Poore & Nemecek (2018), with the index formally cited as The Economist and Solstad, S. (corresponding author), 2023, referencing its original publication in The Economist on April 11, 2023.

**FAOSTAT Crops and Livestock Production** - [Link](https://www.kaggle.com/datasets/vijayveersingh/faostat-crops-and-livestock-data?select=Production_Crops_Livestock_E_All_Data_NOFLAG.csv):
- This dataset, sourced from FAOSTAT, contains information on crops and livestock products across various countries and regions, providing annual statistics on harvested area, yield, and production. It includes item codes, measurement units, and metadata such as reliability flags indicating whether figures are estimated or official. Supporting agricultural and economic research, the dataset facilitates food production analysis. Provided by the Food and Agriculture Organization (FAO) through its FAOSTAT database, the data was accessed on January 11, 2025, from the FAO Crops and Livestock Products Data section.

### Problematic

**Goal**: The goal of this project is to visualize the environmental impact of food production, focusing on greenhouse gas emissions and agricultural output. Using two datasets—the Economist’s Banana Index and FAOSTAT’s Crops and Livestock Production dataset—we aim to provide an accessible and insightful representation of how different food products contribute to climate change and how agricultural trends evolve over time. By leveraging these datasets, we aim to create an intuitive, informative visualization that bridges the gap between food production and environmental impact, promoting greater awareness.

We will compare the emissions of various foods per weight, calorie, and protein unit to understand which foods have the lowest and highest environmental impact. The FAOSTAT dataset provides insights into global agricultural output of the same foods as in the Banana Index, allowing us to examine trends in crop yields, harvested areas, and livestock production across different regions. By integrating both datasets, we aim to explore correlations between food production scale and environmental efficiency, helping to identify sustainable agricultural practices.

**Motivation**: In our day-to-day life the carbon footprint and production of food are fairly hidden. Understanding the carbon footprint of food production is crucial for policymakers, researchers, and consumers who seek to make informed decisions about sustainability. By combining these datasets, we can highlight patterns in emissions efficiency, agricultural productivity, and the relationship between different food products and their environmental impact.

**Target audience**: This project is designed for mainly for consumers and advocates wanting to make informed dietary choices to reduce their carbon footprint, and additionally towards environmental researchers seeking data-driven insights into food production’s climate impact and policymakers developing agricultural and sustainability policies.

### Exploratory Data Analysis

It can be found in the directory [milestone_1](/milestone_1), in the Jupiter Notebook called [Exploratory_data_analysis](/milestone_1/Exploratory_data_analysis.ipynb).

There are only **49** foods in the intersection between the FAOSTAT database and the Banana index database, which represent only the **16.2%** and **30.6%** respectively of the whole food diversity per database. However, taking into account that not all the food items has the same representation in the FAOSTAT (the entries depend mostly on the ```Area```, ```Element``` and ```Unit```, not only in the ```Item```), we know that we can link **24.7%** of the toal entries of the FAOSTAT database with the Banana index database."

### Related work

To the extent of our knowledge, the two datasets we are examining have not been combined in the sense that we are planning to do. However, the Banana Index data has been visualized by the Economist in its publishing of the article ["A Different Way to Measure the Climate Impact of Food"](https://www.economist.com/graphic-detail/2023/04/11/a-different-way-to-measure-the-climate-impact-of-food). Our approach takes this one step further and looks at the origin and production of these foods globally. The FAOSTAT crop and livestock production data in turn has not really been visualized in any meaningful or insightful way (see [Kaggle notebook](https://www.kaggle.com/code/mahmoudredagamail/faostat-agriculture-data)), and only has been used in certain machine learning models. We aim to enhance these datasets by also creating a thought-provoking and meaningful story around them by adding new qualitative and visual aspects.

Our inspiration centered around the original article from the Economist and a few older projects, namely [the exploration of different types of coffee beans](https://com-480-data-visualization.github.io/coffee_BEaN/) and [global food balances](https://com-480-data-visualization.github.io/datavis-project-2022-datagang/src/). Both of these projects were centered around agricultural products and global impact. We initially wanted to combine data on recipes from the [MealDB](https://www.themealdb.com/api.php) to examine the impact of individual dishes, but shifted to a larger view on the world.


## Milestone 2 

- Sketchbook [here](milestone_2/sketchbook.pdf)
- Report [here](milestone_2/milestone_2.pdf)
- Functional [here](https://com-480-data-visualization.github.io/EcoBite/)

## Milestone 3

- Screencast here
- Process book [here](Process Book.pdf)

