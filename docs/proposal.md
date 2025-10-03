## Executive Summary  
Many people suffer from the effects of air pollutants across the world. Statistically, studies have shown 
that people living in industrial areas are 10 times as likely to develop lung cancer and that pollution was 
responsible for 91% of the 4.2 million premature deaths in 2016 [1][2]. Those damages can be 
attributed to the lack of visualization and forecasting tools for essential air quality metrics. Some 
existing air quality monitoring platforms provide real-time access to numerous air quality parameters. 
However, they have difficult data access and lack an easy and intuitive visualization for users. This 
prevents users from recognizing the meaning of the data they access and delays taking suitable action 
for disasters and pollution spikes. Therefore, it is necessary to develop a solution that targets the 
community - especially those most affected by air pollution, like patients, residents of industrial zones, 
and farmers. Our solution focuses on providing customized visualization for various air quality metrics 
from multiple sources for various user segments. The dashboard will show the best parameters of 
interest for each user segment to ensure the best usability of the application. The application will 
provide an easy method to visualize historic trends of any parameter and forecast future changes using 
our AI system. Furthermore, the application will provide a global visualization for those parameters 
using both a 2D flattened world map and a 3D globe. In addition, to ensure reliability, our application will 
compare satellite data to ground-station data and validate the correctness and accuracy of the 
ground-station measurements. Our main value proposition is the user-centered design. Where we 
focus on providing the best visualization and the most intuitive data display for all segments of users. 
Therefore, our solution successfully meets the challenge requirements that focus on visualization, 
validation, and integrating data from various sources.  

---

## Problem Definition
Many people suffer from the effects of air pollutants across the world. Be it residents of industrial areas 
who are at a risk of cancer and other life-threatening diseases, farmers who suffer catastrophic 
damages from acidic rain, or chronically ill people whose condition deteriorates as air pollutants 
increase. In fact, studies have shown that people living in industrial areas are 10 times as likely to 
develop lung cancer and 3.5 times more likely to develop Asthma [1]. The issue also persists in 
developing countries, where air pollution was responsible for 91% of the 4.2 million premature deaths in 
2016 [2]. Thus, it is essential to develop a solution for visualizing and forecasting pollution parameters 
to facilitate the prevention of crop damage, prepare and alert chronic patients with respiratory diseases 
for high-pollution areas, and alert residents of industrial zones of persistent exposure to pollution.  

---

## Background & Literature Review  
Platforms like World Air Quality Index (WAQI), Plume Labs and the EPA’s AirNow provide real-time air 
quality information - enabling users to monitor pollutant concentrations and receive general alerts 
[3][4][5]. However, they focus on real-time reporting rather than predictive forecasting of pollution levels. 
Current applications provide limited integration of AI-based forecasting to predict pollution levels and 
events that depend on it.  
Many platforms don’t provide comprehensive air quality metrics like SO2 and NO2. Despite their 
impacts. SO2 causes acid rain, which damages crops, soil and buildings, while NO2 contributes to 
smog and respiratory problems. Those who provide those metrics tend to fall back in terms of 
accessing and visualizing data. Also, their interfaces are not always user-friendly. Most users struggle 
to interpret the technical values of pollutants without expert knowledge.  
Moreover, existing solutions lack Personalization. They generally present information without adapting 
to the specific needs of different users, such as Asthma patients, farmers, or industrial workers and give 
them Personalized recommendations based on their health profile.  
Thus, there remains a need for a solution that not only visualizes current conditions but also leverages 
machine learning models and NASA satellite data to forecast future air quality trends and deliver 
customized health alerts.  

---

## Methodology  
The WebApp will have 3 main components: Front-end module, Back-end module, and Deep Learning 
module.  

The Deep Learning module will rely on satellite data from NASA TEMPO and ground station data from 
Pandora and OpenAQ to forecast future values for all parameters of interest [8][9][6]. To produce 
high-accuracy predictions and forecasts, LSTM and Attention-based models will be utilized along with 
more traditional machine learning classifiers. The data will be converted to a standard .csv format 
suitable for deep learning using Python. Afterwards, Pandas dataframes will be generated from the 
data, and PyTorch will be used to develop the models' architectures [10][11] . Since the forecasting 
feature is necessary for many parameters, several models - each specialized in forecasting a specific 
parameter - will be trained. Such training can be done by iterating on the parameters dataframe and 
converting each column of interest into a target column and training a model on that modified 
dataframe.  

The backend module will rely on real-time and near-real-time APIs. The main APIs to fetch data from 
will be OpenAQ and Waqi [3][6]. The BackendAPI will be written in ASP.NET Core C# and will have the 
main goal of optimizing data retrieval and searching, standardizing data format, and handling many 
requests at once [7]. To achieve that, a service will be created for each data API. The service will 
handle reading data from its API and returning that data in a standardized format. The service will also 
handle filtering the API data by parameter, location, or time.  

The front-end module will utilize React to display and visualize the data coming from the backend 
endpoints. To generate globe visualizations in 2D and 3D, the react map gl library will be utilized [12]. 
The maps will be overlaid by colors that represent a heatmap of a specific parameter based on the 
retrieved data from the backend. For generating interactive charts, React charts library will be utilized 
[13]. The charts will be configured to be filtered by time and by parameter based on the user selection.  

Our plan for the WebApp aligns with the requirements of this challenge by focusing on a smooth and 
intuitive user experience. We are building multiple, interlinked modules to ensure the process of finding 
information is as simple and fast as possible. We also utilize top-of-the-notch libraries for charts and 
maps to ensure high-quality visualization - a key requirement in the challenge.  

---

## Solution  
Our solution relies on visualization and forecasting of NASA Air and Weather data to assist our community, especially farmers, patients, people living in industrial zones, and researchers. The application will ask the user upon signing up about the existence of any of the aforementioned conditions. Depending on their choice, a customized dashboard will appear to the user.
For farmers, the dashboard will alert them about the possibility of acid rain either from confirmed forecasts or from the application AI forecasting feature. The dashboard will also display useful predictions like when it will rain, if acid-rain related gases (e.g SO2) have increased lately, and other related metrics.
For patients, the dashboard will display parameters as air quality index and the amount of particulate matter in the air. This will be accompanied by alerts if either metric exceeds a specific threshold and advice including when to use their inhaler. The dashboard will also alert them about potential increases in any of the respiratory-system-harmful-parameters using the AI forecasting system.
For residents of industrial zones, the dashboard will monitor the concentration of industrial waste such as NO2, CO, and other gasses. The dashboard will show an alarm if any of those gasses exceeds regulatory standards and assist them on reporting to authorities and taking actions to keep their health safe.
For general people, the dashboard will show a combination of particulate matter, UV index, and other useful parameters in general to assist them in choosing where and when to travel outside. It will also display alarms if any abnormal values for such parameters were measured along with tips on how to stay safe.
The rest of the application will show historic trends of parameters with time. Users will be able to select their parameter of interest and display its historical trends, view insights about the graph, and use our AI system to generate a forecast of such parameters. The application will also contain an interactive map with the ability for users to display a heatmap of the concentration of gasses and particulate matter on that map. The map will be available both in flattened 2D format for easier country-based visualization and in 3D globe format for continental-based visualization. Furthermore, the colors of parameter values will be selected such that users gain an intuitive understanding of parameter severity based on red and green colorization.

The steps necessary to implement this solution are comprehensively outlined in our Methodology section, covering everything from data acquisition and AI model development to frontend design and cloud deployment. We’re also certain that these solutions align with the requirements as they cover many key aspects such as integrating diverse data sources from satellite and ground station sources, as well as comparing their data to ensure proper validation, reliability, and accuracy. Beyond our diversity in datasets, we’re also focused on generating forecasts, giving out proactive alerts, and a user-centered design.

## Value Proposition  
Our solution relies on visualization and forecasting of NASA Air and Weather data to assist our community, especially farmers, patients, people living in industrial zones, and researchers. The application will ask the user upon signing up about the existence of any of the aforementioned conditions. Depending on their choice, a customized dashboard will appear to the user.
For farmers, the dashboard will alert them about the possibility of acid rain either from confirmed forecasts or from the application AI forecasting feature. The dashboard will also display useful predictions like when it will rain, if acid-rain related gases (e.g SO2) have increased lately, and other related metrics.
For patients, the dashboard will display parameters as air quality index and the amount of particulate matter in the air. This will be accompanied by alerts if either metric exceeds a specific threshold and advice including when to use their inhaler. The dashboard will also alert them about potential increases in any of the respiratory-system-harmful-parameters using the AI forecasting system.
For residents of industrial zones, the dashboard will monitor the concentration of industrial waste such as NO2, CO, and other gasses. The dashboard will show an alarm if any of those gasses exceeds regulatory standards and assist them on reporting to authorities and taking actions to keep their health safe.
For general people, the dashboard will show a combination of particulate matter, UV index, and other useful parameters in general to assist them in choosing where and when to travel outside. It will also display alarms if any abnormal values for such parameters were measured along with tips on how to stay safe.
The rest of the application will show historic trends of parameters with time. Users will be able to select their parameter of interest and display its historical trends, view insights about the graph, and use our AI system to generate a forecast of such parameters. The application will also contain an interactive map with the ability for users to display a heatmap of the concentration of gasses and particulate matter on that map. The map will be available both in flattened 2D format for easier country-based visualization and in 3D globe format for continental-based visualization. Furthermore, the colors of parameter values will be selected such that users gain an intuitive understanding of parameter severity based on red and green colorization.

The steps necessary to implement this solution are comprehensively outlined in our Methodology section, covering everything from data acquisition and AI model development to frontend design and cloud deployment. We’re also certain that these solutions align with the requirements as they cover many key aspects such as integrating diverse data sources from satellite and ground station sources, as well as comparing their data to ensure proper validation, reliability, and accuracy. Beyond our diversity in datasets, we’re also focused on generating forecasts, giving out proactive alerts, and a user-centered design.

---

## Role of Team Members  
1- Zyad Mohammed Hamed Abdelfattah: Backend system and API endpoints  
2- Malak Sherif Abdallah El-Hamshary: Deep learning models for short-term forecasting  
3- Rowida Mohammed Reda: Attention-based deep learning models for long-term forecasting  
4- Yomna Sabry Farouk Hendy: Data collection and validation  
5- Youssef Magdy Abdelkhalek Kottb: Frontend development, UI, UX  
6- Mohammed Badawy Nasr-Eldeen: Data engineering, standardization, preprocessing  

---

## Workflow Strategy  
Data exploration and problem analysis were the first steps in our workflow. Together, we gathered and 
explored every available dataset, including NASA TEMPO and ground-based measurements. 
We viewed and accessed several parameters from those datasets and ensured to build our solution 
ideas based on them. In addition, we looked into current solutions, like websites and apps, evaluated 
their benefits and drawbacks, and considered how users might better understand and utilize data. All  
conclusions and suggestions were documented, and to maintain alignment, we spoke frequently, both 
virtually and in person. 
Our workflow will proceed in distinct phases as we build upon this foundation. The goal of the data 
acquisition and preprocessing phase is to create clean, standardized datasets. In order to produce 
precise pollutant forecasts, the forecasting stage will train LSTM/attention-based models. The back-end 
stage will focus on developing a robust system capable of fetching data from various sources,  
validating it, and sending it to the front end in a standardized format.  Dashboards, 2D/3D 
maps, and trend visualizations will be delivered via the frontend stage using React, MapTiler, and React 
Charts. We will concentrate on integration, testing, and improvement after the modules are prepared to 
guarantee precision, usability, and adaptability for various user groups. Lastly, during the demo 
preparation phase, we will develop and practice a polished presentation that showcases our specialties: 
AI-driven forecasting, multi-source integration, and an easy-to-use, intuitive design. 

---

## Resources  
1- S.-Y. Eom et al., “Health effects of environmental pollution in population living near industrial 
complex areas in Korea,” Environmental Health and Toxicology, vol. 33, no. 1, p. e2018004, 
Jan. 2018, doi: 10.5620/eht.e2018004  

2- A. I. Tiotiu et al., “Impact of air pollution on asthma outcomes,” International Journal of 
Environmental Research and Public Health, vol. 17, no. 17, p. 6212, Aug. 2020, doi: 
10.3390/ijerph17176212 

3- The World Air Quality Index project, “World’s Air Pollution: Real-time Air Quality Index,” 
waqi.info. https://waqi.info/ 

4- Plume Labs, “Plume Labs: Be empowered against air pollution,” Plume Labs. 
https://plumelabs.com/en/ 

5- “AirNow.gov.” https://www.airnow.gov/ 

6- “OpenAQ,” OpenAQ. https://openaq.org/ 

7- “ASP.NET Core, an open-source web development framework | .NET,” Microsoft. 
https://dotnet.microsoft.com/en-us/apps/aspnet 

8- “Tropospheric emissions: Monitoring pollution | NASA Earthdata,” NASA Earthdata, Nov. 08, 
2024. https://www.earthdata.nasa.gov/data/instruments/tempo 

9- “NASA Pandora Project.” https://pandora.gsfc.nasa.gov/ 

10- A. Paszke et al., “PyTorch: An Imperative Style, High-Performance Deep Learning Library,” 
arXiv (Cornell University), Jan. 2019, doi: 10.48550/arxiv.1912.01703 

11- The pandas development team. (2025). pandas-dev/pandas: Pandas (v2.3.2). Zenodo. 
https://doi.org/10.5281/zenodo.16918803 

12- “Home | react-map-gl.” https://visgl.github.io/react-map-gl/ 

13- “React charts,” Simple, https://react-charts.tanstack.com/Immersi

---

## Team Name and Members  
**Team Name:** Far from Blur  
- Zyad Mohammed Hamed Abdelfattah  
- Malak Sherif Abdallah El-Hamshary  
- Rowida Mohammed Reda  
- Yomna Sabry Farouk Hendy  
- Youssef Magdy Abdelkhalek Kottb  
- Mohammed Badawy Nasr-Eldeen  
